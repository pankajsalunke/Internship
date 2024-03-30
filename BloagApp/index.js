const express  = require('express')
const mongoose = require('mongoose')
const articlerouter = require('./routes/articles')
const dotenv = require("dotenv");
const Article = require( './models/article');
const methodoverride = require('method-override')
const app = express()

dotenv.config();
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.5cfikpj.mongodb.net/BlogAppDB`)




app.use(express.urlencoded({extended:false}))
app.use(methodoverride('_method'))

app.set('view engine','ejs')

app.get("/",async(req,res)=>{
    const articles = await Article.find().sort( { createdAt:'desc' } )
    res.render('articles/index',{articles:articles})
})

app.use('/articles',articlerouter)
app.listen(3000)
