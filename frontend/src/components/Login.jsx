import React, { useState } from 'react';
import dashLogo from "../assets/Logo.png";

// --- Helper Component: RoleCard (NEW) ---
const RoleCard = ({ icon, title, onClick, color }) => (
    <div onClick={onClick} style={{ ...styles.card, backgroundColor: color, color: color === "#ffcc33" ? '#333' : 'white' }}>
        <div style={styles.cardIcon}>{icon}</div>
        <div style={styles.cardTitle}>{title}</div>
    </div>
);

// --- Helper Component: RoleSelectionView (NEW) ---
const RoleSelectionView = ({ handleRoleSelect }) => (
    <div style={styles.roleContainer}>
        <div style={styles.topText}>Login / Select Role</div>

        <div style={styles.headerSection}>
            <img src={dashLogo} alt="Logo" style={styles.logo} />
            <div style={styles.appTitle}>Spartan Dash</div>
            <div style={styles.subtitle}>By Students For Students</div>
        </div>

        <div style={styles.card}>
            <h3 style={styles.roleHeader}>Select User Role:</h3>
            <div style={styles.roleGrid}>
                {/* Customer button triggers the form view */}
                <RoleCard 
                    icon="👤" 
                    title="Customer" 
                    onClick={() => handleRoleSelect('customer')} 
                    color="#030182" // Spartan Blue
                />
                
                {/* Other roles bypass to the demo screens */}
                <RoleCard 
                    icon="📦" 
                    title="Courier" 
                    onClick={() => handleRoleSelect('courier')} 
                    color="#ffcc33" // Spartan Gold
                />
                <RoleCard 
                    icon="🍔" 
                    title="Restaurant" 
                    onClick={() => handleRoleSelect('restaurant')} 
                    color="#4CAF50" 
                />
                <RoleCard 
                    icon="⚙️" 
                    title="Admin" 
                    onClick={() => handleRoleSelect('admin')} 
                    color="#DC3545" // Red for Admin danger
                />
            </div>
            <div style={styles.roleNote}>
                *Other roles bypass login for demo.
            </div>
        </div>
    </div>
);


// basic input checks (student made comment)
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


export default function Login({ setScreen, setProfileData, setCourierStatus }) { 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [studentId, setStudentId] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    // NEW STATE: Tracks which role view is active
    const [selectedRole, setSelectedRole] = useState(null); 
    
    // Custom function to handle all direct screen navigation (Admin, Courier, Restaurant)
    const handleRoleBypass = (role) => {
        let defaultEmail = "";
        let targetScreen = "";
        let initialCourierStatus = "None";

        switch (role) {
            case 'courier':
                defaultEmail = "courier@sjsu.edu";
                targetScreen = "profile"; 
                initialCourierStatus = "Verified"; 
                break;
            case 'restaurant':
                defaultEmail = "restaurant@sjsu.edu";
                targetScreen = "storePortal"; 
                break;
            case 'admin':
                defaultEmail = "admin@sjsu.edu";
                targetScreen = "adminPortal"; 
                break;
            default:
                return;
        }

        // Simulating login bypass
        localStorage.setItem("currentUserId", role);
        localStorage.setItem("currentUserEmail", defaultEmail);
        
        setProfileData({
            id: role,
            email: defaultEmail,
            name: role.toUpperCase(),
        });
        
        if (setCourierStatus) {
            setCourierStatus(initialCourierStatus);
        }

        setScreen(targetScreen);
    };

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
            // Save user data after successful login
            localStorage.setItem('currentUserId', data.profile.id); 
            localStorage.setItem('currentUserEmail', data.profile.email); 
            
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


    // Determine which view to render
    if (selectedRole && selectedRole !== 'customer') {
        // Handle bypass for non-customer roles instantly
        handleRoleBypass(selectedRole);
        return <div style={styles.page}>Loading {selectedRole.toUpperCase()} Dashboard...</div>;
    }


    if (selectedRole === 'customer') {
        // Renders the Customer Login/Sign Up Form
        return (
            <div style={styles.page}>
                <div style={styles.blueContainer}>
                    <button onClick={() => setSelectedRole(null)} style={styles.backButton}>← Back to Role Select</button>
                    
                    <div style={styles.headerSection}>
                        <img src={dashLogo} alt="Logo" style={styles.logo} />
                        <div style={styles.appTitle}>Spartan Dash</div>
                        <div style={styles.subtitle}>Customer Portal</div>
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


    // Renders the Role Selection Cards by default (selectedRole is null)
    return (
        <div style={styles.page}>
            <RoleSelectionView handleRoleSelect={setSelectedRole} />
        </div>
    );
}

// STYLES 
const styles = {
    // Page/Wrapper Styles
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
    backButton: {
        background: 'none',
        border: 'none',
        color: 'white',
        fontSize: 20,
        alignSelf: 'flex-start',
        marginLeft: 10,
        cursor: 'pointer',
    },
    
    // Header/Logo Styles
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

    // Role Selection Styles
    roleContainer: {
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
    roleHeader: {
        color: '#333',
        fontSize: 18,
        marginBottom: 15,
        textAlign: 'center',
        width: '100%',
    },
    roleGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 15,
        width: '100%',
        marginBottom: 20,
    },
    card: {
        width: "90%",
        maxWidth: 380,
        background: "white",
        padding: 20,
        borderRadius: 20,
        boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
        color: '#333', 
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
    },
    cardIcon: {
        fontSize: 36,
        marginBottom: 5,
        // Card specific color logic handled inline
    },
    cardTitle: {
        fontSize: 14,
        fontWeight: 'bold',
        marginTop: 5,
        // Card specific color logic handled inline
    },
    roleNote: {
        fontSize: 12,
        color: '#777',
        textAlign: 'center',
        marginTop: 10,
    },
    
    // Form Styles (Customer)
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
        cursor: "pointer",
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
        width: '100%',
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
        width: '100%',
        boxSizing: 'border-box',
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