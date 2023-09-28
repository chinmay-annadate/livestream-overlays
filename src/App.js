import "./App.css";
import Header from "./components/Header";
import Stream from "./components/Stream";
import server from "./axios-server";
import { useState, useEffect } from "react";
import Overlay from "./components/Overlay";
import ImageOverlay from "./components/ImageOverlay";
import AddFormDialog from "./components/form_dialogs/AddFormDialog";
import DeleteFormDialog from "./components/form_dialogs/DeleteFormDialog";
import UpdateFormDialog from "./components/form_dialogs/UpdateFormDialog";

function App() {
  const rtspUrl = "https://media.w3.org/2010/05/sintel/trailer_hd.mp4";
  const [overlays, setOverlays] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/read")
      .then((resp) => resp.json())
      .then((data) => {
        setOverlays(data);
      });
  }, []);

  function addOverlay(text, top, left, size, image, imageUrl) {
    const newOverlay = {
      text: text,
      top: 100 + Number(top),
      left: 380 + Number(left),
      size: Number(size) === 0 ? (image?50:24) : Number(size),
      image: String(image),
      imageUrl: imageUrl,
    };
    setOverlays([...overlays, newOverlay]);
    postToServer("/add", newOverlay);
  }

  function deleteOverlay(text) {
    setOverlays((overlays) => {
      return overlays.filter((item) => {
        return text !== item.text;
      });
    });
    postToServer("/delete", { text: text });
  }

  function updateOverlay(text, newText, top, left, size, imageUrl) {
    var set = {};
    if (newText !== "") {
      set.text = newText;
    }
    if (top !== "") {
      set.top = 100 + Number(top);
    }
    if (left !== "") {
      set.left = 380 + Number(left);
    }
    if (size !== "") {
      set.size = Number(size);
    }
    if (imageUrl !== "") {
      set.imageUrl = imageUrl;
    }


    setOverlays(
      overlays.map((overlay) => {
        if (overlay.text === text) {
          return {
            ...overlay,
            ...set,
          };
        }
        return overlay;
      })
    );
    const key = { key: text };
    putInServer("/update", { ...set, ...key });
  }

  function putInServer(route, obj) {
    server
      .put(route, obj, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err.message);
      });
  }

  function postToServer(route, obj) {
    server
      .post(route, obj, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Access-Control-Allow-Origin": "*",
        },
      })
      .then((res) => {})
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <div>
      <Header title="Live stream" />

      <Stream src={rtspUrl} />
      {overlays.map((overlay, index) =>
        overlay.image==="true" ? (
          <ImageOverlay
            key={index}
            text={overlay.text}
            top={overlay.top}
            left={overlay.left}
            size={overlay.size}
            imageUrl={overlay.imageUrl}
          />
        ) : (
          <Overlay
            key={index}
            text={overlay.text}
            top={overlay.top}
            left={overlay.left}
            size={overlay.size}
          />
        )
      )}
      <div className="create-button-container">
        <AddFormDialog add={addOverlay} />
        <DeleteFormDialog del={deleteOverlay} />
        <UpdateFormDialog update={updateOverlay} />
      </div>
    </div>
  );
}

export default App;
