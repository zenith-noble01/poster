const Conversation = ({ conversation }) => {
  return (
    <div className="conversation">
      <img src={conversation.profile} alt="" />
      <div className="user__information">
        <p>{conversation.username}</p>
        <span>lorem lorem lorem</span>
      </div>
    </div>
  );
};

export default Conversation;
