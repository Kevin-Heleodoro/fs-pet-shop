
let userUrl = '/pets/345'
const petRegExp = new RegExp(/^\/pets(\/\d*)/);

const found = petRegExp.test(userUrl) //true
let petSearch = petRegExp.exec(userUrl); //object
let petNum = petSearch[1].substr(1)


console.log(petNum)