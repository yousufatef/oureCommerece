import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInType } from "@validations/signInSchema";
import { Heading } from "@components/common";
import { Input } from "@components/form";
import { Form, Button, Row, Col, Alert, Spinner } from "react-bootstrap";
import { resetUI, thunkAuthLogin } from "@store/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

const Login = () => {
    const dispatch = useAppDispatch()
    const { loading, error, accessToken } = useAppSelector(state => state.auth)
    const navigate = useNavigate()
    const [searchParams, setSearchParams] = useSearchParams()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<signInType>({
        mode: "onBlur",
        resolver: zodResolver(signInSchema),
    });

    const submitForm: SubmitHandler<signInType> = (data) => {
        if (searchParams.get("message")) {
            setSearchParams("")
        }
        dispatch(thunkAuthLogin(data)).unwrap().then(() => {
            navigate("/")
        })
    };
    useEffect(() => {
        return () => {
            dispatch(resetUI())
        }
    }, [dispatch])
    if (accessToken) {
        return <Navigate to='/' />
    }
    return (
        <>
            <Heading title="User Login" />
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    {searchParams.get("message") === "login_required" && (
                        <Alert variant="success">You need to login to view this content</Alert>
                    )}
                    {searchParams.get("message") === "account_created" && (
                        <Alert variant="success">Your account successfully created, please login</Alert>
                    )}
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <Input
                            name="email"
                            label="Email Address"
                            register={register}
                            error={errors.email?.message}
                        />
                        <Input
                            type="password"
                            name="password"
                            label="Password"
                            register={register}
                            error={errors.password?.message}
                        />
                        <Button variant="info" type="submit" style={{ color: "white" }}>
                            {loading === "pending" ? (
                                <>
                                    <Spinner animation="border" size="sm"></Spinner> Loading...
                                </>
                            ) : (
                                "Submit"
                            )}
                        </Button>
                        {error && (
                            <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>
                        )}
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default Login;