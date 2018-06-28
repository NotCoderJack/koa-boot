class UserController {
    constructor(app) {
        this.app = app;
        this.login = this.login.bind(this);
    }
    async login(ctx, next) {
        const users = await this.app.service.user.getUserByName()
        ctx.body = '300000';
        console.log(users)
        return next()
    }
}

module.exports = UserController;