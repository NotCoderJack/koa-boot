const getUser = async (ctx, service) => {
    console.log('service: ', service)
    await service.user.storeInfo();
    ctx.body = 'getUser';
}

const getUserInfo = async (ctx, service) => {
    ctx.body = 'getUserInfo';
}

module.exports = {
    getUser, 
    getUserInfo
}