import React, { useState } from "react";

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
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
    }}>
      {children}
    </div>
  </div>
);

export default function Payment({ setScreen }) {
  const [cards, setCards] = useState([
    { last4: "4532", name: "John Doe", exp: "12/25", default: true },
    { last4: "8765", name: "John Doe", exp: "08/26", default: false }
  ]);

  const setAsDefault = index => {
    setCards(prev =>
      prev.map((c, i) => ({ ...c, default: i === index }))
    );
  };

  const deleteCard = index => {
    setCards(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <PageWrapper>
      {/* Header */}
      <div style={{ background: "#030182", padding: 16 }}>
        <button
          onClick={() => setScreen("cart")}
          style={{
            background: "transparent",
            color: "white",
            border: "none",
            fontSize: 20
          }}
        >
          ←
        </button>
        <h2 style={{ color: "white", margin: 0, textAlign: "center" }}>
          Payment Methods
        </h2>
      </div>

      <div style={{ padding: 16 }}>
        <h3 style={{ color: "#030182" }}>Saved Cards</h3>

        {cards.map((card, i) => (
          <div
            key={i}
            style={{
              background: "white",
              borderRadius: 16,
              padding: 16,
              border: "1px solid #E0E0FF",
              marginBottom: 12
            }}
          >
            <div style={{ fontSize: 18, color: "#030182" }}>
              **** **** **** {card.last4}
              {card.default && (
                <span style={{
                  marginLeft: 10,
                  background: "#D1AD38",
                  padding: "2px 6px",
                  borderRadius: 4,
                  color: "#030182",
                  fontSize: 12
                }}>
                  Default
                </span>
              )}
            </div>

            <div style={{ color: "#4A5565" }}>{card.name}</div>
            <div style={{ color: "#6A7282", fontSize: 12 }}>
              Expires {card.exp}
            </div>

            <div style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 8
            }}>
              <button
                onClick={() => deleteCard(i)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "#FB2C36",
                  cursor: "pointer"
                }}
              >
                Delete
              </button>

              {!card.default && (
                <button
                  onClick={() => setAsDefault(i)}
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#1674D5",
                    cursor: "pointer"
                  }}
                >
                  Set as default
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Add New Card */}
        <button
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 10,
            background: "white",
            border: "1px solid #E0E0FF",
            color: "#030182",
            cursor: "pointer"
          }}
        >
          + Add New Card
        </button>

        {/* Secure Notice */}
        <div style={{
          marginTop: 20,
          padding: 16,
          background: "#EFF6FF",
          border: "1px solid #BEDBFF",
          borderRadius: 12
        }}>
          <b style={{ color: "#030182" }}>
            Your payment information is secure
          </b>
          <p style={{ marginTop: 6, color: "#4A5565", fontSize: 12 }}>
            We use industry-standard encryption to protect your payment details.
          </p>
        </div>
      </div>
    </PageWrapper>
  );
}
