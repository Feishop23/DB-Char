const router = require('express').Router()
const passport = require('passport')

const participantServices = require('./participant.services')
require('../middlewares/auth.middleware')(passport)

router.route('/')
.get(participantServices.getAllParticipant)
.post(
    passport.authenticate('jwt', {session:false}),
    participantServices.createParticipant
)

module.exports = router