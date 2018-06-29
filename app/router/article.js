module.exports = (app) => {
    return {
        'get /article/delete': app.controller.article.deleteArticle,
    }
}