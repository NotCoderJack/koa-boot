const mysql = {
    clients: {
        // clientId, 获取client实例，需要通过 app.mysql.get('clientId') 获取
        db1: {
            // host
            host: 'mysql.com',
            // 端口号
            port: '3306',
            // 用户名
            user: 'test_user',
            // 密码
            password: 'test_password',
            // 数据库名
            database: 'test',
        },
        db2: {
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
        },
        // ...
    },
    // 所有数据库配置的默认值
    default: {

    },

    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
};

// 获取指定数据库连接
const getConnection = (db) => {

}

module.exports = getConnection