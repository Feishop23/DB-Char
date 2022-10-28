const conversationController = require('./conversation.controller')
const {host} = require('../config')

const getAllConsevartion = (req,res) => {
    const offset = Number(req.query.offset) || 0
    const limit = Number(req.query.limit) || 30
    const urlBase = `${host}/api/v1/posts`

    conversationController.getAllConversation(offset,limit)
    .then(data=>{
        const nextPage = data.count - offset >= limit ? `${urlBase}?offset=${offset + limit}&limit=${limit}` : null
        const prevPage = offset - limit >= 0 ? `${urlBase}?offset=${offset - limit}&limit=${limit}` : null
        res.status(200).json({
            next: nextPage,
            prev: prevPage,
            items: data.count,
            offset,
            limit,
            results: data.rows
        })
    
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })
}


const createConversation = (req, res) => {
    const userId = req.user.id
    const {title, imageUrl, createdBy} = req.body
    if(title && imageUrl && createdBy){
        conversationController.createConversation({title, imageUrl,createdBy})
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json(err.message)
        })
    }else{
        res.status(400).json({
            message: 'missing data',
            fields:{
                title: 'string',
                imageUrl: 'string',
                category: 'uuid'
            }
        })
    }
}

const getConversationByUser = (req, res) => {
    const createdBy = req.params.id
    conversationController.getConversationByCreatedBy(createdBy)
    .then(data => {
        res.status(200).json(data)
    })
    .catch(err => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    getAllConsevartion,
    createConversation,
    getConversationByUser
}