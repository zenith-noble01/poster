import React from "react";
import { useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { NewPost } from "./components";
import { Home, Messenger, Post, Recent } from "./pages";
import "./Styles/app.scss";

const App = () => {
  const theme = useSelector((state) => state.theme);
  const poster = useSelector((state) => state.poster);

  return (
    <div className="App" data-theme={theme}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/poster/:id" element={<Post />} />
        <Route path="/recent" element={<Recent />} />
        <Route path="/messages" element={<Messenger />} />
      </Routes>

      {poster && <NewPost />}
    </div>
  );
};

export default App;