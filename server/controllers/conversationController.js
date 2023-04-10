import Conversation from "../models/conversation.js";

//new conv

const newConversation = async (req, res) => {
  try {
    // Check if conversation already exists
    const conversation = await Conversation.findOne({
      members: { $all: [req.body.senderId, req.body.receiverId] },
    });
    if (conversation) {
      return res.status(400).json({ message: "Conversation already exists" });
    }

    // Create new conversation
    const newConversation = new Conversation({
      members: [req.body.senderId, req.body.receiverId],
    });
    const savedConversation = await newConversation.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

//get conv of a user
const getConversation = async (req, res) => {
  const { userId } = req.params;
  try {
    const conversation = await Conversation.find({ members: userId });
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// get conv includes two userId

const getConversationBetweenUsers = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json(err);
  }
};

export { newConversation, getConversation, getConversationBetweenUsers };
