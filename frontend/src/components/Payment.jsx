import React, { useState } from "react";

// --- Helper Components ---

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

const Row = ({ label, value }) => (
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8
  }}>
    <div style={{ color: "#4A5565" }}>{label}</div>
    <div style={{ color: "#030182" }}>{value}</div>
  </div>
);

const secureButtonStyle = {
    width: "100%",
    marginTop: 20,
    padding: 12,
    background: "#4CAF50", // Green button for final action
    color: "white",
    border: "none",
    borderRadius: 10,
    fontSize: 18,
    fontWeight: 600,
    cursor: "pointer"
};

// --- Main Payment Component ---

// ACCEPT cart and appliedDiscount props here
export default function Payment({ setScreen, returnScreen, cart, appliedDiscount }) {
    
    // --- DISCOUNT AND TOTAL CALCULATION ---
    const SUB_TOTAL = cart.reduce((sum, i) => sum + (i.price || 0) * (i.qty || 1), 0);
    const TAX_RATE = 0.08; 
    const BASE_DELIVERY_FEE = 5.99;
    
    let discountAmount = 0;
    let finalDeliveryFee = BASE_DELIVERY_FEE;
    
    if (appliedDiscount) {
        if (appliedDiscount.type === 'percent') {
            // SJSU25OFF: Apply 25% off (Max $10)
            const calculatedDiscount = SUB_TOTAL * appliedDiscount.value;
            discountAmount = Math.min(calculatedDiscount, appliedDiscount.maxDiscount || Infinity);
            
        } else if (appliedDiscount.type === 'shipping') {
            // FREESHIP25: Apply Free Shipping if subtotal is $25+
            if (SUB_TOTAL >= appliedDiscount.minOrder) {
                finalDeliveryFee = 0.00;
            }
        }
    }

    const TAX = (SUB_TOTAL - discountAmount) * TAX_RATE;
    const FINAL_TOTAL = (SUB_TOTAL - discountAmount + finalDeliveryFee + TAX);
    const totalDisplay = FINAL_TOTAL.toFixed(2);

    // --- STATE & HANDLERS ---
   
    const [selectedCard, setSelectedCard] = useState("4532"); 

    const handlePlaceOrder = () => {
        if (cart.length === 0) {
            alert("Your cart is empty. Cannot place order.");
            return;
        }
        
        alert(`Order placed successfully! Total: $${totalDisplay}`);
        // Mock API call success and navigate to Tracking
        setScreen("tracking"); 
    };

    return (
        <PageWrapper>
            {/* Header */}
            <div style={{ background: "#030182", padding: 16, position: "relative" }}>
                <button
                  onClick={() => setScreen("cart")} // Navigate back to Cart
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
                  Checkout & Payment
                </h2>
            </div>

            <div style={{ padding: 16 }}>
                <h3 style={{ color: "#030182" }}>1. Payment Method</h3>
                
                {/* Selected Card Display */}
                <div style={{ 
                    padding: 16, 
                    border: "2px solid #030182", 
                    borderRadius: 12, 
                    marginBottom: 20 
                }}>
                    <div style={{ fontSize: 16, fontWeight: 'bold' }}>
                        Credit Card ending in {selectedCard}
                    </div>
                    <button 
                        onClick={() => setScreen("profile")}
                        style={{ background: "transparent", border: "none", color: "#1674D5", cursor: "pointer", fontSize: 14 }}
                    >
                        Change Payment Method
                    </button>
                </div>

                <h3 style={{ color: "#030182" }}>2. Order Summary</h3>

                {/* Order Summary Totals */}
                <div style={{
                    background: "white",
                    padding: 16,
                    borderRadius: 16,
                    border: "1px solid #e0e0ff"
                }}>
                    <Row label="Subtotal" value={`$${SUB_TOTAL.toFixed(2)}`} />
                    
                    {/* DISCOUNT ROW */}
                    {discountAmount > 0 && (
                        <Row 
                            label={<span style={{ fontWeight: 600 }}>Discount ({appliedDiscount.code})</span>} 
                            value={<span style={{ color: "#FB2C36", fontWeight: 600 }}>—${discountAmount.toFixed(2)}</span>} 
                        />
                    )}

                    <Row label="Delivery Fee" value={finalDeliveryFee === 0.00 ? <span style={{ color: "#4CAF50", fontWeight: 600 }}>FREE!</span> : `$${finalDeliveryFee.toFixed(2)}`} />
                    <Row label="Tax (8%)" value={`$${TAX.toFixed(2)}`} />

                    <div style={{ borderTop: "1px solid #e0e0ff", margin: "12px 0" }} />

                    <Row label={<b>Final Total</b>} value={<b>${totalDisplay}</b>} />
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  style={secureButtonStyle}
                >
                  Place Order • ${totalDisplay}
                </button>
            </div>
        </PageWrapper>
    );
}