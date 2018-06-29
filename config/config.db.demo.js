const db = {
    clients: {
        db2: {
            type: 'mongodb',
            enable: false,
            // host
            host: 'mysql2.com',
            // 端口号
            port: '3307',
            // 用户名
            user: 'test_user',
            // 密码
            password: 'test_password',
            // 数据库名
            database: 'test',
        }
    }
};
module.exports = db;