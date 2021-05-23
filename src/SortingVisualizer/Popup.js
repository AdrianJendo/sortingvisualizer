import React from "react";
import "./Popup.css"

export const Popup = (props) => {
  return (
    <div className="popup-box">
      <div className="box" style={{borderColor: props.border_colour}}>
        {props.content}
      </div>
    </div>
  );
};
 