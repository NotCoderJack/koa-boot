'use strict'
const dbs = require('../../config/config.db');
const mysql = require('mysql2/promise');
class DataSource {
    async connect() {
        const { clients } = dbs;
        const connections = Object.create(null);
        for (let key in clients) {
            if (clients[key].enable) {
               connections[key] = await this.createConnection(clients[key]);
            }
        }
        return connections;
    }
    // 根据配置信息，建立数据库链接
    async createConnection(db) {
        if (db.type === 'mysql') {
            const conn = await mysql.createConnection(db);
            return conn;
        }
    }
}

module.exports = new DataSource();