class ArticleService {
    constructor(app) {
        this.app = app;
        this.deleteArticle = this.deleteArticle.bind(this);
        this.getArticleById = this.getArticleById.bind(this);
    }
    async deleteArticle(articleId) {
        const sql = 'UPDATE article SET state = 2 where id = ?';
        const [ret] = await this.app.connections.db1.execute(sql, [articleId])
        console.log(ret)
        return ret.affectedRows > 0;
    }
    async allArticle(currentPage) {
        const limit = 10;
        currentPage = currentPage || 1;
        const sql = `SELECT a.id, a.title, a.summary, a.publishDate, a.pageView, a.isOriginal, a.coverImage, t.tagName AS tags 
                    FROM article a 
                    LEFT JOIN article_tags a_t ON a.id = a_t.aid 
                    LEFT JOIN tags t ON a_t.tid = t.id
                    LIMIT ${(currentPage -1)*limit}, ${limit}`
        const [ret, fields] = await this.app.connections.db1.execute(sql);
        return ret;
    }
    async getArticleById(articleId) {
        const sql = `SELECT a.id, a.title, a.summary, a.htmlContent, a.publishDate, a.pageView, a.isOriginal, a.coverImage, a.originalUrl, t.tagName AS tags 
                    FROM article a 
                    LEFT JOIN article_tags a_t ON a.id = a_t.aid 
                    LEFT JOIN tags t ON a_t.tid = t.id
                    WHERE a.id = ? && a.state = 1`;
        const [ret] = await this.app.connections.db1.execute(sql, [articleId]);
        return ret && ret[0];
    }
}
module.exports = ArticleService;