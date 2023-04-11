import React, { useState, useEffect } from "react";
import "../Styles/animate.scss";

const GreetingsAnimation = () => {
  const [greetings, setGreetings] = useState("Welcome to our website!");
  const [showGreetings, setShowGreetings] = useState(true);

  useEffect(() => {
    const date = new Date();
    const hour = date.getHours();

    if (hour >= 5 && hour < 12) {
      setGreetings("Good morning ⛅");
    } else if (hour >= 12 && hour < 18) {
      setGreetings("Good afternoon 🌞");
    } else {
      setGreetings("Good evening 🌚");
    }

    const timeoutId = setTimeout(() => {
      setShowGreetings(false);
    }, 10000);

    return () => clearTimeout(timeoutId);
  }, []);

  const poster = "Poster 🔥";

  return (
    <div>
      {showGreetings ? (
        <h1 className="animate__animated animate__fadeInDown">{greetings}</h1>
      ) : (
        <h1 className="animate__animated animate__fadeInUp">{poster}</h1>
      )}
    </div>
  );
};

export default GreetingsAnimation;
