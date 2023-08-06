import axios from "axios";

export const Signup = async (data) => {
  return await axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/signup`,
    data
  );
};

export const Verification = async (token) => {
  return await axios.post(
    `${process.env.REACT_APP_BASE_URL}/user/verification`,
    token
  );
};
