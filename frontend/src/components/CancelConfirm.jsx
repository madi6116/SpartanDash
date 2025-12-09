import React from 'react';

// --- Helper Component: PageWrapper (for Consistent Layout) ---

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
      overflow: "hidden",
      minHeight: "90vh",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      // Added padding here to align content inside the wrapper
      padding: 30, 
      boxSizing: 'border-box',
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {children}
    </div>
  </div>
);

// --- Main Cancellation Confirmation Component ---

export default function CancelConfirm({ setScreen }) {
  return (
    <PageWrapper>
        <div style={styles.contentWrapper}>
            <h2 style={styles.header}>❌ Order Canceled!</h2>
            <p style={styles.message}>
                Your order has been successfully canceled and removed from active tracking. 
                The order status is updated in your **Order History**.
            </p>
            
            <button onClick={() => setScreen("pastOrders")} style={styles.historyButton}>
                View Canceled Order
            </button>
            
            <button onClick={() => setScreen("home")} style={styles.homeButton}>
                Back to Home
            </button>
        </div>
    </PageWrapper>
  );
}

const styles = {
    // This wrapper ensures the content block aligns correctly inside the centered PageWrapper div
    contentWrapper: {
        width: '100%',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    header: { 
        color: '#FB2C36', 
        fontSize: 28, 
        margin: '0 0 10px 0' 
    },
    message: { 
        color: '#4A5565', 
        marginBottom: 30,
        maxWidth: 300,
        lineHeight: 1.4,
    },
    historyButton: {
        width: '100%', 
        padding: 12, 
        background: '#0033cc', // Blue
        color: 'white', 
        border: 'none', 
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    homeButton: {
        width: '100%', 
        padding: 12, 
        marginTop: 10, 
        background: '#030182', // Darker Blue
        color: 'white', 
        border: 'none', 
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 'bold',
    }
};