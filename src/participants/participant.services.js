const participantController = require('./participant.controller')
const {host} = require('../config')

const getAllParticipant = (req,res) => {

    const offset = Number(req.query.offset) || 0
    const limit = Number(req.query.limit) || 10

   const urlBase = `${host}/api/v1/participant`


    participantController.getAllParticipant(offset,limit )
    .then(data => {


        const nextPage = data.count - offset >= limit ? `${urlBase}?offset=${offset + limit}&limit=${limit}` : null
        const prevPage = offset - limit >= 0 ? `${urlBase}?offset=${offset - limit}&limit=${limit}` : null
        res.status(200).json({
        next:  nextPage,
        prev: prevPage,
        items: data.count,
        offset,
        limit,
        results: data.rows})
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })


}
    

const createParticipant = (req, res) => {
    const userId = req.user.id
    const {conversationId} = req.body
    if(conversationId){
        participantController.createParticipant({userId, conversationId}
            )
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }else{
        res.status(400).json({
            message: 'missing data',
            fields: {
                conversationId: 'uuid'
            }
        })
    }
    }


    const getParticipantByConversation = (req, res) => {
        const conversation = req.params.id
        participantController.getParticipantByConversation(conversation)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
    }

    module.exports = {
        getAllParticipant,
        createParticipant,
        getParticipantByConversation
    }