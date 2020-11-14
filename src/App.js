import React, { useEffect, useState } from "react";
import "./styles.css";

function useCounter(initialCount = 0) {
  const [count, setCount] = React.useState(initialCount);
  const increment = React.useCallback(() => setCount((c) => c + 1), []);
  const reset = () => setCount(initialCount);
  return { count, increment, reset };
}

export default function App() {
  const { count: element, increment, reset: resetCount } = useCounter(0);
  const [memes, setMemes] = useState([]);
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  let [count, getCount] = useState(0);
  let [count2, getCount2] = useState(0);
  const maxLength = "40";

  const keyhandler = (e) => {
    getCount(e.target.value.length);
  };
  const keyhandler2 = (e) => {
    getCount2(e.target.value.length);
  };

  useEffect(() => {
    async function asyncFunction() {
      const initialResponse = await fetch("https://api.imgflip.com/get_memes");
      const responseToJSON = await initialResponse.json();
      setMemes(responseToJSON.data.memes);
    }
    asyncFunction();
  }, []);

  const clear = (e) => {
    setTopText("");
    setBottomText("");
    getCount("0");
    getCount2("0");
    resetCount();
  };

  return (
    <div className="App">
      {memes[0] ? (
        <>
          <img
            src="https://i.ibb.co/9r8Rcpt/memegenerator.png"
            alt="Meme-Generator"
          />
          <div
            className="memebox"
            style={{
              backgroundImage: `url(${memes[element].url})`
            }}
          >
            <p className="top">{topText}</p>
            <p className="bottom">{bottomText} </p>
          </div>
          <div className="addtext">
            <input
              value={topText}
              onChange={(e) => setTopText(e.target.value)}
              type="text"
              placeholder="Enter Top Text"
              maxLength={maxLength}
              onKeyUp={(e) => keyhandler(e)}
            />
            <div className="keys">
              {count}/{maxLength} characters
            </div>

            <input
              value={bottomText}
              onChange={(e) => setBottomText(e.target.value)}
              type="text"
              placeholder="Enter Bottom Text"
              maxLength={maxLength}
              onKeyUp={(e) => keyhandler2(e)}
            />
            <div className="keys">
              {count2}/{maxLength} characters
            </div>
            <button onClick={clear} type="reset">
              Clear
            </button>
            <button className="next" onClick={increment}>
              Change Image
            </button>
          </div>
        </>
      ) : (
        "loading"
      )}
    </div>
  );
}
