'use strict'
const KoaBoot = require('./start')
const app = new KoaBoot()

app.listen(3000, '127.0.0.1', () => {
    console.log('Server is listening on 3000')
})