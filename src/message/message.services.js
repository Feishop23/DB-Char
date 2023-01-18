const messageController = require('./message.controller')
const {host} = require('../config')

const getAllMessage = (req,res) => {

    const offset = Number(req.query.offset) || 0
    const limit = Number(req.query.limit) || 10

   const urlBase = `${host}/api/v1/message`


    messageController.getAllMessage(offset,limit )
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

const createMessage = (req, res) => {
    const { message} = req.body
    if( message){
        messageController.createMessage({ message}
            )
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(400).json(err.message)
            })
    }else{
        res.status(400).json({
            message: 'missing data err',
            fields: {
                message: 'string'
            }
        })
    }
    }

    const getMessageByConversation = (req, res) => {
        const conversation = req.params.id
        messageController.getMessageByConversation(conversation)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
    }

    module.exports = {
        getAllMessage,
        createMessage,
        getMessageByConversation
    }
