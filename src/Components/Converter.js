import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Styles/Converter.css";

const BitcoinConverter = (props) => {
  const [state, setstate] = useState({
    rate: "",
    description: "",
    data: "",
    code: "",
  });

  useEffect(async () => {
    const output = await currencyConverterApifetch();
    setstate({
      ...state,
      data: output,
      rate: output.bpi.USD.rate,
      description: output.bpi.USD.description,
      code: output.bpi.USD.code,
    });

    props.currencycode(output.bpi.USD.code);
  }, []);

  const currencyChangeHandler = async (e) => {
    const { value } = e.target;

    const output = await currencyConverterApifetch();

    Object.values(output.bpi).map((item) => {
      if (item.code === value) {
        setstate({
          ...state,
          rate: item.rate,
          description: item.description,
          code: item.code,
        });
        props.currencycode(item.code);
      }
    });
  };

  const currencyConverterApifetch = async () => {
    var data = "";
    await axios
      .get("https://api.coindesk.com/v1/bpi/currentprice.json")
      .then((resp) => {
        data = resp.data;
      });

    return data;
  };

  const { rate, description, data } = state;

  return (
    <div>
      <p>1 Bitcoin Equals</p>
      <select className="dropdown" onChange={currencyChangeHandler}>
        {data &&
          Object.values(data.bpi).map((item, idx) => (
            <option key={idx} value={item.code}>
              {item.description}
            </option>
          ))}
      </select>
      <p className="currencydisplay">
        {rate} {description}
      </p>
    </div>
  );
};

export default BitcoinConverter;
