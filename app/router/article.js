module.exports = (app) => {
    return {
        'get /article': app.controller.article.getArticleById,
        'get /article/delete': app.controller.article.deleteArticle,
        'get /article/list': app.controller.article.allArticle,
    }
}