import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { Verification } from "../Apis/Authapis";

const Auth = () => {
  const { token } = useParams();

  const [login, setLogin] = useState(true);

  const Conformation = async () => {
    const result = await Verification(token);
    return result;
  };

  useEffect(() => {
    Conformation();

    setTimeout(() => {
      setLogin(false);
    }, 3000);

    // eslint-disable-next-line
  }, [token]);

  return (
    <>
      {login ? (
        <div className="flex justify-center items-center h-[100vh]">
          <Spinner className="h-16 w-16 text-blue-500/10" />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Auth;
