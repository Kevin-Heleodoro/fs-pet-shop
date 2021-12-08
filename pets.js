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
    const newPet = {}
    const {age, kind, name} = {age: process.argv[3], kind: process.argv[4], name: process.argv[5]}  
    newPet['age'] = age
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
                console.log( jsonStr);
            }
        })
    })
}


if(nodeOption === 'update'){

}

if(nodeOption === 'destroy'){

}


function throwError(string){
    process.exitCode = 1
    console.error(`Usage: node pets.js ${string}`)
}



// const fs=require("fs");
   
// const str = "Hello world";
// const filename = "input.txt";
   
// fs.open(filename, "a", (err, fd)=>{
//     if(err){
//         console.log(err.message);
//     }else{
//         fs.write(fd, str, (err, bytes)=>{
//             if(err){
//                 console.log(err.message);
//             }else{
//                 console.log(bytes +' bytes written');
//             }
//         })        
//     }
// })