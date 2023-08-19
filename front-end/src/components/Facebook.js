// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
import FacebookLogin from "@greatsumini/react-facebook-login";

/* had an error installing react-facebook-login, such as here: https://stackoverflow.com/questions/75891844/using-react-facebook-login-with-react-version-18 
used alternative here but facebook login authentication still showing errors: https://www.npmjs.com/package/@greatsumini/react-facebook-login */

const Facebook = () => {
  // const [username, setUsername] = useState("");
  // const [msg, setMsg] = useState([]);
  // const navigate = useNavigate();
  // const admin = false;

  // on authentication success
  const onSuccess = async (response) => {
    console.log(response);

    /* setUsername(response.name);
          setMsg(result.data.user.tokenId);
          alert("Login successful");
          navigate("/home", {
            state: {
              username: username,
              token: msg,
              admin: admin,
            },
          });
        }); */
  };

  return (
    <FacebookLogin
      appId="256024374027490"
      onSuccess={onSuccess}
      initParams={{
        version: "v10.0",
      }}
      style={{
        backgroundColor: "#4267b2",
        color: "#fff",
        fontSize: "12px",
        padding: "4px 6px",
        border: "none",
        borderRadius: "4px",
      }}
    />
  );
};

export default Facebook;
