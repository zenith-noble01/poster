import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Navbar, Conversation, Message } from "../components";
import "../Styles/messenger.scss";
import { apiRoute } from "../Constants";
import axios from "axios";
import { getUser } from "../Helper";
import { toast } from "react-hot-toast";
import { FaTelegramPlane } from "react-icons/fa";

const Messenger = () => {
  const [conversations, setConversations] = useState([]);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [noMessage, setNoMessage] = useState("");
  const [currentChat, setCurrentChat] = useState(null);
  const [activeChat, setActiveChat] = useState(null); // Add a new state variable to store the ID of the active chat

  const [id, setId] = useState(null);

  const scrollRef = useRef();

  useEffect(() => {
    const fetchConversations = async () => {
      try {
        const { userId } = await getUser();
        setId(userId);
        const { data } = await axios.get(`${apiRoute}/conversation/${userId}`);
        setConversations(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchConversations();
  }, []);

  const handleAddMessage = async (e, conversationId) => {
    e.preventDefault();

    if (text.length < 2) {
      return toast.error("Message text should be greater than 2 letters");
    }

    const message = {
      text,
      sender: id,
      conversationId,
    };

    const { data } = await axios.post(`${apiRoute}/message`, message);

    setMessages([...messages, data]);

    setText("");
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleConversationClick = (conversation) => {
    setCurrentChat(conversation);
    setActiveChat(conversation?._id);
  };

  useEffect(() => {
    const getMessages = async () => {
      try {
        const { data } = await axios.get(`${apiRoute}/message/${activeChat}`);

        if (data.msg === "No messages yet") {
          setNoMessage(data.msg);
          setMessages([]);
        } else {
          setMessages(data);
          setNoMessage("");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getMessages();
  }, [activeChat, messages]);

  const renderConversations = () => {
    return conversations.map((conversation, index) => (
      <div onClick={() => handleConversationClick(conversation)} key={index}>
        <Conversation
          conversation={conversation}
          key={index}
          active={conversation?._id === activeChat} // Pass a boolean value to indicate whether the conversation is active
        />
      </div>
    ));
  };

  const renderMessages = () =>
    noMessage ? (
      <p>{noMessage}</p>
    ) : (
      messages.map((message, index) => (
        <Message message={message} key={index} own={message?.sender === id} />
      ))
    );

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
          {currentChat ? (
            <>
              <div
                className="message__wrapper"
                ref={scrollRef}
                style={{ height: "calc(100% - 60px)", overflowY: "auto" }}
              >
                {renderMessages()}
                <div ref={scrollRef}></div>
              </div>
              <form
                className="input__container"
                onSubmit={
                  (e) => handleAddMessage(e, activeChat) // Pass the conversation ID as an argument to the handleAddMessage function
                }
              >
                <textarea
                  placeholder="Add a message..."
                  onChange={(e) => setText(e.target.value)}
                  value={text}
                />
                <button>send</button>
              </form>
            </>
          ) : (
            <div className="no__chat__container">
              <div className="message__icon">
                <FaTelegramPlane />
              </div>
              <p>
                Send Messages{" "}
                <span>Send private messages to organisations.</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Messenger;
