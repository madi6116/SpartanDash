import React, { useState } from 'react';
import PastOrders from './PastOrders'; // Assuming this component exists
import profilePic from '../assets/JaneDoe.jpg'; // Assuming this is your default avatar

// --- Settings View Component ---
const SettingsView = ({ navigateToProfile, navigateToLogin, currentUserId, currentUserEmail, profileData }) => {
    
    const handleAccountClosure = async () => {
        
        if (!currentUserId) {
            alert("Error: Cannot delete account. User ID not found.");
            return;
        }

        if (!window.confirm("Are you sure you want to permanently close your account? This action cannot be undone.")) {
            return; 
        }
        
        try {
            // Call the DELETE API endpoint with the User ID
            const res = await fetch(`http://localhost:5000/users/delete-account/${currentUserId}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                // SUCCESS PATH
                alert(`Account deleted successfully! Redirecting to login.`);
                
                // Clear localStorage (if set by Login.jsx)
                localStorage.removeItem('currentUserId');
                localStorage.removeItem('currentUserEmail'); 
                
                navigateToLogin(); // Clears main state and switches screen
                
            } else {
                // Handle deletion errors (404, 500)
                const errorData = await res.json();
                alert(`Deletion Failed: ${errorData.msg}`);
            }

        } catch (err) {
            console.error("Deletion API failed:", err);
            alert("Connection error: Could not reach the server to delete the account.");
        }
    };

    const handleApplyToCourier = () => {
        alert('Navigating to Courier Application form for ID verification.');
        console.log('US 12.1 and 13.1 logic initiated.');
    };

    // Use actual user data for display in settings
    const displayName = profileData?.name || profileData?.email?.split('@')[0] || "New User";

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.settingsContainer}> 
                <h2 style={styles.settingsHeader}>Settings</h2>
                
                <div style={styles.profileSummary}>
                    <img src={profilePic} alt="Profile" style={styles.profilePicLg} />
                    <h3 style={styles.userName}>{displayName}</h3>
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
const Profile = ({ navigateToHome, navigateToLogin, setScreen, favoriteOrders, setOrderViewMode, profileData }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    
    // Add localStorage fallback to retrieve ID and Email if state prop is null
    const storedId = localStorage.getItem('currentUserId');
    const storedEmail = localStorage.getItem('currentUserEmail');

    // Use actual user data from props, falling back to stored data
    const name = profileData?.name || "Loading...";
    const currentUserId = profileData?.id || storedId;
    const currentUserEmail = profileData?.email || storedEmail; 
    
    const handleViewOrders = (mode) => {
        setOrderViewMode(mode); 
        setScreen("pastOrders"); 
    };

    if (isSettingsOpen) {
        return <SettingsView 
                  navigateToProfile={() => setIsSettingsOpen(false)} 
                  navigateToLogin={navigateToLogin} 
                  currentUserId={currentUserId}
                  currentUserEmail={currentUserEmail}
                  profileData={profileData} 
               />;
    }
    
    // RENDER MAIN PROFILE VIEW
    return (
        <div style={styles.pageWrapper}>
            <div style={styles.profileContainer}> 
                
                <div style={styles.profileHeader}>
                    <div>
                        <h1 style={styles.profileName}>{name}</h1>
                        <p style={styles.profileStatus}>🛒 Verified Student</p>
                    </div>
                    <img src={profilePic} alt="Profile" style={styles.profilePic} />
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
                        onClick={() => handleViewOrders('favorites')}
                    >
                        ❤️ Favorites ({favoriteOrders.length || 0})
                    </button>

                    <button 
                        onClick={() => handleViewOrders('all')} 
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


                {/* Back to Home Button */}
                <div style={styles.finalFooterWrapper}>
                    <button style={styles.finalHomeButton} onClick={navigateToHome}>
                        <span style={styles.finalButtonArrow}>←</span> Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

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

    // Shared Card Container
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
    
    // List Section
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
    
    // Back to Home Button Style
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
        color: '#030182',
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