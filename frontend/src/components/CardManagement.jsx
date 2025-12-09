import React, { useState } from "react";

// --- Mock Data ---
const INITIAL_CARDS = [
    { last4: "4532", name: "John Doe", exp: "12/25", default: true },
    { last4: "8765", name: "John Doe", exp: "08/26", default: false }
];

// --- Helper Components: PageWrapper (for Centering/Layout) ---

const PageWrapper = ({ children }) => (
  <div style={{
    width: "100vw",
    minHeight: "100vh",
    display: "flex", 
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center", 
    background: "#F5F5F5",
    padding: 20,
    overflowY: "auto"
  }}>
    <div style={{
      width: "100%",
      maxWidth: 400,
      background: "white",
      borderRadius: 16,
      overflow: "hidden",
      minHeight: 700,
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
    }}>
      {children}
    </div>
  </div>
);

// --- Helper Component for a single card row ---
const CardRow = ({ card, index, setAsDefault, deleteCard }) => (
    <div style={cardStyles.cardItem}>
        <div style={cardStyles.cardInfo}>
            <div style={cardStyles.cardNumber}>
                <span style={cardStyles.cardIcon}>💳</span> 
                **** **** **** {card.last4}
                {card.default && <span style={cardStyles.defaultBadge}>Default</span>}
            </div>
            <div style={cardStyles.cardName}>{card.name}</div>
            <div style={cardStyles.cardExpiry}>Expires {card.exp}</div>
        </div>
        <div style={cardStyles.actions}>
            <button onClick={() => deleteCard(index)} style={cardStyles.deleteButton}>Delete</button>
            {!card.default && (
                <button onClick={() => setAsDefault(index)} style={cardStyles.defaultButton}>Set as default</button>
            )}
        </div>
    </div>
);


// --- Main Card Management Component ---
export default function CardManagement({ setScreen }) {
    // State to manage the list of cards
    const [cards, setCards] = useState(INITIAL_CARDS);

    const setAsDefault = index => {
        setCards(prev => prev.map((c, i) => ({ ...c, default: i === index })));
    };

    const deleteCard = index => {
        setCards(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <PageWrapper>
            {/* Header (Used for spacing/alignment only) */}
            <div style={cardStyles.headerWrapper}>
                <button onClick={() => setScreen("profile")} style={cardStyles.backButton}>←</button>
                <h2 style={cardStyles.headerTitle}>Payment Methods</h2>
            </div>

            <div style={{ padding: 16 }}>
                <h3 style={cardStyles.savedCardsHeader}>Saved Cards</h3>

                {/* Map through cards to display rows */}
                {cards.map((card, i) => (
                    <CardRow 
                        key={i} 
                        card={card} 
                        index={i} 
                        setAsDefault={setAsDefault} 
                        deleteCard={deleteCard} 
                    />
                ))}

                <button style={cardStyles.addButton}>+ Add New Card</button>
                
                {/* Secure Notice */}
                <div style={cardStyles.secureNotice}>
                    <b style={{ color: "#003366" }}>Your payment information is secure</b>
                    <p style={{ marginTop: 6, color: "#4A5565", fontSize: 12 }}>We use industry-standard encryption to protect your payment details.</p>
                </div>
            </div>
        </PageWrapper>
    );
}

// --- Styles ---
const cardStyles = {
    // Header Wrapper
    headerWrapper: { 
        background: "#030182", 
        padding: 16, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between' 
    },
    backButton: { 
        background: "transparent", 
        color: "white", 
        border: "none", 
        fontSize: 20, 
        cursor: 'pointer' 
    },
    headerTitle: { 
        color: "white", 
        margin: 0, 
        textAlign: "center", 
        flexGrow: 1, 
        fontSize: 20 
    },
    savedCardsHeader: {
        fontSize: '20px', 
        color: '#003366', 
        marginBottom: '10px',
        fontWeight: 'bold',
    },
    

    cardItem: { 
        background: "#FFFFFF", 
        borderRadius: 12,
        padding: 15,
        border: "1px solid #D0D5FF", // Light blue border
        boxShadow: "0 2px 5px rgba(0,0,0,0.05)", // Subtle shadow for lift
        marginBottom: 15,
    }, 
    cardIcon: { fontSize: 18, marginRight: 8, color: '#3366ff' },
    cardNumber: { fontSize: 18, color: "#030182", fontWeight: '600', display: 'flex', alignItems: 'center' },
    cardName: { color: "#4A5565", fontSize: 14, marginTop: 4 },
    cardExpiry: { color: "#6A7282", fontSize: 12 },

    actions: { 
        display: "flex", 
        justifyContent: "space-between", 
        marginTop: 10,
        paddingTop: 8,
        borderTop: '1px solid #eee'
    },
    deleteButton: { 
        background: "transparent", 
        border: "none", 
        color: "#FB2C36", 
        cursor: "pointer", 
        fontSize: 14 
    },
    defaultButton: { 
        background: "transparent", 
        border: "none", 
        color: "#1674D5", 
        cursor: "pointer", 
        fontSize: 14 
    },
    defaultBadge: { 
        marginLeft: 10, 
        background: "#ffcc33", 
        padding: "2px 6px", 
        borderRadius: 4, 
        color: "#030182", 
        fontSize: 12, 
        fontWeight: '700' 
    },

    addButton: { 
        width: "100%", 
        padding: 12, 
        borderRadius: 10, 
        background: "white", 
        border: "1px dashed #030182", 
        color: "#030182", 
        cursor: "pointer", 
        fontWeight: 'bold',
        marginBottom: 20
    },
    secureNotice: { 
        marginTop: 20, 
        padding: 16, 
        background: "#EFF6FF", 
        border: "1px solid #BEDBFF", 
        borderRadius: 12 
    },
};