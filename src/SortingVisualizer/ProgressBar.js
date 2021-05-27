import React from "react";
import "./ProgressBar.css"

export const ProgressBar = (props) => {
    const width = props.progress;
    return(
        <div className="progress">
            <div className="progress__fill" id = "fill" style={{"--width":`${width}`}}></div>
            <span className="progress__text" id = "text">{width}%</span>
        </div>
        /*<div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>()*/
    )
}