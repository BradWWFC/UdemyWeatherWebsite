const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//port is equal to PORT if it exists, else its equal to 3000
const port = process.env.PORT || 3000

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public/')
const viewsPath = path.join(__dirname,'../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine 
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)
app.use(express.static(publicDirectoryPath))


//routes
app.get('', (req, res) =>{
    res.render('index', {
        title: "Main",
        name: "Brad Worthington"
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title: "About",
        name: "Brad Worthington"
    })
})

app.get('/help', (req, res) =>{
    res.render('help', {
        message: "here to help",
        title: "Help",
        name: "Brad Worthington"
    })
})


app.get('/weather', (req, res) =>{

    if(!req.query.address){
        return res.send({
            error: 'You must provide a search term'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({error})
        }
        forecast({latitude, longitude}, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                location: location,
                address: {
                    lat: latitude,
                    long: longitude
                }
            })
          })
    })


})

app.get('/products',(req, res) =>{
    if(!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        products: []
    })
})

//match anything that hasnt been matched so far
app.get('/help/*',(req, res) =>{
    res.render('error',{
        message: "Help Article Not Found"
    })
})

//match anything that hasnt been matched so far
app.get('*',(req, res) =>{
    res.render('error',{
        message:"Page Not Found"
    })
})

app.listen(port, () => {
    console.log("Server is up on port "+ port)
}) 