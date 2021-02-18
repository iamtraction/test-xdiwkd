/**
 * @author Sankarsan Kampa
 * @url https://traction.one
 */

import React from "react";

const Section = ({ children, title, description, style }) => (
    <div style={{
        flex: 1,
        ...style,
        minWidth: 250,
    }}>
        <div style={{
            padding: 10,
            fontWeight: "bold",
        }}>
            { title }
        </div>
        <div style={{
            padding: 10,
            color: "gray",
        }}>
            { description }
        </div>
        <div style={{
            padding: 10,
        }}>
            { children }
        </div>
    </div>
);

export default Section;
