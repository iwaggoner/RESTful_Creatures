const express = require('express')
const router = express.Router()
const fs = require('fs')

// INDEX ROUTE
router.get('/', (req, res)=>{
    let dinosaurs = fs.readFileSync('./dinosaur.json')
    let dinoData = JSON.parse(dinosaurs)

    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        dinoData = dinoData.filter((dino)=>{
             return dino.name.toLowerCase() === nameFilter.toLowerCase()
        })
    }
    res.render('dinosaurs/index.ejs', {data: dinoData})
})


// NEW ROUTE
router.get('/new', (req, res)=>{
    res.render('dinosaurs/new.ejs')
})

// Edit ROUTE
router.get('/edit/:idx', (req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaur.json')
    let dinoData = JSON.parse(dinosaurs)

    res.render('dinosaurs/edit.ejs', {dinoId: req.params.idx, dino: dinoData[req.params.idx] })
})

// UPDATE A DINO
router.put('/:idx', (req,res)=>{
    let dinosaurs = fs.readFileSync('./dinosaur.json')
    let dinoData = JSON.parse(dinosaurs)

    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type

    fs.writeFileSync('./dinosaur.json', JSON.stringify(dinoData))
    res.redirect('/dinosaurs')
})

// SHOW ROUTE
router.get('/:idx', (req, res)=>{
    // get dinosaurs array
    let dinosaurs = fs.readFileSync('./dinosaur.json')
    let dinoData = JSON.parse(dinosaurs)

    // get array index from url parameter
    let dinoIndex = req.params.idx

    res.render('dinosaurs/show.ejs', {myDino: dinoData[dinoIndex]})
})

// POST A NEW DINO
router.post('/', (req, res)=>{
    // get dinosaurs array
    let dinosaurs = fs.readFileSync('./dinosaur.json')
    let dinoData = JSON.parse(dinosaurs)

    // add new dino to dinoData
    dinoData.push(req.body)

    // save updated dinoData to json
    fs.writeFileSync('./dinosaur.json', JSON.stringify(dinoData))

    // redirect to GET /dinosaurs (index)
    res.redirect('/dinosaurs')
})


// DELETE ROUTE
router.delete('/:idx', (req, res)=>{
     // get dinosaurs array
     let dinosaurs = fs.readFileSync('./dinosaur.json')
     let dinoData = JSON.parse(dinosaurs)

     dinoData.splice(req.params.idx, 1)

     fs.writeFileSync('./dinosaur.json', JSON.stringify(dinoData))

     res.redirect('/dinosaurs')
})



module.exports = router
