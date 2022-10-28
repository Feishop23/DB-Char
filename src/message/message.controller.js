const uuid = require("uuid");
const Message = require("../models/messages.models");
const User = require("../models/users.models");
const Conversation = require("../models/conversations.models");

const getAllMessage = async () => {
  const data = await Message.findAndCountAll({
    attributes: {
      exclude: ["sender_id", "conversation_id", "createdAt", "updateAt"]
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

const getMessageById = async (id) => {
  const data = await Message.findOne({
    where: {
      id,
    },
    attributes: {
      exclude: ["sender_id", "conversation_id", "createdAt", "updateAt"],
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

const createMessage = async (data) => {
  const response = await Message.create({
    id: uuid.v4(),
    senderId: data.senderId,
    conversationId: data.conversationId,
    message: data.message,
  });
  return response;
};

const getMessageByConversation = async (conversation_id) => {
  const data = await Message.findAll({
    where: {
      conversation_id,
    },
  });
  return data;
};

module.exports = {
  getAllMessage,
  getMessageById,
  createMessage,
  getMessageByConversation,
};
