import React from "react";
import "./Popup.css"
 
export const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box" style={{border: `4px solid ${props.border_colour}`}}>
        {props.content}
      </div>
    </div>
  );
};
 