const BaseResp = require('../BaseResponse');
class ArticleController {
    constructor(app) {
        this.app = app;
        this.deleteArticle = this.deleteArticle.bind(this);
        this.allArticle = this.allArticle.bind(this);
        this.getArticleById = this.getArticleById.bind(this);
    }
    /**
     * 根据id删除文章
     * @param {string} articleId， 文章id
     * 
     */
    async deleteArticle(ctx, next) {
        const params = ctx.request.query;
        console.log(params)
        if (!params.articleId) {
            ctx.body = BaseResp.respFail(-1, '缺少参数：articleId, 文章id');
            return;
        }

        try {
            const { articleId } = params;
            const ret = await this.app.service.article.deleteArticle(articleId);
            if (ret) {
                ctx.body = BaseResp.respSuccess();
            } else {
                ctx.body = BaseResp.respFail(-1, '删除失败');
            }
        } catch (e) {
            console.log(e);
            ctx.body = BaseResp.respFail(500);
            return next();
        }
    }
    async allArticle(ctx, next) {
        const params = ctx.request.query;
        const { currentPage } = params;
        try {
            const list = await this.app.service.article.allArticle(currentPage);
            if (list) {
                ctx.body = BaseResp.respSuccess({currentPage, data: list});
            }
        } catch(e) {
            console.log(e)
            ctx.body = BaseResp.respFail(500);
            return next();
        }
    }
    async getArticleById(ctx, next) {
        const params = ctx.request.query;
        console.log(params)
        if (!params.articleId) {
            ctx.body = BaseResp.respFail(-1, '缺少参数：articleId, 文章id');
            return;
        }
        try {
            const { articleId } = params;
            const article = await this.app.service.article.getArticleById(articleId);
            if (article) {
                ctx.body = BaseResp.respSuccess({article});
            } else {
                ctx.body = BaseResp.respFail(-1, '获取文章失败');
            }
        } catch (e) {
            console.log(e);
            ctx.body = BaseResp.respFail(500);
        }
    }
}

module.exports = ArticleController;