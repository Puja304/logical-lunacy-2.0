import React from "react"
import "../components/row.css"

export default function Row(props){
    const cols = props.columns;
    const thisRow = Array(cols).fill('')

    for (let i = props.pos; i < (props.pos + props.value.length); i++){
        thisRow[i] = props.value[i - props.pos]
    }


    return (
        <tr className="aRow">
            {thisRow.map((char,index) => (
                <td key={index} className="cell">{char}</td>
            ))}
        </tr>
    )
}