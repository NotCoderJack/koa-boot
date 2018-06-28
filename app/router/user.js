module.exports = (app) => {
    return {
        'post /user/login': app.controller.user.login,
    }
}