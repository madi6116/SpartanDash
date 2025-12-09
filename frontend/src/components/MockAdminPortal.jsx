import React from 'react';

// Reusing PageWrapper for consistent layout
const PageWrapper = ({ children }) => (
  <div style={{
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    background: "#F5F5F5",
    padding: 20,
    overflowY: "auto"
  }}>
    <div style={{
      width: "100%",
      maxWidth: 430,
      background: "white",
      borderRadius: 16,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      padding: 30,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {children}
    </div>
   </div>
);

// This component simulates the actions of a System Administrator (TC 26 & 27)
export default function MockAdminPortal({ setScreen, navigateToLogin, setCourierStatus }) {
    
    // Simulates Admin Banning a User (TC 26)
    const handleBanAccount = () => {
        // Simulates FR 22.3: User's status updates to "Banned". User cannot log in.
        alert("SIMULATION: User 'bad_actor' status updated to 'Banned'. Logging out to demonstrate loss of access.");
        navigateToLogin(); // Executes the handleLogout from App.jsx
    };

    // Simulates Admin Verifying a Courier ID (TC 27 - Positive Outcome)
    const handleVerifyCourier = () => {
        // Simulates FR 23.3: User's verification status updates to "Verified".
        setCourierStatus("Verified");
        alert("SIMULATION: Courier verification status updated to 'Verified'. Profile status is now updated.");
        setScreen("profile"); // Navigate to Profile to show the new status text
    };

    // NEW: Simulates Admin Rejecting a Courier ID (Negative Outcome)
    const handleRejectCourier = () => {
        // Set status to 'None' so the courier profile reverts to 'Verified Student'
        setCourierStatus("None"); 
        alert("SIMULATION: Courier application rejected. Status reset to 'Verified Student'. Courier notified.");
        setScreen("profile"); 
    };


    return (
        <PageWrapper>
            <h2 style={styles.header}>Admin Portal: User Management</h2>
            <p style={styles.message}>Logged in as: **ADMIN**</p>
            
            {/* Courier Review Section (TC 27) */}
            <div style={styles.section}>
                <h3 style={styles.sectionHeader}>Courier Applications</h3>
                <div style={styles.reviewItem}>
                    <p style={styles.reviewText}>Pending ID Submission #123</p>
                    <div style={styles.reviewActions}>
                        <button onClick={handleVerifyCourier} style={styles.verifyButton}>
                            Approve ID
                        </button>
                        <button onClick={handleRejectCourier} style={styles.rejectButton}>
                            Reject
                        </button>
                    </div>
                </div>
            </div>

            {/* Ban Account Section (TC 26) */}
            <div style={styles.section}>
                <h3 style={styles.sectionHeader}>User Enforcement</h3>
                <div style={styles.reviewItem}>
                    <p style={styles.reviewText}>Target User: bad_actor</p>
                    <button onClick={handleBanAccount} style={styles.banButton}>
                        Ban Account (FR 22.3)
                    </button>
                </div>
            </div>

            <button onClick={() => setScreen("login")} style={styles.logoutButton}>
                Log Out Admin
            </button>
        </PageWrapper>
    );
}

const styles = {
    header: { color: '#DC3545', textAlign: 'center', fontSize: 24, marginBottom: 10 },
    message: { color: '#4A5565', textAlign: 'center', marginBottom: 30, fontSize: 14 },
    
    section: { marginBottom: 25, border: '1px solid #ccc', padding: 15, borderRadius: 10, backgroundColor: '#fff8f8' },
    sectionHeader: { fontSize: 18, color: '#DC3545', marginTop: 0, marginBottom: 15 },
    
    reviewItem: { 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: 10,
        flexWrap: 'wrap', // Allow buttons to wrap
    },
    reviewText: {
        fontSize: 14,
        margin: '5px 0',
        flexGrow: 1,
    },
    reviewActions: {
        display: 'flex',
        gap: 5,
        marginTop: 5,
        // Ensure actions stay grouped on the right when wrapping
        marginLeft: 'auto', 
    },
    
    // TC 27 Styles - Approve
    verifyButton: {
        padding: '8px 12px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
    },

    // NEW Style - Reject
    rejectButton: {
        padding: '8px 12px',
        backgroundColor: '#999',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
    },
    
    // TC 26 Styles - Ban
    banButton: {
        padding: '8px 12px',
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
    },

    logoutButton: {
        width: '100%',
        padding: 12,
        backgroundColor: '#333',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        marginTop: 20,
    }
};