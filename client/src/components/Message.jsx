const Message = ({ message }) => {
  return (
    <div className={`message ${message.own ? "own" : "not"}`}>
      <div className="message__container">
        <p className="text__content">{message?.text}</p>
        <p className="invissible"></p>
      </div>
    </div>
  );
};

export default Message;
