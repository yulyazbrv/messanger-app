import { Paper, Text } from "@mantine/core";
import { useState } from "react";
import "./style.css";

const Message = (props) => {
  const { date, from, title, messageBody } = props;
  const [showBody, setShowBody] = useState(false);
  return (
    <Paper
      shadow="xs"
      p="sm"
      withBorder
      w={"100%"}
      pb={2}
      pt={2}
      onClick={() => {
        showBody ? setShowBody(false) : setShowBody(true);
      }}
      className="paper-wrapper"
    >
      <Text>
        <span style={{ fontWeight: "700" }}>Date</span>: {date}
      </Text>
      <Text>
        <span style={{ fontWeight: "700" }}>From</span>: {from}
      </Text>
      <Text>
        <span style={{ fontWeight: "700" }}>Title</span>: {title}
      </Text>
      {showBody && (
        <Text>
          <span style={{ fontWeight: "700" }}>Body</span>: {messageBody}
        </Text>
      )}
    </Paper>
  );
};

export { Message };
