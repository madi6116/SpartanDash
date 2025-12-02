import React, { useState } from 'react';

export default function Login({ setScreen }) {   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    alert(`Email: ${email}\nPassword: ${password}`);

  
    setScreen("home");
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      width: '100vw',
      padding: '20px',
      backgroundColor: '#030182'  //Background color
    }}>
      <form onSubmit={handleSubmit} style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        padding: '24px',
        border: '1px solid #ccc',
        borderRadius: '8px',
        minWidth: '260px',
        backgroundColor: 'white',
        boxShadow: '0 4px 10px rgba(0,0,0,0.15)'
        
      }}>
        <h2 style={{ textAlign: 'center' }}>Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '8px', fontSize: '14px' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '8px', fontSize: '14px' }}
        />

        <button
          type="submit"
          style={{
            padding: '10px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Login
        </button>
      </form>
    </div>
  );
}
