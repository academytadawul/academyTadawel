import React from "react";

const Item1 = ({ icon, text1, text2 }) => {
  return (
    <>
      <div className="item1_container">
        <div className="icon">{icon}</div>
        <div className="title">{text1}</div>
        <div>{text2}</div>
      </div>
    </>
  );
};

export default Item1;
