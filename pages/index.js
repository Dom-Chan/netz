import { useRouter } from "next/router";
import { useState } from "react";
import Cookies from "js-cookie";

export default function Login({}) {
  const router = useRouter();
  const [userInput, setUsername] = useState();
  const [passInput, setPassword] = useState();
  const [isErr, setIsErr] = useState(false);

  const handleLogin = async () => {
    const creds = { username: userInput, password: passInput };
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(creds),
    };

    const result = await fetch("/api/login", options);
    const status = await result.json();

    if (status.message) {
      //if credentials are INVALID
      setIsErr(true);
    } else {
      //if login is SUCCESSFUL
      Cookies.set("loggedin", true);
      router.push("/home");
    }
  };

  return (
    <>
      <input
        type="text"
        placeholder="Username"
        onChange={(e) => setUsername(e.target.value)}
      ></input>
      <input
        type="text"
        placeholder="Password"
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button onClick={handleLogin}>LOG IN</button>

      {isErr && <p>INVALID CREDENTIALS</p>}
    </>
  );
}
