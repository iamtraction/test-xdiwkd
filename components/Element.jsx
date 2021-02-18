/**
 * @author Sankarsan Kampa
 * @url https://traction.one
 */

import React from "react";

const Element = ({ name, clickHandler }) => (
    <div
        style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 10,
            padding: "15px 20px",
            backgroundColor: "#222",
            cursor: "pointer",
            ":hover": {
                backgroundColor: "#333",
            },
        }}
        onClick={ () => clickHandler(name.toLowerCase()) }
    >
        <div>{ name }</div>
    </div>
);

export default Element;
