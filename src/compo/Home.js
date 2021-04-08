import React, { useState } from "react";
import Converter from "./Converter";
import Chart from "./Chart";
import "./Styles/Home.css";

const Home = () => {
  const [code, setcode] = useState("");

  const callback = (responsefromcallback) => {
    setcode(responsefromcallback);
  };
  console.log(code);

  return (
    <div className="homerow">
      <div className="homecol">
        <Converter currencycode={callback} />
      </div>
      <div className="homecol">
        <Chart passcurrencycodetochart={code} />
      </div>
    </div>
  );
};

export default Home;
