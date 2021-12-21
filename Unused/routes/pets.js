const Router = require('express-promise-router');

//require the database adapter file
const db = require('../database');

const router = new Router();

module.exports = router

//sets up a get middleware 
router.get('/pets/:id', async(req,res)=>{
    const {id} = req.params
    const {rows} = await db.query('SELECT * FROM pets WHERE id = $1', [id])
    res.send(rows[0])
})

