import axios from "axios";
import { useEffect, useState } from "react";
import { apiRoute } from "../Constants";
import { noAvatar } from "../Images";

const Conversation = ({ conversation, currentUser, active, lastMessage }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const friendId = conversation?.members?.find((m) => m !== currentUser);

        const { data } = await axios.get(`${apiRoute}/auth/u/${friendId}`);

        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };

    getUser();
  }, [conversation?.members, currentUser]);

  return (
    <div className={`${active ? "conversation active" : "conversation"}`}>
      <img src={user?.profile ? user?.profile : noAvatar} alt="" />
      <div className="user__information">
        <p>{user?.username}</p>
        {/* <span>{lastMessage}</span> */}
      </div>
    </div>
  );
};

export default Conversation;
