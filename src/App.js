import { Link } from "react-router-dom";
import "./App.css";
import React, { useEffect, useState } from "react";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  console.log(data.Hello);

  return (
    <div className="App">
      <Link to="/todo">Todo</Link>
      {data.Hello?.map((item) => {
        return <div>{item}</div>;
      })}
    </div>
  );
}

export default App;
