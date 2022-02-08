import { useEffect, useState } from "react";
import Layout from "./components/Layout";
import Popup from "./components/Popup";
import AudioPlayer from "./components/AudioPlayer";

import { ArrowBackIos, ArrowForwardIos } from "@material-ui/icons";
import svgs from "./imports/svgImport";
import sounds from "./imports/audioImport";

import "./css/app.css";
import "./css/button.css";

const sortSvgs = (a, b) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  // names must be equal
  return 0;
};

function App() {
  const [order, setOrder] = useState("");
  const [showPopup, setShowPopup] = useState(-1);

  // Sort svgs according to state
  if (order) svgs.sort((a, b) => sortSvgs(a[order], b[order]));

  // Count whether new participant or sound is reached (depending on oder)
  let counter = 1;

  // function to change order state
  const changeOrder = (e) => setOrder(e.target.value);

  const renderPopup = () => {
    if (showPopup >= 0) {
      const data = svgs[showPopup];
      return (
        <Popup>
          <div className="nav">
            {showPopup > 0 ? (
              <span
                onClick={() => {
                  setShowPopup(showPopup - 1);
                }}
              >
                <ArrowBackIos />
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="center">
            <p>
              <AudioPlayer src={sounds[data.soundID]} autoplay={false} />
            </p>

            <div className="sketch">{data.svg}</div>
            <p>
              <b>Participant:</b> {data.participantID} <br />
              <b>Sound:</b> {data.soundID}
            </p>
            <button onClick={() => setShowPopup(-1)}>Close</button>
          </div>
          <div className="nav">
            {showPopup < svgs.length - 1 ? (
              <span
                onClick={() => {
                  setShowPopup(showPopup + 1);
                }}
              >
                <ArrowForwardIos />
              </span>
            ) : (
              ""
            )}
          </div>
        </Popup>
      );
    } else return "";
  };

  return (
    <>
      {renderPopup()}
      <Layout heading={<h1>Sketching Sounds Dataset</h1>}>
        <section>
          <p>
            Order by{" "}
            <input
              type="radio"
              name="order"
              id="sound-order"
              value="soundID"
              onChange={changeOrder}
            ></input>
            <label for="sound-order">Sound</label>
            <input
              type="radio"
              name="order"
              id="participant-order"
              value="participantID"
              onChange={changeOrder}
            ></input>
            <label for="participant-order">Participant</label>
          </p>
        </section>

        <section className="gallery">
          {svgs.map((object, i) => {
            // Mark beginning of new participant or sound
            let marker = "";
            if (order && (i === 0 || object[order] != svgs[i - 1][order])) {
              const breakElement = i ? (
                <div className="break-element" key={`break_${i}`}></div>
              ) : (
                ""
              );
              marker = (
                <>
                  {breakElement}
                  <div className="gallery marker" key={`marker_${i}`}>
                    {counter}
                  </div>
                </>
              );
              counter++;
            }

            return (
              <>
                {marker}
                <div
                  key={`svg${i}`}
                  className="gallery sketch"
                  onClick={() => setShowPopup(i)}
                >
                  {object.svg}
                </div>
              </>
            );
          })}
        </section>
      </Layout>
    </>
  );
}

export default App;
