import {
  Flex,
  Title,
  Button,
  Textarea,
  Input,
  Loader,
  ScrollArea,
  Autocomplete,
} from "@mantine/core";
import { useState } from "react";
import { send } from "../../store/store";
import { Message } from "../../components/Messages";
import "./style.css";
import { observer } from "mobx-react-lite";
import { useUsers } from "../../core/users/useUsers";
import emptyIcon from "./assets/empty.png";

const MessageForm = (props) => {
  const { messages, isLoading } = props;
  const [recipient, setRecipient] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [error, setError] = useState("");
  const { data: users } = useUsers();

  const sendClick = () => {
    send(recipient, title, body)
      .then(() => {
        setBody("");
        setTitle("");
        setRecipient("");
        setError("Succesfully");
      })
      .catch(() => {
        setError("Error");
      });
  };
  const usersData = users ? users.map((item) => item.name) : [];

  return (
    <Flex align={"center"} justify={"center"} gap={40}>
      <Flex direction={"column"} gap={10} justify={"center"} w={400} h={500}>
        <Title order={2}>Your Message</Title>
        <Autocomplete
          label="Recipient"
          value={recipient}
          onChange={setRecipient}
          placeholder="name"
          data={usersData}
        />
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />{" "}
        <Textarea
          placeholder="Body"
          label="Message body"
          withAsterisk
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <Button
          onClick={() => {
            sendClick();
          }}
        >
          Send
        </Button>
        <Title order={6}>{error}</Title>
      </Flex>
      <Flex
        direction={"column"}
        gap={5}
        align={"center"}
        w={400}
        h={260}
        className="messages-wrapper"
      >
        <ScrollArea h={260} w={400}>
          {isLoading ? (
            <Loader className="loader" />
          ) : (
            <>
              {(messages !== null) ? (
                messages.map((message) => (
                  <Flex key={message._id} w={"100%"}>
                    <Message
                      date={message.date}
                      from={message.userFrom.name}
                      title={message.title}
                      messageBody={message.message}
                    ></Message>
                  </Flex>
                ))
              ) : (
                <Flex direction={"column"} gap={10} align={"center"} justify={"center"}>
                  <img
                    src={emptyIcon}
                    alt="emptyIcon"
                    className="empty-img"
                  ></img>
                  <p className="empty-title">Упс, здесь ничего нет!</p>
                </Flex>
              )}
            </>
          )}
        </ScrollArea>
      </Flex>
    </Flex>
  );
};

export default observer(MessageForm);
