import React from "react"

const Heading = ({ children }: { children: React.ReactNode }) => {
    return (
        <h2 className="mb-3" style={{ fontSize: "26px", fontWeight: "bold" }}> {children}</h2 >
    )
}

export default Heading