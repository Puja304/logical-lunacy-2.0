import React from "react"
import "../components/home.css"

export default function (props) {
    return (
        <div className="header">
            <p style={
                {color: props.light ? "black" : "#CBFDD0",
                backgroundColor: props.light ? "#FFFFFF" : "black"}
                }>
                {props.value}
            </p>
        </div>
        )
}