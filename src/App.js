import "./App.css";
import Header from "./components/Header";
import Stream from "./components/Stream";
import Form from "./components/Form";
import server from "./axios-server";
import { useState } from "react";
import Overlay from "./components/Overlay";

function App() {
  const rtspUrl = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4";
  const [overlays, setOverlays] = useState([]);

  function addOverlay(text, top, left) {
    setOverlays([
      ...overlays,
      { text: text, top: 100 + Number(top), left: 380 + Number(left) },
    ]);
  }

  function postToServer(obj) {
    server
      .post("/add", obj, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
      .then((res) => {
        alert(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <div>
      <Header title="Live stream" />

      <Stream src={rtspUrl} />
      {overlays.map((overlay) => (
        <Overlay text={overlay.text} top={overlay.top} left={overlay.left} />
      ))}
      {/* <Form add={addOverlay} /> */}
      <div className="create-button-container">
        <button>Add overlay</button>
      </div>
    </div>
  );
}

export default App;
