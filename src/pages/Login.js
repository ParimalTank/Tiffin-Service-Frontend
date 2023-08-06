import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  Typography,
  Alert,
} from "@material-tailwind/react";
import I1 from "../assets/images/Group.svg";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import {
  CheckCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

// For Password Encrypt and decrypt
const bcrypt = require("bcryptjs-react");

// Data
const initialValues = {
  email: "",
  password: "",
};

// for password validation
const lowercaseRegEx = /(?=.*[a-z])/;
const uppercaseRegEx = /(?=.*[A-Z])/;
const numericRegEx = /(?=.*[0-9])/;
const lengthRegEx = /(?=.{8,})/;

// validation
let loginSchema = Yup.object().shape({
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
});

const Login = () => {
  const [loginUserData, setLoginUserData] = useState([{}]);

  // Error Or Success Message
  const [openError, setOpenError] = useState(false);

  const [openSuccess, setOpenSuccess] = useState(false);

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

  const onSubmit = (values) => {
    console.log("values: ", values);
    // get Data from the localstorage
    const getData = JSON.parse(localStorage.getItem("userData"));

    const getLoginUserData = JSON.parse(localStorage.getItem("LoginUserData"));

    // if array is empty
    const finaldata = getLoginUserData !== null ? getLoginUserData : [];

    const userEmail = values.email;
    const userPassword = values.password;

    // Check User Credentials
    getData.map((user) => {
      if (
        user.email === userEmail &&
        bcrypt.compareSync(userPassword, user.password)
      ) {
        const userObj = {
          firstName: user.firstName,
          email: user.email,
          password: user.password,
        };

        // set new user object
        setLoginUserData([...loginUserData, userObj]);

        // add new user object to localstorage
        const userDataArray = [...finaldata, userObj];
        localStorage.setItem("LoginUserData", JSON.stringify(userDataArray));
        navigate("/");
      } else {
        handleError();
      }
    });
  };

  return (
    <>
      {openSuccess === true && alert ? (
        <Alert
          onClose={handleCloseError}
          icon={<CheckCircleIcon className="mt-px h-6 w-6" />}
          className="bg-[#2ec946]/10 text-[#2ec946] border-l-4 border-[#2ec946] rounded-none font-medium"
        >
          Successfully Login
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
          Auth Fail
        </Alert>
      ) : (
        ""
      )}
      <div className="flex justify-center items-center h-[100vh] ">
        <div className="basis-[55%]">
          <img
            src={I1}
            alt="img-blur-shadow"
            width="700px"
            height="700px"
            layout="fill"
          />
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={loginSchema}
          onSubmit={onSubmit}
          validator={() => ({})}
          validateOnChange={false} // Disable validation every field change
          validateOnBlur={false} // Disable validation every field blur
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            validateField,
            handleBlur,
            isValid,
          }) => {
            // Avoid a race condition to allow each field to be validated on change
            const handleInputChange = async (e, fieldName) => {
              await handleChange(e);
              validateField(fieldName);
            };

            return (
              <div className="basis-1/4">
                <Card color="transparent" shadow={false}>
                  <Typography variant="h4" color="blue-gray">
                    Sign In
                  </Typography>
                  <Typography color="gray" className="mt-1 font-normal">
                    Enter your details to Login.
                  </Typography>
                  <Form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                    <div className="mb-4 flex flex-col gap-6">
                      {/* <Input size="lg" label="Name" /> */}
                      <Input
                        size="lg"
                        id="email"
                        name="email"
                        label="Email"
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
                        label="Password"
                        type="password"
                        size="lg"
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
                    </div>
                    <Button className="mt-6" type="submit" fullWidth>
                      Sign In
                    </Button>
                  </Form>
                  <Typography
                    color="gray"
                    className="mt-4 text-center font-normal"
                  >
                    Don't have an account?{" "}
                    <a
                      href="/Signup"
                      className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                    >
                      Sign Up
                    </a>
                  </Typography>
                </Card>
              </div>
            );
          }}
        </Formik>
      </div>
    </>
  );
};

export default Login;
