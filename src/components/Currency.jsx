import { useState, useEffect } from "react";
import "../css/currency.css";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import axios from "axios";

let BASE_URL = "https://api.freecurrencyapi.com/v1/latest";
let API_KEY = "fca_live_XURFCn0clS9MvrDj8UceJgHjYAJfBsFPyFEFeBXE";

function Currency() {
  const [amount, setAmount] = useState();
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("TRY");
  const [result, setResult] = useState(0);
  const [loading, setLoading] = useState(false);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(`${BASE_URL}?apikey=${API_KEY}`);
        setCurrencies(Object.keys(response.data.data));
      } catch (error) {
        console.error("Error fetching currency data", error);
      }
    };
    fetchCurrencies();
  }, []);

  const exchange = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${BASE_URL}?apikey=${API_KEY}&base_currency=${fromCurrency}`
      );
      const result = (response.data.data[toCurrency] * amount).toFixed(2);
      setResult(result);
    } catch (error) {
      console.error("Error fetching currency data", error);
      alert("An error occurred while fetching currency data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="currency-div">
      <div
        style={{
          fontFamily: "arial",
          backgroundColor: "black",
          color: "#fff",
          width: "100%",
          textAlign: "center",
        }}
      >
        <h3> CURRENCY CONVERTER</h3>
      </div>

      <div style={{ marginTop: "25px" }}>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          type="number"
          className="amount"
          placeholder="Enter amount"
        />
        <select
          onChange={(e) => setFromCurrency(e.target.value)}
          className="from-currency-option"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <FaRegArrowAltCircleRight
          style={{ fontSize: "27px", marginRight: "10px" }}
        />

        <select
          onChange={(e) => setToCurrency(e.target.value)}
          className="to-currency-option"
        >
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>

        <input
          value={result}
          onChange={(e) => setResult(e.target.value)}
          type="number"
          className="result"
        />
      </div>

      <div>
        <button
          onClick={exchange}
          className="exchange-button"
          disabled={loading}
        >
          {loading ? "Loading..." : "Convert"}
        </button>
      </div>
    </div>
  );
}

export default Currency;
