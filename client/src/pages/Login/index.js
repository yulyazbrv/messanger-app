import { Flex, Input, PasswordInput, Button, Title } from "@mantine/core";
import "./style.css";
import { useState } from "react";
import { login } from "../../store/store";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const { setAuth } = props;
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const loginClick = () => {
    login(name)
      .then(() => {
        navigate(`user/${name}`);
        setAuth(true);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  return (
    <Flex align={"center"} justify={"center"}>
      <Flex direction={"column"} gap={10} justify={"center"} w={400} h={500}>
        <Title order={2}>Login</Title>
        <Input
          placeholder="Your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />{" "}
        <Button
          onClick={() => {
            loginClick();
          }}
        >
          Sign in
        </Button>
        <Title order={6}>{error}</Title>
      </Flex>
    </Flex>
  );
};

export { Login };
