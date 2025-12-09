import React, { useState } from 'react';

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

export default function MockStorePortal({ setScreen }) {
    const [isSodaAvailable, setIsSodaAvailable] = useState(true);

    // TC 23 (FR 18.2): Simulate Accepting an Incoming Order
    const handleAcceptOrder = () => {
        // Simulating the system update: Order status updates to "Accepted"
        alert("Simulation: Order #700 Accepted! Customer tracking screen updated.");
    };

    // TC 25 (FR 20.1): Manage Inventory
    const handleToggleInventory = () => {
        const newState = !isSodaAvailable;
        setIsSodaAvailable(newState);
        const statusText = newState ? "AVAILABLE" : "OUT-OF-STOCK";
        // FR 20.1: Item is marked unavailable on the customer menu page.
        alert(`Simulation: Soda is now marked as ${statusText} on the customer menu.`);
    };

    // TC 24 (FR 19.1): Store Menu Update
    const handleMenuUpdate = () => {
        // FR 19.1: Customer Menu view displays the updated description.
        alert("Simulation: 'Sandwich' description saved as 'Made with Sourdough'. Customer Menu updated.");
    };


    return (
        <PageWrapper>
            <h2 style={styles.header}>Store Portal: Restaurant Dashboard</h2>
            <p style={styles.message}>Logged in as: **RESTAURANT**</p>
            
            {/* TC 23: Incoming Orders Section */}
            <div style={styles.section}>
                <h3 style={styles.sectionHeader}>Incoming Orders</h3>
                <div style={styles.orderItem}>
                    <p>Order #700 (Customer: Jane Doe)</p>
                    <button onClick={handleAcceptOrder} style={styles.acceptButton}>
                        Accept Order
                    </button>
                </div>
            </div>

            {/* TC 24 & 25: Inventory & Menu Management */}
            <div style={styles.section}>
                <h3 style={styles.sectionHeader}>Menu Management</h3>
                
                {/* TC 25: Inventory Toggle */}
                <div style={styles.inventoryRow}>
                    <span>**Soda** Status: </span>
                    <button 
                        onClick={handleToggleInventory}
                        style={isSodaAvailable ? styles.toggleOn : styles.toggleOff}
                    >
                        {isSodaAvailable ? "IN-STOCK" : "OUT-OF-STOCK"}
                    </button>
                </div>

                {/* TC 24: Menu Item Edit */}
                <button onClick={handleMenuUpdate} style={styles.updateButton}>
                    Simulate Edit "Sandwich" Description
                </button>
            </div>

            <button onClick={() => setScreen("login")} style={styles.logoutButton}>
                Log Out
            </button>
        </PageWrapper>
    );
}

const styles = {
    header: { color: '#030182', textAlign: 'center', fontSize: 24, marginBottom: 10 },
    message: { color: '#4A5565', textAlign: 'center', marginBottom: 30, fontSize: 14 },
    
    section: { marginBottom: 25, border: '1px solid #ccc', padding: 15, borderRadius: 10 },
    sectionHeader: { fontSize: 18, color: '#030182', marginTop: 0, marginBottom: 15 },
    
    orderItem: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
    
    acceptButton: {
        padding: '8px 12px',
        backgroundColor: '#4CAF50',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
    },
    
    // TC 25 Styles
    inventoryRow: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 15,
        fontWeight: 'bold',
    },
    toggleOn: {
        padding: '8px 12px',
        backgroundColor: '#28A745',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
    },
    toggleOff: {
        padding: '8px 12px',
        backgroundColor: '#DC3545',
        color: 'white',
        border: 'none',
        borderRadius: 5,
        cursor: 'pointer',
    },
    
    // TC 24 Style
    updateButton: {
        width: '100%',
        padding: 10,
        backgroundColor: '#0033cc',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
    },

    logoutButton: {
        width: '100%',
        padding: 12,
        backgroundColor: '#DC3545',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        marginTop: 20,
    }
};