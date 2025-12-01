import React, { useState } from 'react';
import Login from './components/Login';
import HomePage from './components/Homepage';

function App() {
  const [screen, setScreen] = useState("login"); 

  return (
    <>
      {screen === "login" && <Login setScreen={setScreen} />}
      {screen === "home" && <HomePage setScreen={setScreen} />}
    </>
  );
}

export default App;
