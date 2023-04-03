const Message = ({ message }) => {
  return (
    <div className={`message ${message.own ? "own" : "not"}`}>
      <div className="message__container">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Vitae neque,
        quod quos commodi, corrupti, nisi asperiores maiores animi soluta
        necessitatibus aspernatur aperiam aliquid! Voluptates ea id dolorum
        fugiat aliquam, voluptatibus quasi quidem corrupti voluptas itaque
        asperiores maxime, nisi soluta illum corporis veritatis consequatur
        natus deleniti? Minus, error atque illum, incidunt voluptates itaque sed
        earum tempore id ipsum nam vel quasi.
        <p></p>
      </div>
    </div>
  );
};

export default Message;
