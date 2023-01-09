const uuid = require("uuid");
const Message = require("../models/messages.models")
const getAllMessage = async () => {
  const data = await Message.findAndCountAll({
    attributes: {
      exclude: [ "createdAt", "updateAt"]
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
      exclude: [ "createdAt", "updateAt"]
    },
   
  });
  return data;
};

const createMessage = async (data) => {
  const response = await Message.create({
    id: uuid.v4(),
    message: data.message
  });
  return response;
};

const getMessageByConversation = async () => {
  const data = await Message.findAll({
   
  });
  return data;
};

module.exports = {
  getAllMessage,
  getMessageById,
  createMessage,
  getMessageByConversation,
};
