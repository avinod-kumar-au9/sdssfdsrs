/* CATAGORY || ITEM || NUMBER_OF_ITEMS || TOTAL_AMOUNT */
import React, { useRef, useState } from "react";
import "./Styles/App.css";
const App = () => {
  const [category, setcategory] = useState("");
  const [item, setitem] = useState("");
  const [number, setnumber] = useState("");
  const [amount, setamount] = useState("");

  const inventry = {
    vegitables: [
      { name: "apple", cost: 87 },
      { name: "oranges", cost: 89 },
    ],
    toys: [
      { name: "bat", cost: 87 },
      { name: "football", cost: 89 },
    ],
  };

  const changeHandler = (e) => {
    setcategory(e.target.value);
  };

  const renderItems = () => {
    if (category) {
      if (category === "vegitables") {
        return inventry.vegitables.map((item) => {
          return <option>{item.name}</option>;
        });
      } else {
        return inventry.toys.map((item) => {
          return <option>{item.name}</option>;
        });
      }
    }
  };

  const itemHandler = (e) => {
    setitem(e.target.value);
  };

  const numberHandler = (e) => {
    setnumber(e.target.value);
  };

  const buttonHandler = () => {
    if (category && item && number) {
      if (category === "vegitables") {
        return inventry.vegitables.map((items) => {
          if (items.name === item) {
            setamount(items.cost * parseInt(number));
          }
        });
      } else {
        console.log("here");
        return inventry.toys.map((items) => {
          if (items.name === item) {
            setamount(items.cost * parseInt(number));
          }
        });
      }
    }
  };

  return (
    <div className="inputRow">
      <select onChange={changeHandler}>
        {Object.keys(inventry).map((key) => {
          return <option>{key}</option>;
        })}
      </select>
      <select onChange={itemHandler}>{renderItems()}</select>
      <input onChange={numberHandler} type="number" placeholder="number" />
      <button onClick={buttonHandler}>TOTAL_AMOUNT</button>
      <p>{amount}</p>
    </div>
  );
};

export default App;
