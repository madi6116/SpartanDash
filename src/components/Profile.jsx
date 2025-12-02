import React, { useState } from 'react';
import PastOrders from './PastOrders';
import profilePic from '../assets/JaneDoe.jpg'; 

// MOCK DATA: Using the local image asset
const MOCK_USER = {
  name: "Jane Doe",
  status: "Verified Student",
  image: profilePic, 
};

// --- Settings View Component ---
const SettingsView = ({ navigateToProfile, navigateToLogin, currentUserEmail }) => {
//                                                              ^^^^^^^^^^^^^^^^^^ FINAL FIX 1: ACCEPT CURRENT USER EMAIL
  
  const handleAccountClosure = () => {
    // FINAL FIX 2: Implement Deletion Block Logic (FR 3.3)
    if (currentUserEmail === 'test@sjsu.edu') {
        alert('Account deletion blocked: Cannot delete primary demo account (test@sjsu.edu).');
        return; 
    }

    // Proceed with deletion logic for all other accounts
    if (window.confirm("Are you sure you want to permanently close your account? This action cannot be undone.")) {
      alert(`Account deletion successfully requested for ${currentUserEmail}.`);
      navigateToLogin(); // navigateToLogin is handleLogout, which clears session
    }
  };

  const handleApplyToCourier = () => {
    alert('Navigating to Courier Application form for ID verification.');
    console.log('US 12.1 and 13.1 logic initiated.');
  };

  return (
    <div style={styles.pageWrapper}> {/* FIX 3A: Use wrapper for centering and background */}
      <div style={styles.settingsContainer}> 
        <h2 style={styles.settingsHeader}>Settings</h2>
        
        <div style={styles.profileSummary}>
          <img src={MOCK_USER.image} alt="Profile" style={styles.profilePicLg} />
          <h3 style={styles.userName}>{MOCK_USER.name}</h3>
          <p style={styles.userStatus}>🛒 Verified Student</p>
        </div>

        <div style={styles.settingsList}>
          
          <div onClick={() => console.log('Go to Security')} style={styles.listItem}>
            <span role="img" aria-label="Key" style={styles.itemIcon}>🔑</span> Account Security
          </div>
          
          <div onClick={() => console.log('Go to Personal Info Edit')} style={styles.listItem}>
            <span role="img" aria-label="Person" style={styles.itemIcon}>👤</span> Personal Info.
          </div>
          
          <div onClick={handleApplyToCourier} style={styles.listItem}>
            <span role="img" aria-label="Box" style={styles.itemIcon}>📦</span> Apply to Be a Courier
          </div>
          
          <div onClick={handleAccountClosure} style={styles.deleteButton}>
            <span role="img" aria-label="X" style={styles.itemIcon}>❌</span> Delete Account
          </div>
        </div>

        <div style={styles.settingsFooter}>
        {/* FIX A: Wrap the entire footer in a full-width container for blue bar style */}
        <div style={styles.finalFooterWrapper}>
            <button onClick={navigateToProfile} style={styles.finalHomeButton}>
                <span style={styles.finalButtonArrow}>←</span> Back to Profile
            </button>
        </div>
        
        </div>
      </div>
    </div>
  );
};

// --- Main Profile Page Component ---
const Profile = ({ navigateToHome, navigateToLogin, setScreen, setCart, favoriteOrders, setFavoriteOrders, setOrderViewMode, currentUserEmail }) => {
//                                                                                                                            ^^^^^^^^^^^^^^^^^^ FINAL FIX 1: ACCEPT CURRENT USER EMAIL
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  const handleViewOrders = () => {
    setScreen("pastOrders"); 
  };

  if (isSettingsOpen) {
    return <SettingsView 
             navigateToProfile={() => setIsSettingsOpen(false)} 
             navigateToLogin={navigateToLogin} 
             currentUserEmail={currentUserEmail} // PASS PROP DOWN
           />;
  }
  
  // RENDER MAIN PROFILE VIEW
  return (
    <div style={styles.pageWrapper}>
      <div style={styles.profileContainer}> 
        
        <div style={styles.profileHeader}>
          <div>
            <h1 style={styles.profileName}>{MOCK_USER.name}</h1>
            <p style={styles.profileStatus}>🛒 Verified Student</p>
          </div>
          <img src={MOCK_USER.image} alt="Profile" style={styles.profilePic} />
        </div>

        {/* Feature Grid: Wallet, Favorites, Orders */}
        <div style={styles.featureGrid}>
          <button 
              onClick={() => setScreen("payment")}
              style={styles.walletButton}
          >
              💳 Wallet
          </button>
          {/* FAVORITES Button: Sets mode to 'favorites' */}
          <button 
            style={styles.favoritesButton}
            onClick={() => { setOrderViewMode('favorites'); setScreen("pastOrders"); }}
          >
            ❤️ Favorites ({favoriteOrders.length || 0})
          </button>

          <button 
              onClick={() => { setOrderViewMode('all'); setScreen("pastOrders"); }} 
              style={styles.ordersButton}
          >
              📜 Orders
          </button>
        </div>

        {/* List Section: Notifications, Promotions, Settings */}
        <div style={styles.listSection}>
          
          <div style={styles.listItem}>
            <span role="img" aria-label="Bell" style={styles.itemIcon}>🔔</span> Notifications
          </div>
          
          <div style={styles.listItem}>
            <span role="img" aria-label="Tag" style={styles.itemIcon}>🏷️</span> Promotions
          </div>

          {/* Click to open your Tracking View */}
          <div onClick={() => setScreen("tracking")} style={styles.listItem}>
            <span role="img" aria-label="Tracking" style={styles.itemIcon}>🚚</span> Track Current Order
          </div>
          
          {/* Click to open your Settings View */}
          <div onClick={() => setIsSettingsOpen(true)} style={styles.listItem}>
            <span role="img" aria-label="Settings" style={styles.itemIcon}>⚙️</span> Settings
          </div>
        </div>


        {/* FINAL FIX: Styled Button at the Bottom */}
        <div style={styles.finalFooterWrapper}>
            <button style={styles.finalHomeButton} onClick={navigateToHome}>
              <span style={styles.finalButtonArrow}>←</span> Back to Home
            </button>
        </div>
      </div>
    </div>
  );
};


// --- FINAL CONSOLIDATED STYLES OBJECT ---
const styles = {
    // Wrapper to center content and push it to the bottom
    pageWrapper: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        fontFamily: "Arial",
        justifyContent: 'flex-end', 
        paddingBottom: '50px', 
    },

    // Shared Card Container (Height Fix is applied here)
    profileContainer: {
        padding: '20px',
        maxWidth: '400px',
        margin: 'auto',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        color: '#333',
        marginTop: '40px',
        minHeight: '700px', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between', 
    },
    
    // Header/Info
    profileHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
    },
    profileName: {
        fontSize: '32px',
        margin: 0,
    },
    profileStatus: {
        margin: '5px 0 0 0',
        fontSize: '14px',
    },
    profilePic: {
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    
    // Feature Grid (Buttons)
    featureGrid: {
        display: 'flex',
        justifyContent: 'space-between',
        marginBottom: '30px',
    },
    
    walletButton: {
        width: '30%',
        padding: '15px',
        borderRadius: '10px',
        border: 'none',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        backgroundColor: '#3366ff',
    },
    favoritesButton: {
        width: '30%',
        padding: '15px',
        borderRadius: '10px',
        border: 'none',
        color: 'black',
        fontWeight: 'bold',
        cursor: 'pointer',
        backgroundColor: '#ffcc33',
    },
    ordersButton: {
        width: '30%',
        padding: '15px',
        borderRadius: '10px',
        border: 'none',
        color: 'white',
        fontWeight: 'bold',
        cursor: 'pointer',
        backgroundColor: '#0033cc',
    },
    
    // List Section (Notifications/Settings)
    listSection: {
        borderTop: '1px solid #ccc',
        marginBottom: 'auto', // Pushes remaining space below list items
    },
    listItem: {
        padding: '15px 0',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
    },
    itemIcon: {
        marginRight: '15px',
    },
    
    // FINAL FIX 3: Back to Home Button Style
    finalFooterWrapper: {
        width: '100%',
        marginTop: '30px',
        paddingTop: '15px', 
        borderTop: '1px solid #eee',
    },
    finalHomeButton: {
        width: '100%',
        padding: '12px',
        backgroundColor: '#030182', // Dark Blue
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '18px',
        cursor: 'pointer',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    finalButtonArrow: {
        marginRight: '10px',
    },

    // --- Settings View Specific Styles ---
    settingsContainer: {
        padding: '20px',
        backgroundColor: 'white',
        minWidth: '360px',
        margin: 'auto',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        color: '#333',
        marginTop: '40px',
        minHeight: '700px',
    },
    settingsHeader: {
        fontSize: '24px',
        margin: '0 0 20px 0',
        textAlign: 'center',
    },
    profileSummary: {
        textAlign: 'center',
        marginBottom: '30px',
    },
    profilePicLg: {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
    },
    userName: {
        marginTop: '10px',
    },
    userStatus: {
        fontSize: '14px',
    },
    settingsList: {
        borderTop: '1px solid #ccc',
    },
    deleteButton: {
        padding: '15px 0',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
        color: 'red',
        fontWeight: 'bold',
    },
    settingsFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column', // Stack the full-width button and the sign-out link
        alignItems: 'center',
        marginTop: '30px',
    },
    backButton: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        color: '#030182', // Make it visible
        fontWeight: '600',
    },
    signOutButton: {
        background: 'none',
        border: 'none',
        color: 'red',
        cursor: 'pointer',
        fontSize: '16px',
    }
};

export default Profile;