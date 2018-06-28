'use strict'
const Colors = require('colors')
const KoaBoot = require('./start');
const app = new KoaBoot();
app.listen(3000, '127.0.0.1', () => {
    console.log(Colors.yellow('Server is listening on 3000'))
})