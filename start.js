const koa = require('koa');
const fs = require('fs');
const path = require('path')
const staticMiddle = require('koa-static');
const historyFallback = require('koa2-history-api-fallback');
const Router = require('koa-router');
const koaBody = require('koa-body');
const DataSource = require('./app/dao/datasource');

class Loader {
    load(app) {
        const components = [{
            name: 'controller',
            pathname: './app/controller'
        }, {
            name: 'service',
            pathname: './app/service'
        }]
        components.map(comp => {
            this.loadComponents(comp, app)
        })
    }

    loadComponents(component, app){
        const pathname = path.resolve(component.pathname);
        const componentName = component.name;
        app[componentName] = {};
        const dir = fs.readdirSync(pathname);
        dir.map(filename => {
            const filepath = path.join(pathname, filename);
            const stats = fs.statSync(filepath)
            const isFile = stats.isFile();
            if (isFile) {
                const comp = require(filepath);
                app[componentName][filename.split('.')[0]] = new comp(app);
            }
        })
    }
    loadConfig(app) {
        const pathname = path.resolve('./config')
        const dir = fs.readdirSync(pathname);
        dir.map(filename => {
            const filepath = path.join(pathname, filename);
            const stats = fs.statSync(filepath)
            const isFile = stats.isFile();
            if (isFile) {
                const config = require(filepath);
                const configPartName = filename.replace(/(config\.|\.js)/ig, '')
                app.config[configPartName] = config;
            }
        })
    }
    scanRouter(pathname, app){
        const dir = fs.readdirSync(pathname);
        dir.map(filename => {
            const filepath = path.join(pathname, filename);
            const stats = fs.statSync(filepath)
            const isFile = stats.isFile();
            const isDir = stats.isDirectory();
            if (isFile) {
                const router = require(filepath)(app);
                this.addRouters(router, app);
            }
            // 遍历多级目录
            if (isDir) {
                this.scanRouter(filepath, app);
            }
        })
    }
    setRoutes(app) {
        const routerPath = path.resolve('./app/router');
        this.scanRouter(routerPath, app)
        return app.router.routes()
    }
    addRouters(router, app) {
        Object.keys(router).map(key => {
            const [method, path] = key.split(' ');
            app.router[method](path, (ctx, next) => {
                const handleRequest = router[key];
                handleRequest(ctx, next)
            })
        })
    }
}

class KoaBoot extends koa {
    constructor(props) {
        super(props)
        this.config = {}
        this.loader = new Loader()
        this.router = new Router()
        this.controller = {}
        this.service = {}
        this.connections = {}
        this.init()
    }
    async init() {
        this.loader.load(this);
        this.loader.loadConfig(this);
        
        this.connections = await DataSource.connect();
        this.use(koaBody({
            multipart: true
        }));
        this.use(this.loader.setRoutes(this));
        this.use(historyFallback());
        this.use(staticMiddle(
            path.join( __dirname, '/')
        ))
    }
}
module.exports = KoaBoot