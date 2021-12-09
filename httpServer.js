'use strict'

const fs = require('fs')
const path = require('path')
const http = require('http')
const url = require('url')

url.format({
    hostname: 'localhost:5555',
    pathname: "/pets"
})
console.log(url);

const PORT = 5555
const dataPath = path.join(__dirname, 'pets.json');

// const server = http.createServer((req, res)=>{
//     if(req.method === 'GET' && req.url === '/pets'){
//         fs.readFile(dataPath, 'utf8', (err, dataJSON)=>{
//             if(err){FiveHundredError()}
//             else {
//                 petDataFound(res, dataJSON)
//             }
//         })
//     }
//     else if(req.method === 'GET' && req.url === '/pets/0'){
//         fs.readFile(dataPath, 'utf8', (err, dataJSON)=>{
//             if(err){FiveHundredError()}
//             else {
//                 let pets = JSON.parse(dataJSON);
//                 let pet = JSON.stringify(pets[0]);
//                 petDataFound(res, pet);
//             }
//         })
//     }
//     else if(req.method === 'GET' && req.url === '/pets/1'){
//         fs.readFile(dataPath, 'utf8', (err, dataJSON)=>{
//             if(err){FiveHundredError()}
//             else {
//                 let pets = JSON.parse(dataJSON);
//                 let pet = JSON.stringify(pets[1]);
//                 petDataFound(res, pet);
//             }
//         })
//     }

//     else{
//         res.statusCode = 404
//         res.setHeader('Content-Type', 'text/plain')
//         res.end('Page not found')
//     }
    
// })



// server.listen(PORT,()=>{
//     console.log('Listening on', PORT)
// })


// function FiveHundredError(){
//     res.statusCode = 500;
//     res.setHeader('Content-Type', 'text/plain')
//     console.error(error.stack)
//     res.end('Internal Server Error')
// }

// function petDataFound(res, data){
//     res.setHeader('Content-Type', 'application/json')
//     res.statusCode = 200
//     console.log(`Pet data found`)
//     res.end(data)
// }








// module.exports = server;



