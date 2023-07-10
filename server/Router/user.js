const router = require('express').Router()
const user=require('../Controller/UserController')


router.post('/createUser' , user.createUser)


module.exports =router