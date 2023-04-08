import { Toaster } from "react-hot-toast";
import {} from "react-icons/bs";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { NewPost } from "./components";
import { useOnlineStatus, Offline } from "./components/Offline";

import {
  Hero,
  Home,
  Messenger,
  NotFound,
  Post,
  Recent,
  Signin,
  SignUp,
} from "./pages";
import "./Styles/app.scss";

const App = () => {
  const theme = useSelector((state) => state.theme);
  const poster = useSelector((state) => state.poster);

  const user = useSelector((state) => state.auth.user);

  const isOnline = useOnlineStatus();

  return (
    <div className="App" data-theme={theme}>
      <Toaster position="bottom-left" reverseOrder={false} />
      {isOnline ? (
        <Routes>
          <Route path="/" element={user ? <Home /> : <Hero />} />
          <Route path="/poster/:id" element={<Post />} />
          <Route path="/recent" element={<Recent />} />
          <Route path="/messages" element={user ? <Messenger /> : <Signin />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/profile/:id" element={<Signin />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      ) : (
        <Offline />
      )}

      {poster && <NewPost />}
    </div>
  );
};

export default App;
