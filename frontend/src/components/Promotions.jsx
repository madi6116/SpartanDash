import React from 'react';

// --- Promotion Data ---
const promotions = [
    {
        code: 'FREESHIP25',
        type: 'shipping', // Applies free shipping
        description: 'Enjoy free delivery on your next order over $25!',
        minOrder: 25,
        icon: '🚚'
    },
    {
        code: 'SJSU25OFF',
        type: 'percent', // Applies 25% off the subtotal
        value: 0.25, // 25%
        description: 'Get 25% off your next order (Max $10 discount).',
        maxDiscount: 10,
        icon: '🏷️'
    }
];

// --- Promotions Component ---
function Promotions({ setScreen, applyDiscount }) {
    
    // Navigate back to the Profile screen
    const navigateToProfile = () => {
        setScreen("profile");
    };

    return (
        <div style={styles.pageWrapper}>
            <div style={styles.profileCard}>
                <h2 style={styles.header}>
                    💰 Available Promotions
                </h2>
                <p style={styles.subtitle}>
                    Select a coupon to apply it to your current order!
                </p>

                <div style={styles.listContainer}>
                    {promotions.map((promo) => (
                        <div
                            key={promo.code}
                            style={styles.promoItem}
                            onClick={() => {
                                applyDiscount(promo); // Calls the handler in App.jsx
                                setScreen('cart');    // Navigate to cart to view changes
                            }}
                        >
                            <span style={styles.promoIcon}>{promo.icon}</span>
                            <div style={styles.promoDetails}>
                                <h4 style={styles.promoCode}>{promo.code}</h4>
                                <p style={styles.promoDesc}>{promo.description}</p>
                            </div>
                            <button style={styles.applyButton}>Apply</button>
                        </div>
                    ))}
                </div>

                <div style={styles.finalFooterWrapper}>
                    <button style={styles.finalHomeButton} onClick={navigateToProfile}>
                        <span style={styles.finalButtonArrow}>←</span> Back to Profile
                    </button>
                </div>
            </div>
        </div>
    );
}

// --- STYLES ---
const styles = {
    // --- Layout and Card Styles ---
    pageWrapper: {
        width: "100vw",
        height: "100vh",
        backgroundColor: "#f0f0f0", 
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: 20,
        fontFamily: "Arial",
    },
    profileCard: { 
        padding: '20px',
        maxWidth: '400px',
        width: '100%',
        margin: 'auto',
        backgroundColor: 'white',
        borderRadius: '15px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
        color: '#333',
        marginTop: '40px',
        minHeight: '700px', 
        display: 'flex', 
        flexDirection: 'column', 
    },
    header: {
        fontSize: '28px',
        marginBottom: '10px',
        color: '#003366', 
    },
    subtitle: {
        marginBottom: '20px',
        color: '#555',
    },
    listContainer: {
        marginBottom: '30px',
        flexGrow: 1, 
        overflowY: 'auto', 
        paddingRight: '5px',
    },
    // --- Promotion Item Styles ---
    promoItem: { 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        margin: '10px 0',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #ddd',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        '&:hover': {
            backgroundColor: '#f0f0ff',
        }
    },
    promoIcon: {
        fontSize: '28px',
        marginRight: '15px',
    },
    promoDetails: {
        flexGrow: 1,
        marginRight: '15px',
    },
    promoCode: {
        margin: '0 0 5px 0',
        fontSize: '16px', 
        fontWeight: 'bold',
        color: '#030182', 
    },
    promoDesc: {
        margin: 0,
        fontSize: '14px',
        color: '#666',
    },
    applyButton: {
        padding: '8px 15px',
        backgroundColor: '#ffcc33', // Yellow/Gold color
        color: 'black',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    // --- Footer Styles ---
    finalFooterWrapper: {
        width: '100%',
        marginTop: 'auto', 
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
};

export default Promotions;