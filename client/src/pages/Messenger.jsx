import React from "react";
// import { BiSearch } from "react-icons/bi";
import { Navbar, Conversation, Message } from "../components";
import "../Styles/messenger.scss";
import { conversations, messages } from "../Constants";

const Messenger = () => {
  return (
    <div className="app__messenger">
      <Navbar />
      <div className="messenger__container">
        <div className="messenger__sidebar">
          {/*      <div className="search__container">
            <input type="text" placeholder="Search user" />
            <BiSearch />
          </div> */}
          <div className="sidebar__conversations">
            {conversations.map((conversation, index) => (
              <Conversation conversation={conversation} key={index} />
            ))}
          </div>
        </div>
        <div className="message__container">
          <div className="message__wrapper">
            {messages.map((message, index) => (
              <Message message={message} key={index} />
            ))}
          </div>

          <div className="input__container">
            <textarea placeholder="Add a message..." />
            <button>send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
