class ArticleController {
    constructor(app) {
        this.app = app;
    }
    async getArticle(ctx) {
        ctx.body = 'getUserInfo';
    }
}

module.exports = ArticleController;