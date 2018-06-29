class ArticleService {
    constructor(app) {
        this.app = app;
        this.deleteArticle = this.deleteArticle.bind(this);
    }
    async deleteArticle(articleId) {
        const sql = 'UPDATE article SET state = 2 where id = ?';
        try {
            // { fieldCount, affectedRows, insertId, info, serverStatus, changedRows }
            const { affectedRows } = await this.app.connections.db1.execute(sql, [articleId])
            return affectedRows > 0;
        } catch(e) {}
    }
}
module.exports = ArticleService;