class TagService {
    constructor(app) {
        this.app = app;
        this.deleteTag = this.deleteTag.bind(this);
    }
    async deleteTag(tagId) {
    }
    async getTagById(tagId) {
        
    }
    async getTagList() {
        const sql = 'SELECT id, tagName from tags';
        const [ret, fields] = await this.app.connections.db1.execute(sql);
        return ret;
    }
}
module.exports = TagService;