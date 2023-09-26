import "./App.css";
import Header from "./components/Header";
import Stream from "./components/Stream";
// import server from "./axios-server";
import { useState } from "react";
import Overlay from "./components/Overlay";
import AddFormDialog from "./components/form_dialogs/AddFormDialog";
import DeleteFormDialog from "./components/form_dialogs/DeleteFormDialog";
import UpdateFormDialog from "./components/form_dialogs/UpdateFormDialog";

function App() {
  const rtspUrl = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4";
  const [overlays, setOverlays] = useState([]);

  function addOverlay(text, top = 0, left = 0, size = 24) {
    setOverlays([
      ...overlays,
      {
        text: text,
        top: 100 + Number(top),
        left: 380 + Number(left),
        size: size,
      },
    ]);
  }

  function deleteOverlay(text) {
    setOverlays((overlays) => {
      return overlays.filter((item, index) => {
        return text !== item.text;
      });
    });
  }

  function updateOverlay(text, newText, top, left, size) {
    setOverlays(
      overlays.map((overlay) => {
        if (overlay.text === text) {
          return { text: newText, top: (top!==null?top:overlay.top), left: (left!=null?left:overlay.left), size:(size!=null?size:overlay.size)};
        }
        return overlay;
      })
    );
  }

  // function postToServer(obj) {
  //   server
  //     .post("/add", obj, {
  //       headers: {
  //         "Content-Type": "application/x-www-form-urlencoded",
  //       },
  //     })
  //     .then((res) => {
  //       alert(res.data);
  //     })
  //     .catch((err) => {
  //       alert(err.message);
  //     });
  // }

  return (
    <div>
      <Header title="Live stream" />

      <Stream src={rtspUrl} />
      {overlays.map((overlay) => (
        <Overlay
          text={overlay.text}
          top={overlay.top}
          left={overlay.left}
          size={overlay.size}
        />
      ))}
      <div className="create-button-container">
        <AddFormDialog add={addOverlay} />
        <DeleteFormDialog del={deleteOverlay} />
        <UpdateFormDialog update={updateOverlay} />
      </div>
    </div>
  );
}

export default App;
