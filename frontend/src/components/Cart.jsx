import React from "react";

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

// --- Main Cart Component ---

// ACCEPT completeOrder prop
export default function Cart({ setScreen, cart, setCart, selectedRestaurantId, appliedDiscount, completeOrder }) { 

  const updateQty = (index, newQty) => {
    setCart(prev => {
      const updated = [...prev];
       
       const validatedQty = Math.max(1, parseInt(newQty) || 1);
       
      updated[index].qty = validatedQty;
       
      return updated;
    });
  };

  const deleteItem = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  // --- DISCOUNT AND TOTAL CALCULATION ---
  const SUB_TOTAL = cart.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
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


  // SEND ORDER TO BACKEND
  const handleCheckout = async () => {
   
    const userEmail = localStorage.getItem("currentUserEmail"); 
    // Use selectedRestaurantId, or use a mock ID if not set
    const restaurantIdToSend = selectedRestaurantId || 'R101_mock_id'; 

    const res = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail,
        restaurantId: restaurantIdToSend, // Use the robust ID here
        items: cart,
        total: totalDisplay, // Use the calculated FINAL_TOTAL
        discountUsed: appliedDiscount ? appliedDiscount.code : null, // Pass discount info
      }),
    });

    // Create the completed order object for history
    const newOrderId = Math.floor(Math.random() * 100000);
    const today = new Date().toLocaleDateString('en-US', { month: '2-digit', day: '2-digit', year: 'numeric' });
    
    const completedOrder = {
        id: newOrderId,
        date: today,
        total: FINAL_TOTAL,
        restaurant: "Pizza My Heart", // Mocking a restaurant name for history view
        items: cart.map(item => `${item.quantity}x ${item.name}`),
        isFavorite: false 
    };

    if (!res.ok) {
      console.error("Backend failed to process order:", res.status);
    }
    
    // Add order to history
    if (completeOrder) {
        completeOrder(completedOrder);
    }
    
    // Clear cart and show tracking
    setCart([]);
    setScreen("tracking"); 
  };

  return (
    <PageWrapper>

      <div style={{ background: "#030182", padding: 16 }}>
        <button
          onClick={() => setScreen("home")}
          style={{ background: "transparent", border: "none", color: "white", fontSize: 20 }}
        >
          ←
        </button>
        <h2 style={{ color: "white", textAlign: "center", margin: 0 }}>View Cart</h2>
      </div>

      <div style={{ padding: 16 }}>

        {cart.length === 0 && (
          <div style={{ textAlign: "center", marginTop: 40, color: "#4A5565" }}>
            Your cart is empty.
          </div>
        )}

        {cart.map((item, index) => (
          <div key={index} style={{
            background: "white",
            borderRadius: 16,
            padding: 16,
            marginBottom: 12,
            border: "1px solid #e0e0ff"
          }}>
            <div style={{ color: "#030182", fontSize: 18 }}>{item.name}</div>
            <div style={{ color: "#1674D5", fontSize: 16 }}>${item.price.toFixed(2)}</div>

            <div style={{
              marginTop: 10,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <button
                onClick={() => deleteItem(index)}
                style={{ border: "none", background: "transparent", color: "#FB2C36" }}
              >
                Remove
              </button>

              {/* MODIFIED: Quantity input field */}
              <input
                 type="number"
                 min="1"
                 value={item.qty || 1}
                 onChange={(e) => updateQty(index, e.target.value)}
                 style={qtyInputStyle}
              />

              </div>
          </div>
        ))}
        
        {/* PROMOTION BANNER */}
        {appliedDiscount && (
            <div style={discountBannerStyle}>
                <span style={{ marginRight: 8 }}>{appliedDiscount.icon}</span> 
                Coupon **{appliedDiscount.code}** is active!
            </div>
        )}

        {cart.length > 0 && (
          <>
                {/* LINKS ROW (Promotion and Payment) */}
                <div style={linksRowStyle}>
                    {/* Promotion Link */}
                    <button
                        onClick={() => setScreen("promotions")}
                        style={promoLinkStyle}
                    >
                        Apply Promotion →
                    </button>

                    {/* PAYMENT METHOD LINK */}
                    <button
                        onClick={() => setScreen("cardManagement")} // Navigates to Card Management
                        style={paymentLinkStyle}
                    >
                        Change Payment Method →
                    </button>
                </div>
                
            <h3 style={{ color: "#030182", marginTop: 20 }}>Order Summary</h3>

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

              <Row label={<b>Total</b>} value={<b>${totalDisplay}</b>} />
            </div>

            <button
              onClick={handleCheckout}
              style={{
                width: "100%",
                marginTop: 20,
                padding: 12,
                background: "#030182",
                color: "white",
                border: "none",
                borderRadius: 10,
                fontSize: 16,
                cursor: "pointer"
              }}
            >
              Proceed to Checkout • ${totalDisplay}
            </button>
          </>
        )}
        
        {/* Conditional rendering for empty cart */}
        {cart.length === 0 && appliedDiscount && (
            <div style={{ textAlign: 'center', marginTop: 20 }}>
                <p style={{color: '#4A5565'}}>Your cart is empty. Apply a promotion after adding items.</p>
            </div>
        )}

      </div>
    </PageWrapper>
  );
}
// --- Helper Styles ---

const qtyInputStyle = {
    width: '60px',
    padding: '8px 5px',
    borderRadius: '8px',
    border: '1px solid #efebebff',
    textAlign: 'center',
    fontSize: '16px',
    fontWeight: '600',
    color: '#fffff0',
    MozAppearance: 'textfield', // Firefox
    WebkitAppearance: 'none', // Chrome/Safari
    margin: 0, 
    outline: 'none',
};

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

const discountBannerStyle = {
    padding: 12,
    background: "#f0f0ff",
    border: "1px solid #030182",
    color: "#030182",
    borderRadius: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
};

const promoLinkStyle = {
    background: 'transparent',
    border: 'none',
    color: '#1674D5',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    padding: 0,
};

const paymentLinkStyle = {
    background: 'transparent',
    border: 'none',
    color: '#3366ff',
    cursor: 'pointer',
    fontWeight: 600,
    fontSize: 14,
    padding: 0,
};

const linksRowStyle = {
    display: 'flex', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10
};