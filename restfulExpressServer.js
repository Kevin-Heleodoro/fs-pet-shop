const e = require('express');
const express = require('express');
const res = require('express/lib/response');
const fs = require('fs')
const path = require('path')

const PORT = 5432;
const app = express()
const petsPath = path.join(__dirname, 'pets.json')

app.use(express.json())

app.post(`/pets`,(req, res)=>{
    const pet = Object.assign({age: req.body['age'], name: req.body['name'], kind: req.body['kind']})
    createNewPet(pet, res)
})

function createNewPet(pet, res){
    fs.readFile(petsPath, 'utf8', (err, data)=>{
        if(err)fiveHundredError(err);
        else{
            let pets = JSON.parse(data);
            pets.push(pet)
            let updatedPets = JSON.stringify(pets)

            fs.writeFile(petsPath, updatedPets, (err)=>{
                if(err)console.log(err);
                else{
                    res.json(pet)
                    res.statusCode = 200
                    console.log(`Pet roster updated`)
                }
            })
        }
    })
}

app.get('/pets',(req, res)=>{
    fs.readFile(petsPath, 'utf8', (err, data)=>{
        if(err)(fiveHundredError(err));
        else{
            res.setHeader('Content-Type', 'application/json')
            res.statusCode = 200
            console.log(`All pets displayed!`)
            res.send(data)
        }
    })
})

app.get('/pets/:id',(req,res)=>{
    fs.readFile(petsPath, 'utf-8',(err, data)=>{
        if(err)fiveHundredError(err);
        else{
            let queriedPet = req.params.id
            let pets = JSON.parse(data);
            let pet = JSON.stringify(pets[queriedPet])
            if(!pets[queriedPet]){fourOhFour(res)}
            else{
                res.setHeader('Content-Type', 'text/plain')
                res.statusCode = 200
                console.log(`Pet data found`)
                res.end(pet)
            }
        }
    })
})

app.patch(`/pets/:id`, (req, res)=>{
    fs.readFile(petsPath, 'utf-8', (err, data)=>{
        if(err)fiveHundredError(err);
        else{
            let petIndex = req.params.id
            let pets = JSON.parse(data);
            const petToUpdate = pets[petIndex];

            
            for(let key in req.body){
                petToUpdate[key] = req.body[key]
            }
            
            // const reqBody = Object.assign({age: req.body['age'], kind: req.body['kind'], name: req.body['name']})
            
            // if(reqBody.age){petToUpdate.age = reqBody.age}
            // if(reqBody.kind){petToUpdate.kind = reqBody.kind}
            // if(reqBody.name){petToUpdate.name = reqBody.name}
            let updatedPets = JSON.stringify(pets)

            fs.writeFile(petsPath, updatedPets, (err)=>{
                if(err){console.error(err)}
                else{
                    console.log(pets)
                    res.statusCode = 200
                    res.json(petToUpdate)
                }
            })
            console.log(petToUpdate)
        }
    })
})

app.delete(`/pets/:id`,(req, res)=>{
    fs.readFile(petsPath, 'utf-8', (err, data)=>{
        if(err)fiveHundredError(err);
        else{
            let index = req.params.id
            let allPets = JSON.parse(data);
            let toDelete = allPets[index]
            if(toDelete === undefined)fourOhFour(res);
            else {
                allPets.splice(index, 1)
                allPets = JSON.stringify(allPets)
                fs.writeFile(petsPath, allPets, (err)=>{
                    if(err)console.error(err);
                    else{
                        console.log(allPets)
                        res.statusCode = 200
                        res.json(allPets)
                    }
                })
            }
        }
    })
})

app.listen(PORT,(err)=>{
    if(err)(console.log(err));
    console.log(`Listening on PORT ${PORT}...`)
})

function fiveHundredError(err){
    console.error(err.stack)
    res.statusCode = 500
    res.setHeader('Content-Type', 'text/plain')
    res.end(`Internal Server Error`)
}

function fourOhFour(err){
    console.log(err);
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/plain')
    res.end(`Requested pet does not exist`)
}

