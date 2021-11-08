const express = require('express')
const app = express()
const ejsLayouts = require('express-ejs-layouts')
const fs = require('fs')
const methodOverride = require('method-override')


app.set('view engine', 'ejs')
app.use(ejsLayouts)
// makes req.body work
app.use(express.urlencoded({extended: false}))
app.use(methodOverride('_method'))


app.use('/dinosaurs', require('./controllers/dinosaurs.js'))
app.use('/prehistoric_creatures', require('./controllers/prehistoricCreatures.js'))

app.get('/', (req,res)=>{
    res.render('home.ejs')
})


app.listen(8000, ()=>{
    console.log('It\'s Dinosaur Time.')

})