'use strict'

const fs = require('fs')
const path = require('path')
const http = require('http')

const PORT = 5555
const dataPath = path.join(__dirname, 'pets.json');

const server = http.createServer((req, res)=>{
    if(req.method === 'GET' && req.url === '/pets'){
        fs.readFile(dataPath, 'utf8', (err, dataJSON)=>{
            if(err){
                res.statusCode = 500;
                res.setHeader('Content-Type', 'text/plain')
                console.error(error.stack)
                res.end('Internal Server Error')
            }
            else {
                res.setHeader('Content-Type', 'application/json')
                console.log(`data gathered`)
                res.end(dataJSON)
            }
        })
    }

    else{
        res.statusCode = 404
        res.setHeader('Content-Type', 'text/plain')
        res.end('Page not found')
    }
    
})



server.listen(PORT,()=>{
    console.log('Listening on', PORT)
})



