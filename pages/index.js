import { useRouter } from "next/router";
import { useState } from "react";
import { Button, Box } from "@mui/material";
import Alert from '@mui/material/Alert';
import TextField from "@mui/material/TextField";
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
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <TextField
          size="small"
          id="outlined-basic"
          label="Username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          sx={{ margin: "10px" }}
        />
        <TextField
          size="small"
          id="outlined-basic"
          label="Password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          sx={{ margin: "10px" }}
        />
        {isErr && <Alert severity="error">Invalid Credentials.</Alert>}
        <Button
          variant="contained"
          color="success"
          size="large"
          onClick={handleLogin}
          sx={{ margin: "10px", marginLeft: "120px" }}
        >
          LOG IN
        </Button>
      </Box>
    </>
  );
}
