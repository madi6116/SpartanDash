import React, { useState } from 'react';
import dashLogo from "../assets/Logo.png";

// basic input checks)
const validateSignUp = (email, password, studentId) => {
    // password check
    if (password.length < 8) {
        return "Hey! Password must be at least 8 characters long.";
    }

    // student ID check
    if (!studentId || studentId.length !== 9 || !/^\d+$/.test(studentId)) {
        return "Heads up: Student ID must be 9 digits and numeric."; 
    }
    
    // email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return "Wait, that email format looks wrong. Check it again.";
    }

    return null; // All checks passed
}

// Added setProfileData prop here
export default function Login({ setScreen, setProfileData }) { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [studentId, setStudentId] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const endpoint = isLogin ? "login" : "signup";

        // FRONTEND VALIDATION BEFORE API CALL
        if (!isLogin) {
            const validationError = validateSignUp(email, password, studentId);
            if (validationError) {
                alert(validationError); // Shows error message
                setLoading(false);
                return;
            }
        }

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
        } catch (err) {
            alert("Ugh, the server is down. Is the backend running (npm run start)?");
            setLoading(false);
            return;
        }

        let data;
        try {
            data = await res.json();
        } catch {
            alert("Backend crashed! It returned malformed data.");
            setLoading(false);
            return;
        }

        if (!res.ok) {
            // Catches duplicate email error from the backend
            alert(data.msg); 
            setLoading(false);
            return;
        }

        // FINAL SUCCESS FLOW
        if (isLogin) {
            // --- CRITICAL FIX: Save user data after successful login ---
            localStorage.setItem('currentUserId', data.profile.id); // Save ID for deletion/profile calls
            localStorage.setItem('currentUserEmail', data.profile.email); // Save Email
            
            if (setProfileData) {
                setProfileData(data.profile); // Update the main app state with profile info
            }

            // Login Success: Go to the main app screen
            setScreen("home"); 
        } else {
            // Sign Up Success
            alert("Success! Your account is ready. Now log in!");
            setIsLogin(true); // Switch the form view back to Login
        }
        setLoading(false);
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

                            <button type="submit" style={styles.loginButton} disabled={loading}>
                                {loading ? "Logging in..." : "Login"}
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
                                maxLength={9} // Max length added for better UX/robustness
                                style={styles.input}
                            />

                            <button type="submit" style={styles.loginButton} disabled={loading}>
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