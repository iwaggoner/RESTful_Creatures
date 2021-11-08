 const express = require('express')
const router = express.Router()
const fs = require('fs')

// GET INDEX
router.get('/', (req, res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)

    let nameFilter = req.query.nameFilter
    if(nameFilter) {
        prehistoricData = prehistoricData.filter((creature)=>{
            return creature.type.toLowerCase() === nameFilter.toLowerCase()
        })
    }

    res.render('prehistoric_creatures/indexPre.ejs', {
        data:prehistoricData
    })
})


// GET NEW ROUTE
router.get('/new', (req,res)=>{
    res.render('prehistoric_creatures/newCre.ejs', )
})


// EDIT ROUTE
router.get('/edit/:idx', (req,res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)

    res.render('prehistoric_creatures/edit.ejs', {creatureId: req.params.idx, creature: prehistoricData[req.params.idx] })
})


// UPDATE CREATURE
router.put('/:idx', (req,res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)

    prehistoricData[req.params.idx].img_url = req.body.img_url
    prehistoricData[req.params.idx].type = req.body.type

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
    res.redirect('/prehistoric_creatures')
})


// SHOW ROUTE
router.get('/:idx', (req,res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)
    let creatureId = req.params.idx
    res.render('prehistoric_creatures/showCre.ejs', {myCreature:prehistoricData[creatureId]})
})


// POST A NEW CREATURE
router.post('/', (req,res)=>{
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)
    // add new dino
    prehistoricData.push(req.body)
    // save updated dinoData
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))
    // redirect to Get /dinosaur
    res.redirect('/prehistoric_creatures')
    console.log(req.body)
})

// DELET ROUTE
router.delete('/:idx', (req, res)=>{
    // get dinosaurs array
    let prehistoricCreatures = fs.readFileSync('./prehistoric_creatures.json')
    let prehistoricData = JSON.parse(prehistoricCreatures)

    prehistoricData.splice(req.params.idx, 1)

    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(prehistoricData))

    res.redirect('/prehistoric_creatures')
})


module.exports = router