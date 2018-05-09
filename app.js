'use strict'
const KoaBoot = require('./start')

const app = new KoaBoot()
console.dir(app)
app.listen(3000, '127.0.0.1', () => {
    console.log('Server is listening on 3000')
})