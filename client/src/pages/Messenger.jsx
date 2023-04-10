import React, { useEffect, useRef, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { Navbar, Conversation, Message } from "../components";
import "../Styles/messenger.scss";
import { messages as meco, conversations as converso } from "../Constants";
import { apiRoute } from "../Constants";
import axios from "axios";
import { getUser } from "../Helper";
import { toast } from "react-hot-toast";

const Messenger = () => {
  const [conversations, setConversations] = useState(converso);
  const [messages, setMessages] = useState(meco);
  const [text, setText] = useState("");

  const scrollRef = useRef();
  useEffect(() => {
    const getConversations = async () => {
      try {
        const { userId } = await getUser();
        const { data } = await axios.get(`${apiRoute}/conversation/${userId}`);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    getConversations();
  }, []);

  const handleAddMessage = async (e) => {
    e.preventDefault();

    const message = {
      text,
      own: true,
    };

    if (text.length < 2)
      return toast.error("Message text should be greater than 2 letters");

    // const { userId } = await getUser();

    setMessages([...messages, message]);

    setText("");
  };

  // window.addEventListener("keypress", (event) => {
  //   if (event.key === "Enter") {
  //     handleAddMessage(event);
  //   }
  // });

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="app__messenger">
      {/* <Toaster position="" /> */}
      <Navbar />
      <div className="messenger__container">
        <div className="messenger__sidebar">
          <div className="search__container">
            <input type="text" placeholder="Search user" />
            <BiSearch />
          </div>
          <div className="sidebar__conversations">
            {conversations.map((conversation, index) => (
              <Conversation conversation={conversation} key={index} />
            ))}
          </div>
        </div>
        <div className="message__container">
          <div className="message__wrapper" ref={scrollRef}>
            {messages.map((message, index) => (
              <Message message={message} key={index} />
            ))}
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
