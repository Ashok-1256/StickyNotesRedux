import React, { useState, useEffect, useCallback, useRef } from "react";

function exponentialBackoff(cb, maxTrials) {
  const MAX_TRIALS = maxTrials || 20;
  let trials = 0;
  return () => {
    if (trials >= MAX_TRIALS) {
      return false;
    }
    setTimeout(cb, 2 ** trials)
    trials += 1;
    return true;
  }
}

export default function Image({ src, alt }) {
  const srcRef = useRef(src);
  const srcRef1 = useRef();
  const errorHandlerRef = useRef();
  const [isLoaded, setLoaded] = useState(false);
  //const MAX_TRIALS = 20;
  //let trials = useRef(0);

  const onNetworkChange = useCallback(() => {
    console.log("network changed ", isLoaded);
    // if (!isLoaded) {
    const newUrl = `${src}?t=${Date.now()}`;
    srcRef.current.src = newUrl;
    srcRef.current.alt = newUrl;
    srcRef1.current.textContent = newUrl

    // }
  }, [isLoaded, src]);

  function onError() {
    console.log("error");
    if (!errorHandlerRef.current) {
      errorHandlerRef.current = exponentialBackoff(onNetworkChange, 15);
    }
    console.log(errorHandlerRef.current());
   // errorHandlerRef.current();
    // if (trials.current < MAX_TRIALS) {
    //   trials.current++;
    //   setTimeout(() => {
    //     onNetworkChange();
    //   }, 2 ** trials.current);
    // }
  }

  useEffect(() => {
    window.addEventListener("online", onNetworkChange);
    window.addEventListener("testing", onNetworkChange);
    return () => {
      window.removeEventListener("online", onNetworkChange);
      window.removeEventListener("testing", onNetworkChange);
    };
  });
  if (src) {
    console.log('rendered', srcRef.current);
    return (
      <div>
        <img
          src={src}
          alt={src}
          ref={srcRef}
          onLoad={() => setLoaded(true)}
          onError={onError}
        />
        <p>{srcRef.current}</p>
        <p ref={srcRef1}></p>
      </div>
    );
  }
  return <span>{alt}</span>;
}