const router = require('express').Router()
const passport = require('passport')

const conversationServices = require('./conversation.services')
require('../middlewares/auth.middleware')(passport)

router.route('/')
.get(conversationServices.getAllConsevartion)
.post(
    passport.authenticate('jwt', {session:false}),
    conversationServices.createConversation
)


module.exports = router