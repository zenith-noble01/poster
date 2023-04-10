import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Navbar, Conversation, Message } from "../components";
import "../Styles/messenger.scss";
import {
  apiRoute,
  conversations as converso,
  messages as meco,
} from "../Constants";
import axios from "axios";
import { getUser } from "../Helper";
import { toast } from "react-hot-toast";

const Messenger = () => {
  const [conversations, setConversations] = useState(converso);
  const [messages, setMessages] = useState(meco);
  const [text, setText] = useState("");

  const scrollRef = useRef();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { userId } = await getUser();
        const { data } = await axios.get(`${apiRoute}/conversation/${userId}`);
        // setConversations(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchConversations();
  }, []);

  const handleAddMessage = async (e) => {
    e.preventDefault();

    if (text.length < 2) {
      return toast.error("Message text should be greater than 2 letters");
    }

    const message = {
      text,
      own: true,
    };

    setMessages([...messages, message]);
    setText("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const renderConversations = () => {
    return conversations.map((conversation, index) => (
      <Conversation conversation={conversation} key={index} />
    ));
  };

  const renderMessages = () => {
    return messages.map((message, index) => (
      <Message message={message} key={index} />
    ));
  };

  return (
    <div className="app__messenger">
      <Navbar />
      <div className="messenger__container">
        <div className="messenger__sidebar">
          <div className="search__container">
            <input type="text" placeholder="Search user" />
            <BiSearch />
          </div>
          <div className="sidebar__conversations">{renderConversations()}</div>
        </div>
        <div className="message__container">
          <div
            className="message__wrapper"
            ref={scrollRef}
            style={{ height: "calc(100% - 60px)", overflowY: "auto" }}
          >
            {renderMessages()}
            <div ref={scrollRef}></div>
          </div>

          <form className="input__container" onSubmit={handleAddMessage}>
            <textarea
              placeholder="Add a message..."
              onChange={(e) => setText(e.target.value)}
              value={text}
            />
            <button>send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Messenger;
