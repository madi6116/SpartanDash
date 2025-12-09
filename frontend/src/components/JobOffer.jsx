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
      overflow: "hidden",
      minHeight: "90vh",
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

export default function JobOffer({ setScreen }) {
    
    // Mock order data for the offer
    const mockOrder = {
        id: 500,
        restaurant: "Burger King",
        pickup: "100 S 10th St (SJSU)",
        dropoff: "300 S 5th St (Campus Housing)",
        pay: 8.50
    };

    // TC 19 (FR 14.1): Courier Accepts Job
    const handleAccept = () => {
        alert(`Order #${mockOrder.id} Accepted! Status updated to 'Accepted'. You are now assigned to the delivery.`);
        setScreen("profile"); 
    };

    // TC 20 (FR 14.2): Courier Declines Job
    const handleDecline = () => {
        alert(`Order #${mockOrder.id} Declined. The order has been re-queued for other couriers.`);
        setScreen("profile"); 
    };

    // NEW HANDLER (TC 21): Simulates Proxy Contact
    const handleProxyContact = (type) => {
        const action = type === 'call' ? 'calling' : 'starting a chat with';
        // FR 15.1: System facilitates proxy contact, masking customer's number.
        alert(`Simulating ${action} customer. System is using a proxy number to mask the customer's actual phone number.`);
    };

    return (
        <PageWrapper>
            <h2 style={styles.header}>New Delivery Offer!</h2>
            
            <div style={styles.orderCard}>
                <p style={styles.orderId}>Order # {mockOrder.id}</p>
                <p style={styles.detail}>**Restaurant:** {mockOrder.restaurant}</p>
                <p style={styles.detail}>**Pickup:** {mockOrder.pickup}</p>
                <p style={styles.detail}>**Dropoff:** {mockOrder.dropoff}</p>
                <h3 style={styles.pay}>Total Pay: ${mockOrder.pay.toFixed(2)}</h3>
            </div>
            
            {/* NEW: Contact Buttons (TC 21) */}
            <h3 style={styles.contactHeader}>Actions:</h3>
            <div style={styles.contactRow}>
                <button onClick={() => handleProxyContact('call')} style={styles.contactCallButton}>
                    📞 Contact Customer
                </button>
                <button onClick={() => handleProxyContact('chat')} style={styles.contactChatButton}>
                    💬 Start Chat
                </button>
            </div>


            <div style={styles.buttonRow}>
                {/* Accept Button (TC 19) */}
                <button onClick={handleAccept} style={styles.acceptButton}>
                    Accept Delivery
                </button>
                {/* Decline Button (TC 20) */}
                <button onClick={handleDecline} style={styles.declineButton}>
                    Decline Delivery
                </button>
            </div>
            
            <button onClick={() => setScreen("profile")} style={styles.backButton}>
                ← Back to Dashboard
            </button>
        </PageWrapper>
    );
}

const styles = {
    header: { color: '#030182', textAlign: 'center', fontSize: 24, marginBottom: 20 },
    orderCard: { 
        border: '1px solid #ccc', 
        padding: 20, 
        borderRadius: 10, 
        width: '100%', 
        marginBottom: 20 
    },
    orderId: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 10 },
    detail: { fontSize: 14, margin: '5px 0' },
    pay: { fontSize: 20, color: '#4CAF50', textAlign: 'center', marginTop: 15 },
    
    // NEW Contact Styles
    contactHeader: { fontSize: 16, color: '#030182', marginBottom: 10 },
    contactRow: { 
        display: 'flex', 
        gap: 10, 
        width: '100%', 
        marginBottom: 20 
    },
    contactCallButton: {
        flex: 1,
        padding: 12,
        backgroundColor: '#030182',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    contactChatButton: {
        flex: 1,
        padding: 12,
        backgroundColor: '#0033cc',
        color: 'white',
        border: 'none',
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 'bold',
    },

    // Accept/Decline Button Styles
    buttonRow: { 
        display: 'flex', 
        gap: 10, 
        width: '100%', 
        marginBottom: 10 
    },
    acceptButton: {
        flex: 1, 
        padding: 12, 
        backgroundColor: '#4CAF50', 
        color: 'white', 
        border: 'none', 
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    declineButton: {
        flex: 1, 
        padding: 12, 
        backgroundColor: '#DC3545', 
        color: 'white', 
        border: 'none', 
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    backButton: {
        width: '100%',
        padding: 12,
        backgroundColor: '#ccc',
        color: '#333',
        border: 'none',
        borderRadius: 8,
        marginTop: 10,
        cursor: 'pointer',
    }
};