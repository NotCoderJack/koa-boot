
const user = (app) => {
    return {
        'get /': app.controller.user.getUser,
    }
}

module.exports = user;