import React, { useState } from "react";
import Login from "./components/Login";
import HomePage from "./components/HomePage";
import Cart from "./components/cart";
import Payment from "./components/Payment";

function App() {
  const [screen, setScreen] = useState("login");
  const [cart, setCart] = useState([]);  

  return (
    <>
      {screen === "login" && <Login setScreen={setScreen} />}
      {screen === "home" && <HomePage setScreen={setScreen} cart={cart} />}
      {screen === "cart" && <Cart setScreen={setScreen} cart={cart} setCart={setCart} />}
      {screen === "payment" && <Payment setScreen={setScreen} cart={cart} />}
    </>
  );
}

export default App;
