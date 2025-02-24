import { LottieHandler } from "@components/feedback"
import React from "react"
import { Col, Row } from "react-bootstrap"

type TGridList<T,> = {
    record: T[],
    renderItem: (record: T) => React.ReactNode,
    emptyMessage: string
}
type HasID = { id?: number }

const GridList = <T extends HasID>({ record, renderItem, emptyMessage }: TGridList<T>) => {
    const categoriesList =
        record.length > 0
            ?
            record.map((record) => (
                <Col key={record.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center mb-5 mt-2">
                    {renderItem(record)}
                </Col>
            )) : <LottieHandler type="empty" message={emptyMessage} />

    return <Row>{categoriesList}</Row>
}

export default GridList

// Using Render Props Pattern 