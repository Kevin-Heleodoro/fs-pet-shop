const fs = require('fs');
const process= require('process');

const nodeOption = process.argv[2];

if(process.argv.length < 3){
    throwError(`[read | create | update | destroy]`);
}

if(nodeOption === 'read'){
    fs.readFile(`./pets.json`, `utf8`,(err, data)=>{
        if(err){console.error(err)}

        let pets = JSON.parse(data)
        let index = process.argv[3];

        if(index < 0 || index > pets.length - 1 ){
            throwError('read INDEX')
        } else if(index === undefined){
            console.log(pets);
        } else {
            console.log(pets[index]);
        }
    });
}

if(nodeOption === 'create'){

    if(process.argv.length < 6){
        throwError('create AGE KIND NAME')
    } else {
    const newPet = {}
    const {age, kind, name} = {age: process.argv[3], kind: process.argv[4], name: process.argv[5]}  
    newPet['age'] = parseInt(age)
    newPet['kind'] = kind
    newPet['name'] = name

    fs.readFile(`./pets.json`, `utf8`,(err, data)=>{
        if(err){console.error(err)}

        let pets = JSON.parse(data)
        pets.push(newPet)
        let jsonStr = JSON.stringify(pets);

        fs.writeFile(`./pets.json`, jsonStr, (err)=>{
            if(err){console.error(err)}
            else{
                console.log(newPet);
            }
        })
    })
}
}



if(nodeOption === 'update'){

}

if(nodeOption === 'destroy'){

}

function throwError(string){
    process.exitCode = 1
    console.error(`Usage: node pets.js ${string}`)
}





// function readFile(){
//     fs.readFile(`./pets.json`, `utf8`,(err, data)=>{
//         if(err){console.error(err)}

//         const pets = JSON.parse(data)
//         return pets
//     })
// }