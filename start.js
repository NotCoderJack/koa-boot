const koa = require('koa');
const fs = require('fs');
const path = require('path')
const staticMiddle = require('koa-static');
const staticCache = require('koa-static-cache');
const historyFallback = require('koa2-history-api-fallback');
const Router = require('koa-router');
const koaBody = require('koa-body');
const koaSession = require('koa-session');
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
    setRoutes(app) {
        const routerPath = path.resolve('./app/router');
        this.scanRouter(routerPath, app)
        return app.router.routes()
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
    addRouters(router, app) {
        Object.keys(router).map(key => {
            const [method, path] = key.split(' ');
            app.router[method](path, async (ctx, next) => {
                const handleRequest = router[key];
                await handleRequest(ctx, next)
            })
        })
    }
}

class KoaBoot extends koa{
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
        this.use(koaSession({
            key: 'SID', 
            maxAge: 86400000,
            overwrite: true, /** (boolean) can overwrite or not (default true) */
            httpOnly: true, /** (boolean) httpOnly or not (default true) */
            signed: true, /** (boolean) signed or not (default true) */
            rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
            renew: false
        }, this))
        this.use(koaBody({
            multipart: true
        }));
        this.use(this.loader.setRoutes(this));
        this.use(historyFallback());
        this.use(staticMiddle(
            path.join( __dirname, './dist')
        ))
        this.use(staticCache(
            path.join( __dirname, './dist'),
            {
                maxAge: 365 * 24 * 60 * 60
            }
        ))
    }
}
module.exports = KoaBoot