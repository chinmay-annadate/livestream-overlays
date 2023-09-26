import { useState } from "react";

function Form(props) {
  const [text, setText] = useState("");
  const [top, setTop] = useState("");
  const [left, setLeft] = useState("");

  function handleClick() {
    props.add(text, top, left);
  }

  return (
    <div className="overlays">
      <input
        type="text"
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="text"
        onChange={(e) => setTop(e.target.value)}
      />
      <input
        type="text"
        onChange={(e) => setLeft(e.target.value)}
      />
      <button onClick={handleClick}>Add overlay</button>
    </div>
  );
}

export default Form;
