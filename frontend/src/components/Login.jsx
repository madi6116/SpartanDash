import React, { useState } from 'react';
import dashLogo from "../assets/Logo.png";

export default function Login({ setScreen }) { 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [studentId, setStudentId] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  const [loading] = useState(false);

  const handleSubmit = async (e) => {
  e.preventDefault();

  const endpoint = isLogin ? "login" : "signup";

  const body = isLogin
    ? { email, password }
    : { email, password, studentId };

  let res;
  try {
    res = await fetch("http://localhost:5000/auth/" + endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
  // eslint-disable-next-line no-unused-vars
  } catch (err) {
    alert("Cannot reach server. Is backend running?");
    return;
  }

  // Attempt to read JSON safely
  let data;
  try {
    data = await res.json();
  } catch {
    alert("Server returned invalid JSON. Backend likely crashed.");
    return;
  }

  if (!res.ok) {
    alert(data.msg);
    return;
  }

  setScreen("home");
};


  return (
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

          {/* LOGIN FORM */}
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

              <button type="submit" style={styles.loginButton}>
                {loading ? "Loading..." : "Login"}
              </button>

              <div style={styles.forgot}>Forgot password?</div>
            </form>
          ) : (
          /* SIGN UP FORM */
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

              <button type="submit" style={styles.loginButton}>
                {loading ? "Creating account..." : "Create Account"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}



// STYLES 
const styles = {
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

  input: {
    padding: 12,
    fontSize: 14,
    borderRadius: 10,
    border: "1px solid #eee",
    background: "#f5f5f5",
    color: '#000',
  },

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
