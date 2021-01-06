import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [inputBillAmount, setInputBillAmount] = useState(0);
  const [inputCashAmount, setInputCashAmount] = useState(0);
  const [totalChange, setTotalChange] = useState("");
  const [typeCount, setTypeCount] = useState([]);
  const [displayTable, setDisplayTable] = useState(false);

  const denominations = [2000, 500, 100, 20, 10, 5, 1];

  function inputBillHandler(e) {
    setInputBillAmount(e.target.value);
  }

  function inputCashHandler(e) {
    setInputCashAmount(e.target.value);
  }

  function calculateChange() {
    let change = inputCashAmount - inputBillAmount;

    let displayMsg = "";

    if (change < 0) {
      displayMsg = "Ask to pay ₹" + -change + " more";
      setTotalChange(displayMsg);
    } else if (change === 0) {
      displayMsg = "Cash and bill amount are equal, nothing to return.";
      setTotalChange(displayMsg);
    } else {
      displayMsg = "Amount to return: ₹" + change;
      setTotalChange(displayMsg);
    }

    setTypeCount([]);
    setDisplayTable(false);

    for (let i = 0; i < denominations.length; i++) {
      if (change / denominations[i] >= 1) {
        let denominationCount = Math.floor(change / denominations[i]);

        setTypeCount((prevstate) => [
          ...prevstate,
          {
            type: "₹" + denominations[i],
            count: denominationCount
          }
        ]);

        if (denominationCount > 0) setDisplayTable(true);

        change -= denominations[i] * denominationCount;
      }
    }
  }

  return (
    <div className="App">
      <h1>
        <span role="img" aria-label="money">
          💵
        </span>
        Cash Register Manager
        <span role="img" aria-label="money-bag"></span>
      </h1>

      <div className="cash-manager">
        <div className="input-field">
          <label htmlFor="billAmount">
            Enter bill Amount:
            <span class="currency">
              ₹
              <input
                type="number"
                id="billAmount"
                name="billAmount"
                onChange={inputBillHandler}
                placeholder="0"
              />
            </span>
          </label>

          <label htmlFor="cashAmount">
            Enter Cash Given:
            <span class="currency">
              ₹
              <input
                type="number"
                id="cashAmount"
                name="cashAmount"
                onChange={inputCashHandler}
                placeholder="0"
              />
            </span>
          </label>
        </div>

        <button onClick={calculateChange}>
          Calculate
          <span role="img" aria-label="receipt">
            🧾
          </span>
        </button>

        <h3>{totalChange}</h3>

        <div className="display-table">
          {displayTable && (
            <table>
              <caption>Return cash in following denominations</caption>
              <thead>
                <tr>
                  <th scope="col">Notes/Coins</th>
                  <th scope="col">No.of them</th>
                </tr>
              </thead>
              <tbody>
                {typeCount.map((item) => (
                  <tr>
                    <td>{item.type}</td>
                    <td>{item.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
