import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

// followed a tutorial for integrating Google login here https://dev.to/shaancodes/how-to-implement-google-authentication-in-your-react-applications-jb6

const Google = () => {
  const [username, setUsername] = useState("");
  const [msg, setMsg] = useState([]);
  const navigate = useNavigate();
  const admin = false;

  // on authentication success
  const onSuccess = async (credentialResponse) => {
    console.log(credentialResponse);
    try {
      await fetch("/api/auth/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: credentialResponse.credential,
        },
        body: credentialResponse.credential,
      })
        .then((res) => res.json())
        .then((result) => {
          console.log(result.data.user);
          setUsername(result.data.user.name);
          setMsg(result.data.user.tokenId);
          alert("Login successful");
          navigate("/home", {
            state: {
              username: username,
              token: msg,
              admin: admin,
            },
          });
        });
    } catch (err) {
      console.log(err);
    }
  };

  return <GoogleLogin onSuccess={onSuccess} />;
};

export default Google;
