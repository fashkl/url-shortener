const express = require('express')
const mongoose = require('mongoose')
const ShortUrl = require('./models/shortUrl')
const app = express()

//connect to local mongodb
mongoose.connect('mongodb://localhost/urlShortener',{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected...'))
.catch((err) => console.log(err))

//to declare that we are using ejs as templating engine
app.set('view engine','ejs')

// to declare that we are using URL parameters
app.use(express.urlencoded({extended: false}))

//to list all the shorten URLS
app.get('/', async (req,res) =>{
    const shortUrls = await ShortUrl.find()
    res.render('index', {shortUrls: shortUrls})
})

//to take values passed from Form and create the shorten url record in db through model
app.post('/shortUrls', async (req, res) => {
    await ShortUrl.create({full: req.body.fullUrl})
    res.redirect('/')
})

//to open original URL & count the # of clicks
app.get('/:shortUrl', async (req, res) => {
    const shortUrl = await ShortUrl.findOne({short: req.params.shortUrl})
    if(shortUrl == null) return res.sendStatus(404)

    shortUrl.cliks++
    shortUrl.save()

    res.redirect(shortUrl.full)
})

app.listen(process.env.PORT || 4000, ()=>{console.log('Server running...');})


