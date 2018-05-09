
const user = (app) => {
    return {
        'get /': app.controller.user.getUser,
        'get /getUserInfo': app.controller.user.getUserInfo
    }
}

module.exports = user;