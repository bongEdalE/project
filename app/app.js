const express = require('express');
const app = express();
const PORT = 2000;
const session = require('express-session');
const MySQLStore= require('express-mysql-session')(session);
app.use(session({
    secret :'project',
    resave : false,
    saveUninitialized : 'true',
    store : new MySQLStore({
    host : 'db-esq31.pub-cdb.ntruss.com',
    user : 'danny415890',
    password : 'bg9mt1zw@',
    database : 'donghyun',
    })
}))
app.listen(PORT,()=>{
    console.log(`${PORT} is listening`);
})
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.static(`${__dirname}/src/public`));
app.set('views','./src/views');
app.set('view engine','ejs');

const router = require('./src/route/route')
app.use('/',router);

