const uuid = require('uuid')
const Participant = require('../models/participants.models')
const Conversation = require('../models/conversations.models')
const User = require('../models/users.models')

const getAllParticipant = async () => {
    const data = await Participant.findAndCountAll({
        attributes:{
            exclude: ['conversation_id','user_id','createdAt','updateAt']
        },
        include:[
            {
                model: User,
                as: "user",
                attributes: ["id", "firstName", "lastName", "email"],
              },
              {
                model: Conversation,
                as: "conversation",
                attributes: {
                  exclude: ["id"],
                },
              }
        ],
        attributes: {
            exclude: ["createdAt", "updateAt", "conversation_id"],
          }
    })
    return data
}

const getParticipantById = async (id) => {
    const data = await Participant.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ["user_id", "conversation_id", "createdAt", "updateAt"],
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["id", "firstName", "lastName", "email"],
        },
        {
          model: Conversation,
          as: "conversation",
          attributes: {
            exclude: ["id"],
          },
        },
      ],
      attributes: {
        exclude: ["createdAt", "updateAt", "conversation_id"],
      },
    });
    return data;
  };

  const createParticipant = async (data) => {
    const response = await Participant.create({
      id: uuid.v4(),
      userId: data.userId,
      conversationId: data.conversationId,
    });
    return response;
  };

  const getParticipantByConversation = async (conversation_id) => {
    const data = await Conversation.findAll({
      where: {
        conversation_id,
      },
    });
    return data;
  };

module.exports = {
    getAllParticipant,
    getParticipantById,
    createParticipant,
    getParticipantByConversation
}