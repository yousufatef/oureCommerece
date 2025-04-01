import { Container } from "react-bootstrap"
import { Header, Footer } from "@components/common"

import styles from "./styles.module.css"
import { Outlet } from "react-router-dom"
import { ToastList } from "@components/feedback"
const { container, wrapper } = styles

const MainLayout = () => {
    return (
        <Container className={container}>
            <Header />
            <div className={wrapper}>
                <Outlet />
            </div>
            <ToastList />
            <Footer />
        </Container>
    )
}

export default MainLayout