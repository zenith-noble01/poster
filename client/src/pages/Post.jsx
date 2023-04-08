import "../Styles/post.scss";
import { Sidebar, Navbar } from "../components";
import { noAvatar, notFound } from "../Images";
import { BiDotsHorizontalRounded, BiSmile } from "react-icons/bi";
import { apiRoute } from "../Constants";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { comomentPost, createNewConversation, getUser } from "../Helper";
import { toast, Toaster } from "react-hot-toast";
const Post = () => {
  const location = useLocation();
  const [text, setText] = useState("");
  const [availableUser, setAvailableUser] = useState({});
  const [comments, setComments] = useState([]);
  const [postNotFound, setPostNotFound] = useState(false);
  const [post, setPost] = useState({});
  const [user, setUser] = useState({});
  const [commentUser, setCommentUser] = useState({});
  const scrollRef = useRef();

  const pathname = location.pathname.split("/")[2];

  const navigate = useNavigate();
  useEffect(() => {
    const getAPost = async () => {
      try {
        const { data } = await axios.get(`${apiRoute}/post/${pathname}`);
        setPost(data);
        const { data: response } = await axios.get(
          `${apiRoute}/auth/u/${post?.userId}`
        );
        setUser(response);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          return setPostNotFound(true);
        }
      }
    };

    getAPost();
  }, [pathname, post.userId]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const user = await getUser();

        setAvailableUser(user);
      } catch (error) {
        console.log(error);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    const getComment = async () => {
      try {
        const {
          data: { comments },
        } = await axios.get(`${apiRoute}/comment/p/${pathname}`);

        const userIds = comments
          .map((comment) => comment.userId)
          .filter(Boolean);

        await Promise.all(
          userIds.map(async (userId) => {
            const { data } = await axios.get(`${apiRoute}/auth/u/${userId}`);
            setCommentUser(data);
          })
        );

        setComments(comments);
      } catch (error) {
        console.log(error);
      }
    };

    getComment();
  }, [pathname]);

  const handlSubmit = async (e) => {
    e.preventDefault();

    if (post.isAllowed) {
      const { userId } = await getUser();

      const credentials = {
        userId,
        postId: pathname,
        text,
      };

      let commentPromise = comomentPost(credentials);

      toast.promise(commentPromise, {
        loading: "Commenting on post",
        success: <b>Commented!</b>,
        error: <b>Could not Comment...!</b>,
      });

      commentPromise.then(() => {
        setComments([...comments, credentials]);
        setText("");
      });
    } else {
      return toast.error("User blocked all comments on this post!");
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [comments]);

  const { userId } = availableUser;

  const handleCreateConversation = async () => {
    const conversation = {
      senderId: userId,
      receiverId: post?.userId,
    };

    let conversationPromise = createNewConversation(conversation);

    toast.promise(conversationPromise, {
      loading: "Creating a new Conversation...",
      success: <b>Created Successfully!</b>,
      error: <b>Could not create Conversation!</b>,
    });

    conversationPromise
      .then(() => {
        setTimeout(() => {
          navigate("/messages");
        }, 1000);
      })
      .catch((error) => {
        const {
          response: {
            data: { message },
          },
        } = error;

        if (message === "Conversation already exists") {
          toast.error("Conversation already exists");
          setTimeout(() => {
            navigate("/messages");
          }, 1000);
        }
      });
  };

  return (
    <>
      {postNotFound ? (
        <div className="app__post">
          <Sidebar />
          <div className="notFound__container">
            <img src={notFound} alt="" />
            <h1>Post not found</h1>
          </div>
        </div>
      ) : (
        <div className="app__post">
          <Toaster position="top-center" />
          <Sidebar />
          <div className="post__container outlet">
            <Navbar title="Poster" />
            <div className="poster__container">
              <div className="left__poster">
                <img src={post?.postImg} alt="" />
              </div>
              <div className="right__poster">
                <div className="poster__header">
                  <div className="user">
                    <img
                      src={user?.profile ? user?.profile : noAvatar}
                      alt=""
                    />
                    <p>{user?.username}</p>
                  </div>
                  {userId === post?.userId ? null : (
                    <button onClick={handleCreateConversation}>Message</button>
                  )}
                  <BiDotsHorizontalRounded />
                </div>
                <div className="poster__desc">
                  <p>
                    <img
                      src={user?.profile ? user?.profile : noAvatar}
                      alt=""
                    />

                    <span>{user?.username}</span>
                    <b> {post?.description}</b>
                  </p>

                  <ul className="post__comments" ref={scrollRef}>
                    {comments?.map((comment, index) => (
                      <li key={comment?._id || index}>
                        <Link to={`/profile/${commentUser?._id}`}>
                          <img
                            src={
                              commentUser?.profile ? user?.profile : noAvatar
                            }
                            alt=""
                          />
                        </Link>
                        <span>{comment?.text}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <form className="poster__comment" onSubmit={handlSubmit}>
                  <img src={user?.profile ? user?.profile : noAvatar} alt="" />
                  <div className="input__container">
                    <input
                      type="text"
                      placeholder="Add a comment "
                      onChange={(e) => setText(e.target.value)}
                      value={text}
                    />
                    <BiSmile />
                  </div>
                  <button>Post</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Post;
