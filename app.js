const express = require('express')
const { set } = require('express/lib/response')
const {Pool} = require('pg')

//local connection
const pool = new Pool({
    user: 'kevinheleodoro',
    database: 'petshop',
    host: 'localhost',
    port: 5432,
    password: ''
})

const PORT = 7878
const app = express()

//take body data in for post route
app.use(express.json())

//handle errors

//get all
app.get('/', async (req, res)=>{
    try {
        const {rows} = await pool.query('SELECT * FROM pets')
        res.send(rows)
    } catch (error) {
        res.statusCode = 500
        res.json(error)
    }
})

//get one : param of ID
app.get('/pets/:id', async (req, res)=>{
    try {
        const {id} = req.params
        const {rows} = await pool.query('SELECT * FROM pets WHERE pet_id = $1', [id])
        if(!rows[0]){
            throw new Error('Pet not found')
        } else {
        res.send(rows[0])
        }
    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.send(error.message)
    }
})

//create one : body data
app.post('/pets', async (req,res)=>{
    try {
        const text = 'INSERT INTO pets (age, name, kind) VALUES ($1, $2, $3) RETURNING *'
        const {age, name, kind} = req.body
        const values = [age, name, kind]
        const newPet = await pool.query(text, values)
        res.send(newPet.rows[0])
    } catch (error) {
        console.log(error)
        res.statusCode = 400
        res.send(error.message)
    }
})

//edit one : param of ID & body data
app.patch('/pets/:id', async(req, res)=>{
    try {
        let query = ['UPDATE pets SET'];
        let setString = []
        let params = []

        Object.keys(req.body).forEach((key,i)=>{
            setString.push(key + ' = ($' + (i + 1)+ ')');
            params.push(req.body[key])
        });
        query.push(setString.join(', '));
        query.push('WHERE pet_id = ' + req.params.id)

        const updatePet = await pool.query(query.join(' '), params);
        const confirmUpdate = await pool.query('SELECT * FROM pets WHERE pet_id = '+ req.params.id)

        res.send(confirmUpdate.rows[0])
    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.send(error.message)
    }
})

//delete one : param of ID
app.delete('/pets/:id', async (req, res)=>{
    try {
        const id = req.params.id

        const deletePet = await pool.query('DELETE FROM pets WHERE pet_id = $1', [id])
        res.send('DELETED');
    } catch (error) {
        console.log(error)
        res.statusCode = 500
        res.send(error.message)
    }
})

app.listen(PORT, ()=>{
    console.log(`listening on port: ${PORT}`)
})