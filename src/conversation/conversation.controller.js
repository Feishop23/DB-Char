const uuid = require('uuid')
const Conversation = require('../models/conversations.models')
const Message = require('../models/messages.models')
const Participants = require('../models/participants.models')

const getAllConversation = async () => {
const data = await Conversation.findAndCountAll({
    attributes:{
        exclude:['created_by', 'createdAt','updateAt']
    },
    include:[
        {
            model:Message,
            as: 'message',
            attributes:['id','message']
        },
        {
            model:Participants,
            as: 'participants',
            attributes:{
                exclude:['id']
            }
        }
    ],
    attributes:{
        exclude:['creastedAt','updateAt','participant_id']
    }
})
return data
} 


const getConversationById = async (id) => {
const data = await Conversation.findOne({
    where:{
        id
    },
    attributes:{
        exclude:['created_by', 'createdAt','updateAt']
    },
    include:[
        {
            model:Message,
            as: 'message',
            attributes:['id','message']
        },
        {
            model:Participants,
            as: 'participants',
            attributes:{
                exclude:['id']
            }
        }
    ],
    attributes:{
        exclude:['creastedAt','updateAt','participant_id']
    }
})
return data
}


const createConversation = async (data) => {
const response = await Conversation.create({
    id: uuid.v4(),
    title: data.title,
    imageUrl: data.imageUrl,
    createdBy: data.createBy
})
return response
}

const getConversationByMessage = async (message) => {
 const data = await Conversation.findAll({
    where:{
        message
    }
 })
 return data
}

const getConversationByParticipants = async (participant_id) => {
const data = await Conversation.findAll({
    where:{
        participant_id
    }
})
return data
}

const getConversationByCreatedBy = async (created_by) => {
const data = await Conversation.findAll({
    where:{
    created_by
    }
})
return data
}

module.exports = {
    getAllConversation,
    getConversationById,
    createConversation,
    getConversationByMessage,
    getConversationByParticipants,
    getConversationByCreatedBy
}