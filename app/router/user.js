module.exports = (app) => {
    return {
        'post /user/login': app.controller.user.login,
        'get /user/getCurrentUser': app.controller.user.getCurrentUser,
    }
}