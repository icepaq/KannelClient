// make a basic component
const MessageBox = ({ message, type }) => {
  return (
    <div
      className={`messagebox`}
      style={{ alignSelf: type === "sent" ? "flex-end" : "flex-start" }}
    >
      <p>{message}</p>
    </div>
  );
};

export default MessageBox;
