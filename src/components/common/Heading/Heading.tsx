import { memo } from "react"

const Heading = memo(({ title }: { title: string }) => {
    console.log("Heading");

    return (
        <h2 className="mb-3" style={{ fontSize: "26px", fontWeight: "bold" }}> {title}</h2 >
    )
})

export default Heading