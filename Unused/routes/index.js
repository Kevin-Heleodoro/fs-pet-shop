const pets = require('./pets');

//export the route to be used by app
module.exports = app => {
    app.use('/pets', pets)
}