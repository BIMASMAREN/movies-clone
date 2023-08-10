import { useEffect, useState } from "react";
import "./stye.css";

export default function Error(props) {
  const [message, setMessage] = useState("");

  useEffect(() => {
    setMessage(props.message);
  }, [props.message]);

  return (
    <div className="Error">
      <p>{message}</p>
    </div>
  );
}
