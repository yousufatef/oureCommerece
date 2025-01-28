import { Heading } from "@components/common"
import CartItem from "@components/eCommerce/CartItem/CartItem"
import { Col, Row } from "react-bootstrap"

const Cart = () => {
    return (
        <>
            <Heading>Cart</Heading>
            <Row>
                <Col>
                    <CartItem />
                </Col>
            </Row>
        </>
    )
}

export default Cart