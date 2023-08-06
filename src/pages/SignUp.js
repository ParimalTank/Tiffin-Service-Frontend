import React, { useEffect, useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
  MuiAlert,
} from "@material-tailwind/react";
import I1 from "../assets/images/Group 56.svg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { Signup } from "../Apis/Authapis";
import { useCookies } from "react-cookie";

// For Password Encrypt and decrypt
const bcrypt = require("bcryptjs-react");

// Data
const initialValues = {
  validateOnMount: true,
  firstName: "",
  email: "",
  password: "",
  conformPassword: "",
};

// for password validation
const lowercaseRegEx = /(?=.*[a-z])/;
const uppercaseRegEx = /(?=.*[A-Z])/;
const numericRegEx = /(?=.*[0-9])/;
const lengthRegEx = /(?=.{8,})/;

// validation
let signUpSchema = Yup.object().shape({
  firstName: Yup.string().required("FirstName is require"),
  email: Yup.string().email("Invalid email").required("Email is require"),
  password: Yup.string()
    .matches(
      lowercaseRegEx,
      "Must contains one lowercase alphabetical character!"
    )
    .matches(
      uppercaseRegEx,
      "Must contains one uppercase alphabetical character"
    )
    .matches(numericRegEx, "Must contains one Numeric character!")
    .matches(lengthRegEx, "Must contain 8 characters!")
    .required("Required!"),

  conformPassword: Yup.string().required("Required!"),
});

const SignUp = () => {
  const [userData, setUserData] = useState([{}]);

  const [openError, setOpenError] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);
  const [cookies, setCookie] = useCookies(["token"]);

  const navigate = useNavigate();

  const handleError = () => {
    setOpenError(true);
  };

  const handleSuccess = () => {
    setOpenSuccess(true);

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  const handleCloseError = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpenError(false);
  };

  const onSubmit = async (values) => {
    console.log("values: ", values);

    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(values.password, salt);

    const user = {
      userName: values.firstName,
      email: values.email,
      password: hash,
    };

    const responce = await Signup(user);

    // setCookie("token", responce.data.token, { path: "/" });

    // console.log("responce: ", responce);

    handleSuccess();

    navigate("/verification");
  };

  return (
    <>
      {openSuccess === true && alert ? (
        <Alert
          onClose={handleCloseError}
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          className="bg-[#2ec946]/10 text-[#2ec946] border-l-4 border-[#2ec946] rounded-none font-medium"
        >
          Successfully Register
        </Alert>
      ) : (
        ""
      )}

      {openError === true && alert ? (
        <Alert
          onClose={handleCloseError}
          icon={<InformationCircleIcon className="mt-px h-6 w-6" />}
          className="bg-[#fa6c6c]/10 text-[#fa6c6c] border-l-4 border-[#fa6c6c] rounded-none font-medium"
        >
          Already Register using this email!!! Please use another email
        </Alert>
      ) : (
        ""
      )}

      <div className="flex justify-center items-center h-[100vh] ">
        <div className="basis-[55%]">
          <img src={I1} alt="img-blur-shadow" layout="fill" />
        </div>

        <div className="basis-1/4">
          <Card color="transparent" shadow={false}>
            <Typography variant="h4" color="blue-gray">
              Sign Up
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Enter your details to register.
            </Typography>

            <Formik
              initialValues={initialValues}
              validationSchema={signUpSchema}
              onSubmit={onSubmit}
              validateOnChange={false} // Disable validation every field change
              validateOnBlur={false} // Disable validation every field blur
            >
              {({
                dirty,
                isValid,
                values,
                touched,
                errors,
                handleChange,
                validateField,
                handleBlur,
              }) => {
                // Avoid a race condition to allow each field to be validated on change
                const handleInputChange = async (e, fieldName) => {
                  await handleChange(e);
                  validateField(fieldName);
                };

                return (
                  <Form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                      <Input
                        size="lg"
                        label="Name"
                        id="firstName"
                        name="firstName"
                        defaultValue={values.firstName}
                        onChange={(e) => handleInputChange(e, "firstName")}
                        isValid={touched.firstName && !errors.firstName}
                        isInvalid={!!errors.firstName}
                      />
                      {errors.firstName ? (
                        <span className="text-red-400 error-text mb-0 mt-[-22px]">
                          {errors.firstName}
                        </span>
                      ) : null}
                      <Input
                        size="lg"
                        label="Email"
                        id="email"
                        name="email"
                        defaultValue={values.email}
                        onChange={(e) => handleInputChange(e, "email")}
                        isValid={touched.email && !errors.email}
                      />
                      {errors.email ? (
                        <span className="text-red-400 error-text mb-0 mt-[-22px]">
                          {errors.email}
                        </span>
                      ) : null}
                      <Input
                        type="password"
                        size="lg"
                        label="Password"
                        id="password"
                        name="password"
                        defaultValue={values.password}
                        onChange={(e) => handleInputChange(e, "password")}
                        isValid={touched.password && !errors.password}
                      />
                      {errors.password ? (
                        <span className="text-red-400 error-text mb-0 mt-[-22px]">
                          {errors.password}
                        </span>
                      ) : null}
                      <Input
                        type="password"
                        size="lg"
                        label="ConformPassword"
                        id="conformPassword"
                        fullWidth
                        name="conformPassword"
                        defaultValue={values.conformPassword}
                        onChange={(e) =>
                          handleInputChange(e, "conformPassword")
                        }
                        isValid={
                          touched.conformPassword && !errors.conformPassword
                        }
                      />
                      {values.conformPassword &&
                      values.conformPassword !== values.password ? (
                        <span className="text-red-400 error-text mb-0 mt-[-22px]">
                          Password not match
                        </span>
                      ) : null}
                    </div>
                    <Button className="mt-6" type="submit" fullWidth>
                      Register
                    </Button>
                    <Typography
                      color="gray"
                      className="mt-4 text-center font-normal"
                    >
                      Already have an account?{" "}
                      <a
                        href="/Login"
                        className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                      >
                        Sign In
                      </a>
                    </Typography>
                  </Form>
                );
              }}
            </Formik>
          </Card>
        </div>
      </div>
    </>
  );
};

export default SignUp;
