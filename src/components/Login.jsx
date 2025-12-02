import React, { useState } from 'react';
import dashLogo from "../assets/Logo.png";

// MOCK DATA: Define valid credentials for the demo
const MOCK_EMAIL = 'test@sjsu.edu';
const MOCK_PASSWORD = 'password123';

export default function Login({ setScreen }) {   
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');

  //Login or signup mode
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isLogin) {
      // --- LOGIN FLOW (US 1) ---
      
      if (email === MOCK_EMAIL && password === MOCK_PASSWORD) {
          // Success case for demo
          // Use console.log instead of alert for smoother user experience
          console.log("Login Successful!");
          setScreen("home"); 
      } else {
          // Failure case for robustness demo
          alert("Login Failed. Invalid Email or Password.");
          // IMPORTANT: Do NOT call setScreen("home") on failure
      }
      
    } else {
      // --- SIGN UP FLOW (US 1.1, 1.2) ---
      
      // 1. Simulate checking for existing email (FR 1.2)
      if (email === MOCK_EMAIL) {
          alert("Sign Up Failed. This email is already registered (FR 1.2).");
          return;
      } 
      
      // 2. Simulate password strength check
      if (password.length < 8) { 
          alert("Sign Up Failed. Password must be at least 8 characters long.");
          return;
      }
      
      // 3. Simulate Student ID check (FR 2.1)
      if (studentId.length !== 9 || isNaN(studentId)) {
          alert("Sign Up Failed. Student ID must be 9 digits and numeric.");
          return;
      }

      // Success case for Sign Up (FR 1.3)
      alert(`Account creation simulated successfully for ${email}. You may now log in.`);
      setIsLogin(true); // Switch to login screen after successful sign up
      // Do NOT navigate to home yet, user must log in.
    }
  };

  return (
    //Page container , center card
    <div style={styles.page}>
      <div style={styles.blueContainer}>
      <div style={styles.topText}>Login / Sign Up</div>

      <div style={styles.headerSection}>
      <img src={dashLogo} alt="Logo" style={styles.logo} />

      <div style={styles.appTitle}>Spartan Dash</div>
      <div style={styles.subtitle}>By Students For Students</div>

    </div>

    <div style={styles.card}>

      <div style={styles.toggleRow}>
        <button 
        style={isLogin ? styles.toggleActive : styles.toggleInactive}
        onClick={() => setIsLogin(true)}
        >
          Login
        </button>
        <button
          style={!isLogin ? styles.toggleActive : styles.toggleInactive}
        
          onClick={() => setIsLogin(false)}
        >
          Sign Up
        </button>
      </div>

      {isLogin ? ( 

        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            />
          <label style={styles.label}>Password</label>

            <input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            />

            {/*Submitt button*/}
            <button type="submit" style={styles.loginButton}>
              Login
            </button>

            <div style={styles.forgot}>Forgot password?</div>
            
        </form>
      ) : (
        //Sign up form 
        <form onSubmit={handleSubmit} style={styles.form}>
          <label style={styles.label}>Email</label>
          <input
            type='email'
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
            />

            <label style={styles.label}>Password</label>
           <input
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
            />

          <label style={styles.label}>Student ID</label>
          <input  
          type="text"
          placeholder="Enter your student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          required
          style={styles.input}
        />
            {/*Submitt button*/}
            <button type="submit" style={styles.loginButton}>
              Create Account
            </button>
        </form>
      )}
      </div>
    </div>
    
    </div>
  );
}

const styles = {
  //Full screen flex container to center the card
  page: {
    width: "100vw",
    height: "100vh",
    background: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
    fontFamily: "Arial",
  },

  blueContainer: {
    width: "90%",
    maxWidth: 420,
    background: "linear-gradient(#030182, #0866ff)",
    padding: 25,
    borderRadius: 25,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
    marginTop: 40,
  },

  topText: {
    color: "white",
    fontSize: 14,
    marginBottom: 20,
  },

  headerSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 30
  },


  logo: {
    width: 85,
    height: 85,
    borderRadius: 8,
    marginBottom:10,
  },

  appTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },

  subtitle: {
    color: "#d6d6d6",
    fontSize: 14,
    marginTop: 4,
  },

card: {
  width: "90%",
  maxWidth: 380,
  background: "white",
  padding: 20,
  borderRadius: 20,
  boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
  color: '#333', 
},

  toggleRow: {
    display: "flex",
    gap: 10,
    marginBottom: 15,
  },

  toggleActive: {
    flex: 1,
    padding: 10,
    background: "#030182",
    color: "white",
    borderRadius: 10,
    border: "none",
  },

  toggleInactive: {
    flex: 1,
    padding: 10,
    background: "white",
    borderRadius: 10,
    border: "1px solid #ccc",
    color: "#030182",
    cursor: "pointer",
  },

  //form style
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 12,
  },

  label: {
    fontSize: 14,
    fontWeight: "500",
    marginTop: 5,
  },

  //Input field
input: {
  padding: 12,
  fontSize: 14,
  borderRadius: 10,
  border: "1px solid #eee",
  background: "#f5f5f5",
  color: '#000', 
},

  //Submit button
  loginButton: {
    padding: 12,
    background: "#030182",
    color: "white",
    border: "none",
    borderRadius: 10,
    fontSize: 16,
    marginTop: 10,
    cursor: "pointer",
  },

  forgot: {
    marginTop: 15,
    textAlign: "center",
    color: "#777",
    fontSize: 14,
    cursor: "pointer",
  },

};