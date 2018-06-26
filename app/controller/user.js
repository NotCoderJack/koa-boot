const fs = require('fs')
const path = require('path');

const getUser = async (ctx, service) => {
    const html = fs.readFileSync(path.join(__dirname, '../../index.html'))
    ctx.response.type= "text/html";
    ctx.response.status = 200;
    ctx.response.body = html;
}
const getUserInfo = async (ctx, service) => {
    ctx.body = 'getUserInfo';
}

module.exports = {
    getUser, 
    getUserInfo
}