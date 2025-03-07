import styles from "./styles.module.css"
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import HeaderLeftBar from "./HeaderLeftBar/HeaderLeftBar";
import { useAppSelector } from "@store/hooks";
import { useDispatch } from "react-redux";
import { authLogout } from "@store/auth/authSlice";



const { headerContainer, headerLogo, headerLeftBar } = styles;
const Header = () => {
    const dispatch = useDispatch()
    const { user, accessToken } = useAppSelector((state) => state.auth)
    return (
        <header>
            <div className={headerContainer}>
                <h1 className={headerLogo}><span>our</span> <Badge bg='info'>eCom</Badge></h1>
                <div className={headerLeftBar}>
                    <HeaderLeftBar />
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
                            {accessToken ? <>
                                <NavDropdown
                                    id="nav-dropdown-dark-example"
                                    title={`Welcome ${user?.firstName} ${user?.lastName}`}
                                    menuVariant="dark"
                                >
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/profile"
                                    >Profile</NavDropdown.Item>
                                    <NavDropdown.Item>Orders</NavDropdown.Item>
                                    <NavDropdown.Item
                                        as={NavLink}
                                        to="/"
                                        onClick={(() => dispatch(authLogout()))}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </> : <>
                                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
                            </>}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    )
}

export default Header