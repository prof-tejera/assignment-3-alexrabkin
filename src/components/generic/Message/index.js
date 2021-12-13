import { useTimeoutWhen } from "../../../utils/hooks";
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import "./Message.scss";

const Message = ({ value, delay }) => {
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useTimeoutWhen(
    () => {
      setMessage("");
      setShowMessage(false);
    },
    delay ? delay : null,
    showMessage
  );

  useEffect(() => {
    setMessage(value);
    setShowMessage(true);
  }, [value]);

  return <div className="message">{showMessage && message}</div>;
};

export default Message;

Message.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  delay: PropTypes.number,
};
