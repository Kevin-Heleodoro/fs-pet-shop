const express = require('express');
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const { restart } = require('nodemon');
const path = require('path')
const petsPath = path.join(__dirname, 'pets.json')
const PORT = 3000

const app = express();
app.use(express.json());

app.get('/pets',(req, res)=>{
    fs.readFile(petsPath,'utf8', (err, dataJSON)=>{
        if(err){fiveHundredError(res)}
        else {
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            console.log('All pets displayed')
            res.send(dataJSON) 
        }
    })
})

app.get('/pets/:id',(req,res)=>{
    const idNum = req.params.id
    petSearch(res, idNum)
})

app.post(
    '/',
    body('name').isString(),
    body('age').isNumeric(),
    body('kind').isString(),
    
    (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){throwFourHundred(res, errors)}
    else{
        const pet = Object.assign({age: req.body['age'], kind:req.body['kind'], name:req.body['name']})
        createPet(pet, res)
    }
})

app.listen(PORT,(err)=>{
    if(err){console.log(err)}
    console.log(`Listening at ${PORT}....`)
})


function petSearch(res, num){
    fs.readFile(petsPath, 'utf8', (err, dataJSON)=>{
        if(err){fiveHundredError(res)}
        else {
            let pets = JSON.parse(dataJSON);
            let pet = JSON.stringify(pets[num]);
            if(pet === undefined){fourOhFour(res)}
            else{
                petDataFound(res, pet)
            }
        }
    })
}

function createPet(pet, res){
    fs.readFile(petsPath, 'utf8', (err, dataJSON)=>{
        if(err){fiveHundredError(res)}
        else{
            let pets = JSON.parse(dataJSON)
            pets.push(pet)
            let newPetJSON = JSON.stringify(pets)

            fs.writeFile(`./pets.json`, newPetJSON, (err)=>{
                if(err){console.error(err)}
                else{
                    console.log(pet);
                    res.statusCode = 200
                    res.json(pet)
                }
            })
        }
    })
}

function fiveHundredError(res){
    console.error(err.stack)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain')
    res.end('Internal Server Error')
}

function fourOhFour(res){
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain')
    console.log(`No such pet found`)
    res.end('Page not found')
}

function petDataFound(res, data){
    res.setHeader('Content-Type', 'application/json')
    res.statusCode = 200
    console.log(`Pet data found`)
    res.end(data)
}
function throwFourHundred(res, errors){
    return res.status(400).json({errors :errors.array()});
}