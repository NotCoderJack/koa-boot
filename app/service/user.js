class UserService {
    constructor(app) {
        this.app = app;
        this.getUserByName = this.getUserByName.bind(this);
    }
    async getUserByName(name) {
        const user = Object.create(null);
        try {
            const [rows, fields] = await this.app.connections.db1.execute('select id, username, nickname, email, userface from user where username = ?', [name])
            if (Array.isArray(rows) && !rows.length) {
                return null;
            }
            return rows[0];
        } catch(e) {}
    }
}
module.exports = UserService;