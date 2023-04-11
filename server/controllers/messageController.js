import Message from "../models/message.js";
import Conversation from "../models/conversation.js";

//add

const newMessage = async (req, res) => {
  const { conversationId } = req.body;
  try {
    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).send({ msg: "Conversation not found" });
    }

    const newMessage = new Message(req.body);

    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get

const getMessageByConversation = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({
      conversationId: conversationId,
    });

    if (messages.length === 0) {
      return res.status(200).send({ msg: "No messages yet" });
    }

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json(err);
  }
};

export { newMessage, getMessageByConversation };
