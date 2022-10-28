const route = require('express').Router()
const passport = require('passport')

const messageServices = require('./message.services')
require('../middlewares/auth.middleware')(passport)

route.route('/')
.get(messageServices.getAllMessage)
.post(
    passport.authenticate('jwt', {session:false}),
    messageServices.createMessage
)

module.exports = route