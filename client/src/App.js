import "./App.css";
import { AppShell, Header, MantineProvider } from "@mantine/core";
import { Route, Routes, useNavigate } from "react-router-dom";
import { HeaderContent } from "./components/header";
import { Login } from "./pages/Login";
import { useEffect, useState } from "react";
import { checkAuth, logout } from "./store/store";
import { Home } from "./pages/Home";
import { observer } from "mobx-react-lite";
import MessageForm from "./pages/MessageForm";
import { useMessages } from "./core/messages/useMessages";

function App() {
  const [auth, setAuth] = useState();
  const navigate = useNavigate();
  const {
    data: messages,
    isFetching: isLoading,
    setState: setMessages,
  } = useMessages();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      checkAuth()
        .then((response) => {
          if (response.status === 500) {
            navigate(`/`);
          }
        })
        .catch(() => {
          navigate(`/`);
          setAuth(false);
          logout();
        });
    } else {
      navigate(`/`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (auth !== undefined) {
      localStorage.setItem("auth", JSON.stringify(auth));
    }
  }, [auth]);

  useEffect(() => {
    const auth = localStorage.getItem("auth");
    if (auth !== undefined) {
      setAuth(JSON.parse(auth));
    }
  }, []);
  return (
    <MantineProvider>
      <AppShell
        header={
          <Header>
            {
              <HeaderContent
                setMessages={setMessages}
                auth={auth}
                setAuth={setAuth}
              />
            }
          </Header>
        }
        styles={(theme) => ({
          main: { backgroundColor: "#f7f7f8" },
        })}
      >
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<Login setAuth={setAuth} />}></Route>
          <Route path="login/user">
            <Route
              path=":name"
              element={
                <MessageForm
                  isLoading={isLoading}
                  messages={messages}
                  setAuth={setAuth}
                />
              }
            ></Route>
          </Route>
        </Routes>
      </AppShell>
    </MantineProvider>
  );
}

export default observer(App);
