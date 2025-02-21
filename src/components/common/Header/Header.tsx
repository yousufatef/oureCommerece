import HeaderBasket from "@components/eCommerce/HeaderBasket/HeaderBasket";
import HeaderWishlist from "@components/eCommerce/HeaderWishlist/HeaderWishlist"
import styles from "./styles.module.css"
import { Badge, Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom";

const { headerContainer, headerLogo, headerLeftBar } = styles;
const Header = () => {
    return (
        <header>
            <div className={headerContainer}>
                <h1 className={headerLogo}><span>our</span> <Badge bg='info'>eCom</Badge></h1>
                <div className={headerLeftBar}>
                    <HeaderWishlist />
                    <HeaderBasket />
                </div>
            </div>
            <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme='dark'>
                <Container>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
                            <Nav.Link as={NavLink} to="/categories">Categories</Nav.Link>
                            <Nav.Link as={NavLink} to="/about-us">About</Nav.Link>
                        </Nav>
                        <Nav>
                            <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                            <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header