import styles from "./styles.module.css"
import { Badge, Container, Nav, Navbar, NavDropdown } from "react-bootstrap"
import { NavLink } from "react-router-dom";
import HeaderLeftBar from "./HeaderLeftBar/HeaderLeftBar";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { authLogout } from "@store/auth/authSlice";
import { useEffect } from "react";
import { thunkGetWishlist } from "@store/wishlist/wishlistSlice";



const { headerContainer, headerLogo, headerLeftBar } = styles;
const Header = () => {
    const dispatch = useAppDispatch()
    const { user, accessToken } = useAppSelector((state) => state.auth)

    useEffect(() => {
        if (accessToken) {
            dispatch(thunkGetWishlist("ProductIds"));
        }
    }, [dispatch, accessToken]);
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
                                        end
                                    >Profile</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink}
                                        to="profile/orders">Orders</NavDropdown.Item>
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