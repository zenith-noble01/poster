import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { NewPost } from "./components";
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

  return (
    <div className="App" data-theme={theme}>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Hero />} />
        <Route path="/poster/:id" element={<Post />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/messages" element={user ? <Messenger /> : <Signin />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      {poster && <NewPost />}
    </div>
  );
};

export default App;
