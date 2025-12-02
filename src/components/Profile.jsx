// src/components/Profile.jsx
import React, { useState } from 'react';
// Note: You will need to add corresponding CSS for proper styling.

// --- Mock Data ---
const MOCK_USER = {
  name: "Jane Doe",
  status: "Verified Student",
  image: "/src/assets/PizzaMyHeart.png" // Using an existing image placeholder for the profile pic
};

// --- Settings View Component (Handles US 3.3, US 12/13) ---
const SettingsView = ({ navigateToProfile, navigateToLogin }) => {
  
  // Implementation for US 3.3: Request Account Closure
  const handleAccountClosure = () => {
    if (window.confirm("Are you sure you want to permanently close your account? This action cannot be undone.")) {
      alert('Account closure request processed. You will be logged out.');
      navigateToLogin(); // Log out after closure request
    }
  };

  // Implementation for US 12 & 13: Apply to be a Courier
  const handleApplyToCourier = () => {
    alert('Navigating to Courier Application form for ID verification.');
    console.log('US 12.1 and 13.1 logic initiated.');
  };

  return (
    <div className="settings-container" style={{padding: '20px', backgroundColor: 'white'}}>
      <h2 style={{fontSize: '24px', margin: '0 0 20px 0'}}>Settings</h2>
      
      {/* Profile Summary based on image_c2f320.png */}
      <div className="profile-summary" style={{textAlign: 'center', marginBottom: '30px'}}>
        <img src={MOCK_USER.image} alt="Profile" style={{width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover'}} />
        <h3 style={{marginTop: '10px'}}>{MOCK_USER.name}</h3>
        <p>🛒 {MOCK_USER.status}</p>
      </div>

      <div className="settings-list" style={{borderTop: '1px solid #ccc'}}>
        
        {/* Account Security (Part of US 3) */}
        <div onClick={() => console.log('Go to Security')} style={{padding: '15px 0', borderBottom: '1px solid #eee', cursor: 'pointer'}}>
          <span role="img" aria-label="Key" style={{marginRight: '10px'}}>🔑</span> Account Security
        </div>
        
        {/* Personal Info. (US 3.2) */}
        <div onClick={() => console.log('Go to Personal Info Edit')} style={{padding: '15px 0', borderBottom: '1px solid #eee', cursor: 'pointer'}}>
          <span role="img" aria-label="Person" style={{marginRight: '10px'}}>👤</span> Personal Info.
        </div>
        
        {/* Apply to Be a Courier (US 12 & 13) */}
        <div onClick={handleApplyToCourier} style={{padding: '15px 0', borderBottom: '1px solid #eee', cursor: 'pointer'}}>
          <span role="img" aria-label="Box" style={{marginRight: '10px'}}>📦</span> Apply to Be a Courier
        </div>
        
        {/* Delete Account (US 3.3) */}
        <div onClick={handleAccountClosure} style={{padding: '15px 0', color: 'red', fontWeight: 'bold', cursor: 'pointer'}}>
          <span role="img" aria-label="X" style={{marginRight: '10px'}}>❌</span> Delete Account
        </div>
      </div>

      <div className="settings-footer" style={{display: 'flex', justifyContent: 'space-between', marginTop: '30px'}}>
        <button onClick={navigateToProfile} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px'}}>
          ⬅️ back to profile
        </button>
        <button onClick={navigateToLogin} style={{background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '16px'}}>
          sign out
        </button>
      </div>
    </div>
  );
};

// --- Main Profile Page Component (US 3, 11) ---
const Profile = ({ navigateToHome, navigateToLogin }) => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPastOrdersOpen, setIsPastOrdersOpen] = useState(false);
  
  // Past Orders Mock Logic (US 11)
  const handleViewOrders = () => {
    setIsPastOrdersOpen(true);
    console.log('Navigating to Past Orders/History');
  };

  // If the user clicks on Settings, render the Settings View
  if (isSettingsOpen) {
    return <SettingsView 
             navigateToProfile={() => setIsSettingsOpen(false)} 
             navigateToLogin={navigateToLogin} // Passes the logout function
           />;
  }
  
  // If the user clicks on Past Orders, render the Past Orders View (Placeholder)
  if (isPastOrdersOpen) {
    return (
      <div style={{padding: '20px'}}>
        <h2>Past Orders History</h2>
        <p>This is where the list of past orders and the Reorder button (US 11.2) would be implemented.</p>
        <button onClick={() => setIsPastOrdersOpen(false)}>⬅️ back to profile</button>
      </div>
    );
  }


  // Main Profile View (image_c3c135.png)
  return (
    <div className="profile-container" style={{padding: '20px', maxWidth: '400px', margin: 'auto', backgroundColor: 'white', borderRadius: '15px'}}>
      
      <div className="profile-header" style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
        <div>
          <h1 style={{fontSize: '32px', margin: 0}}>{MOCK_USER.name}</h1>
          <p style={{margin: '5px 0 0 0'}}>🛒 {MOCK_USER.status}</p>
        </div>
        <img src={MOCK_USER.image} alt="Profile" style={{width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover'}} />
      </div>

      {/* Feature Grid: Wallet, Favorites, Orders (US 11) */}
      <div className="feature-grid" style={{display: 'flex', justifyContent: 'space-between', marginBottom: '30px'}}>
        <button style={{width: '30%', padding: '15px', borderRadius: '10px', backgroundColor: '#3366ff', color: 'white'}}>💳 Wallet</button>
        <button style={{width: '30%', padding: '15px', borderRadius: '10px', backgroundColor: '#ffcc33', color: 'black'}}>❤️ Favorites</button>
        <button onClick={handleViewOrders} style={{width: '30%', padding: '15px', borderRadius: '10px', backgroundColor: '#0033cc', color: 'white'}}>📜 Orders</button>
      </div>

      {/* List Section: Notifications, Promotions, Settings */}
      <div className="list-section" style={{borderTop: '1px solid #ccc'}}>
        
        <div style={{padding: '15px 0', borderBottom: '1px solid #eee'}}>
          <span role="img" aria-label="Bell" style={{marginRight: '15px'}}>🔔</span> Notifications
        </div>
        
        <div style={{padding: '15px 0', borderBottom: '1px solid #eee'}}>
          <span role="img" aria-label="Tag" style={{marginRight: '15px'}}>🏷️</span> Promotions
        </div>
        
        {/* Click to open your Settings View */}
        <div onClick={() => setIsSettingsOpen(true)} style={{padding: '15px 0', cursor: 'pointer'}}>
          <span role="img" aria-label="Settings" style={{marginRight: '15px'}}>⚙️</span> Settings
        </div>
      </div>

      <div className="navigation-footer" style={{marginTop: '30px', cursor: 'pointer'}} onClick={navigateToHome}>
        <span style={{marginRight: '10px'}}>⬅️</span> back to home
      </div>
    </div>
  );
};

export default Profile;