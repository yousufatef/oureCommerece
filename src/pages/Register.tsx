import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema, signUpType } from "@validations/signUpSchema";
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { Heading } from "@components/common";
import { Input } from "@components/form";
import { Form, Button, Row, Col, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { resetUI, thunkAuthRegister } from "@store/auth/authSlice";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { loading, error, accessToken } = useAppSelector(state => state.auth)

    const {
        register,
        handleSubmit,
        getFieldState,
        trigger,
        formState: { errors },
    } = useForm<signUpType>({
        mode: "onBlur",
        resolver: zodResolver(signUpSchema),
    });

    const submitForm: SubmitHandler<signUpType> = (data) => {
        const { firstName, lastName, email, password } = data
        dispatch(thunkAuthRegister({ firstName, lastName, email, password })).unwrap().then(() => {
            navigate("/login?message=account_created")
        })
    };

    const {
        emailAvailabilityStatus,
        enteredEmail,
        checkEmailAvailability,
        resetCheckEmailAvailability,
    } = useCheckEmailAvailability();

    const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
        await trigger("email");
        const value = e.target.value;
        const { isDirty, invalid } = getFieldState("email");

        if (isDirty && !invalid && enteredEmail !== value) {
            checkEmailAvailability(value);
        }

        if (isDirty && invalid && enteredEmail) {
            resetCheckEmailAvailability();
        }
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
            <Heading title="User Registration" />
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={handleSubmit(submitForm)}>
                        <Input
                            label="First Name"
                            name="firstName"
                            register={register}
                            error={errors.firstName?.message}
                        />
                        <Input
                            label="Last Name"
                            name="lastName"
                            register={register}
                            error={errors.lastName?.message}
                        />
                        <Input
                            label="Email Address"
                            name="email"
                            register={register}
                            onBlur={emailOnBlurHandler}
                            error={
                                errors.email?.message
                                    ? errors.email?.message
                                    : emailAvailabilityStatus === "notAvailable"
                                        ? "This email is already in use."
                                        : emailAvailabilityStatus === "failed"
                                            ? "Error from the server."
                                            : ""
                            }
                            formText={
                                emailAvailabilityStatus === "checking"
                                    ? "We're currently checking the availability of this email address. Please wait a moment."
                                    : ""
                            }
                            success={
                                emailAvailabilityStatus === "available"
                                    ? "This email is available for use."
                                    : ""
                            }
                            disabled={emailAvailabilityStatus === "checking" ? true : false}
                        />
                        <Input
                            type="password"
                            label="Password"
                            name="password"
                            register={register}
                            error={errors.password?.message}
                        />
                        <Input
                            type="password"
                            label="Confirm Password"
                            name="confirmPassword"
                            register={register}
                            error={errors.confirmPassword?.message}
                        />
                        <Button
                            variant="info"
                            type="submit"
                            style={{ color: "white" }}
                            // eslint-disable-next-line no-constant-binary-expression
                            disabled={emailAvailabilityStatus === "checking" ? true : false || loading === "pending"}
                        >
                            {loading === "pending" ? <>
                                <Spinner animation="border" size="sm" />
                                Loading...
                            </> : "Submit"}
                        </Button>
                        {error && <p style={{ color: "#DC3545", marginTop: "10px" }}>{error}</p>}
                    </Form>
                </Col>
            </Row>
        </>
    );
};

export default Register;