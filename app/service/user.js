class UserService {
    constructor(app) {
        this.app = app;
        this.getUserByName = this.getUserByName.bind(this);
    }
    async getUserByName() {
        const user = Object.create(null);
        try {
            const [rows, fields] = await this.app.connections.db1.execute('select * from user')
            return rows;
        } catch(e) {}
    }
}
module.exports = UserService;