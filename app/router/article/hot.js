module.exports = (app) => {
    return {
        'get /article': app.controller.article.getArticle || function(){},
    }
}