import logo from "./logo.svg";
import MessageBox from "../components/MessageBox";
import { KeyboardEventHandler, useState } from "react";

function App() {
  const [message, setMessage] = useState<string>();
  const [messages, setMessages] = useState<{ type: string; text: string }[]>([
    {
      type: "received",
      text: "Hello",
    },
    {
      type: "sent",
      text: "Hi",
    },
  ]);
  const [APIKey, setAPIKey] = useState("");
  const [number, setNumber] = useState("");

  const sendMessage = async () => {
    if (message === "") return;

    const params = new URLSearchParams();

    params.append("API_KEY", APIKey);
    params.append("number", number);
    params.append("message", message as string);

    const response = await fetch("/api/send", {
      method: "POST",
      body: params,
    });

    const data = await response.json();

    console.log(data);

    setMessages([...messages, { text: message as string, type: "sent" }]);
    setMessage("");
  };

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="App">
      <div className="contacts">
        <input
          className="input2"
          placeholder="API Key"
          value={APIKey}
          onChange={(e) => setAPIKey(e.target.value)}
        />
      </div>
      <div className="messaging">
        <div className="contactbar">
          <input
            className="input2"
            placeholder="416 123 4567"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <div className="messagelist">
          {messages.map((message, index) => {
            return (
              <MessageBox
                key={index}
                type={message.type}
                message={message.text}
              />
            );
          })}
        </div>
        <div className="messagearea">
          <input
            value={message}
            className="input"
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button className="send" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
