import React, { useState } from 'react';
import profilePic from '../assets/JaneDoe.jpg'; 

// --- Settings View Component ---
// Needs setScreen and setCourierStatus from the main App component
const SettingsView = ({ navigateToProfile, navigateToLogin, currentUserId, currentUserEmail, profileData, setScreen, setCourierStatus }) => {
    
    // Just simulates deleting the account and logging out
    const handleAccountClosure = async () => {
        if (!currentUserId) {
            alert("Error: Cannot delete account. User ID not found.");
            return;
        }

        if (!window.confirm("Are you sure you want to permanently close your account? This action cannot be undone.")) {
            return; 
        }
        
        // pretending the backend handled it
        navigateToLogin(); 
        alert(`Account deletion simulated successfully!`);
    };

    // This handles going to the Courier Application page (TC 17)
    const handleApplyToCourier = () => {
        setScreen("courierApply");
    };

    // Simulates an admin banning this user (TC 26)
    const handleAdminBan = () => {
        alert("Admin Action Simulated: You have been banned and are now logged out.");
        navigateToLogin(); 
    };

    // Simulates an admin verifying this user's ID (TC 27)
    const handleAdminVerify = () => {
        setCourierStatus("Verified");
        navigateToProfile(); // Go back to the profile to show the new status
        alert("Admin Action Simulated: Status updated to 'Verified Courier'!");
    };


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
                    
                    {/* Courier Application button */}
                    <div onClick={handleApplyToCourier} style={styles.listItem}>
                        <span role="img" aria-label="Box" style={styles.itemIcon}>📦</span> Apply to Be a Courier
                    </div>
                    
                    {/* Admin Verification Button */}
                    <div onClick={handleAdminVerify} style={styles.adminButton}>
                        <span role="img" aria-label="Check" style={styles.itemIcon}>✅</span> SIMULATE: Admin Verify ID
                    </div>

                    {/* Delete Account button (Simulated Admin Ban is here too) */}
                    <div onClick={handleAdminBan} style={styles.adminDeleteButton}>
                        <span role="img" aria-label="Ban" style={styles.itemIcon}>⛔</span> SIMULATE: Admin Ban Account
                    </div>

                    {/* Original Delete Account */}
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
// Gets the courier status from the main app state
const Profile = ({ navigateToHome, navigateToLogin, setScreen, favoriteOrders, setOrderViewMode, profileData, cart, courierStatus, setCourierStatus }) => {
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    
    const storedId = localStorage.getItem('currentUserId');
    const storedEmail = localStorage.getItem('currentUserEmail');
    const cartCount = cart.reduce((count, item) => count + (item.qty || 1), 0);

    const name = profileData?.name || "Loading...";
    const currentUserId = profileData?.id || storedId;
    const currentUserEmail = profileData?.email || storedEmail; 
    
    const handleViewOrders = (mode) => {
        setOrderViewMode(mode); 
        setScreen("pastOrders"); 
    };

    // Makes the status text change based on our courier state
    const statusText = (courierStatus === "Pending") 
        ? "📦 Pending Courier Application" 
        : (courierStatus === "Verified" ? "✅ Verified Courier" : "🛒 Verified Student");


    if (isSettingsOpen) {
        return <SettingsView 
                    navigateToProfile={() => setIsSettingsOpen(false)} 
                    navigateToLogin={navigateToLogin} 
                    currentUserId={currentUserId}
                    currentUserEmail={currentUserEmail}
                    profileData={profileData} 
                    setScreen={setScreen} // Allows navigation away from settings
                    setCourierStatus={setCourierStatus} // Allows setting the courier state
                />;
    }
    
    // RENDER MAIN PROFILE VIEW
    return (
        <div style={styles.pageWrapper}>
            <div style={styles.profileContainer}> 
                
                <div style={styles.profileHeader}>
                    <div>
                        <h1 style={styles.profileName}>{name}</h1>
                        {/* Shows the new dynamic status */}
                        <p style={styles.profileStatus}>{statusText}</p>
                    </div>
                    
                    {/* Cart Wrapper */}
                    <div style={styles.picCartWrapper}>
                        <img src={profilePic} alt="Profile" style={styles.profilePic} />
                        {cartCount > 0 && (
                            <button
                                onClick={() => setScreen("cart")}
                                style={styles.cartIconContainer}
                            >
                                <span style={styles.cartIcon}>🛒</span>
                                <span style={styles.cartBadge}>{cartCount}</span>
                            </button>
                        )}
                    </div>
                </div>

                {/* Feature Grid: Wallet, Favorites, Orders */}
                <div style={styles.featureGrid}>
                    <button 
                        onClick={() => setScreen("cardManagement")}
                        style={styles.walletButton}
                    >
                        💳 Wallet
                    </button>
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

                {/* COURIER ACTIONS: Only show if Verified Courier */}
                {courierStatus === "Verified" && (
                    <div style={styles.courierSection}>
                        <h3 style={styles.courierHeader}>Courier Tools:</h3>
                        <button 
                            onClick={() => handleViewOrders('all')} // Delivery History (FR 16.1)
                            style={styles.deliveryHistoryButton}
                        >
                            📦 View Delivery History
                        </button>
                        <button 
                            onClick={() => setScreen("jobOffer")} // New Job Offer (TC 19/20)
                            style={styles.jobOfferButton}
                        >
                            💼 View New Job Offers
                        </button>
                    </div>
                )}
                
                {/* List Section: Notifications, Promotions, Settings */}
                <div style={styles.listSection}>
                    
                    <div onClick={() => console.log('Go to Notifications')} style={styles.listItem}>
                        <span role="img" aria-label="Bell" style={styles.itemIcon}>🔔</span> Notifications
                    </div>
                    
                    <div onClick={() => setScreen("promotions")} style={styles.listItem}>
                        <span role="img" aria-label="Tag" style={styles.itemIcon}>🏷️</span> Promotions
                    </div>

                    <div onClick={() => setScreen("tracking")} style={styles.listItem}>
                        <span role="img" aria-label="Tracking" style={styles.itemIcon}>🚚</span> Track Current Order
                    </div>
                    
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

// --- STYLES ---
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

    // PROFILE PICTURE + CART ICON WRAPPER
    picCartWrapper: {
        position: 'relative',
        width: 'fit-content',
        height: 'fit-content',
    },
    
    // Profile Header section
    profileHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Align items to the top to respect position: absolute
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
    
    // CART ICON STYLES
    cartIconContainer: {
        position: 'absolute', 
        bottom: -5, // Adjust vertical position
        right: -5, // Adjust horizontal position
        padding: 0, // Removed padding here
        width: 30,
        height: 30,
        backgroundColor: '#ffcc33',
        color: '#030182',
        border: '3px solid white', // White border for separation
        borderRadius: '50%', // Circle shape
        fontWeight: 'bold',
        cursor: 'pointer',
        fontSize: 12,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        zIndex: 10,
    },
    cartIcon: {
        fontSize: 16,
    },
    cartBadge: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#030182',
        color: 'white',
        borderRadius: '50%',
        fontSize: 10,
        padding: '2px 4px',
        fontWeight: 'bold',
        transform: 'translate(50%, -50%)', // Pull badge outside the circle
        minWidth: '16px',
        textAlign: 'center',
        lineHeight: '12px',
        height: '16px',
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
        marginBottom: 'auto', 
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
        backgroundColor: '#030182', 
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
    
    // Settings View Specific Styles
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
    adminDeleteButton: { // Style for simulated admin ban
        padding: '15px 0',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
        color: '#DC3545',
        fontWeight: 'bold',
    },
    adminButton: { // Style for simulated admin verification
        padding: '15px 0',
        borderBottom: '1px solid #eee',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        fontSize: '16px',
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    settingsFooter: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'column',
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
    // New styles for courier section on main profile view
    courierSection: {
        border: '1px solid #0033cc',
        padding: '15px',
        borderRadius: '10px',
        marginBottom: '20px',
        backgroundColor: '#e6f0ff',
    },
    courierHeader: {
        fontSize: '18px',
        color: '#0033cc',
        marginTop: 0,
        marginBottom: '10px',
    },
    deliveryHistoryButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#ffcc33',
        color: '#333',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginBottom: '10px',
    },
    jobOfferButton: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#030182',
        color: 'white',
        border: 'none',
        borderRadius: '8px',
        fontWeight: 'bold',
        cursor: 'pointer',
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