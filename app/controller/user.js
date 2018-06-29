const BaseResponse = require('../BaseResponse');
class UserController {
    constructor(app) {
        this.app = app;
        this.login = this.login.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
    }
    /**
     * @param {string} username, 用户名
     * @param {string} password, 密码
     */
    async login(ctx, next) {
        try {
            const params = ctx.request.body;
            if (!params.username) {
                ctx.body = BaseResponse.respFail(405, '缺少参数：请检查用户名');
                return;
            }
            if (!params.password) {
                ctx.body = BaseResponse.respFail(405, '缺少参数：请检查密码');
                return;
            }
            const { username, password } = params;
            const user = await this.app.service.user.getUserByName(username);
            if (!user) {
                ctx.body = BaseResponse.respFail(-1, '用户不存在');
                return ;
            } 
            console.log(user);
            // 判断用户密码
            /* 设置session
            const session = ctx.session;
            session.isLogin = true;
            session.uid = user.id;
            session.username = user.username;
            session.SID = 
            */
            ctx.body = BaseResponse.respSuccess(user);
        } catch (e) {
            console.log(e)
            ctx.body = BaseResponse.respFail(500);
        }
    }
    async logout(ctx, next) {
        ctx.session = null;
        ctx.redirect('/');
    }
    async getCurrentUser(ctx, next) {
        console.log(ctx)
        const session = ctx.session;
        if (!session.isLogin) {
            console.log('dsfasd')
            ctx.body = BaseResponse.respFail(401, '未登录');
        }
        ctx.body = BaseResponse.respSuccess(session);
    }
}

module.exports = UserController;