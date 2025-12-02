import React from "react";

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

export default function Cart({ setScreen, cart, setCart }) {
  // Update quantity (+/-)
  const updateQty = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      updated[index].qty = Math.max(1, updated[index].qty + delta);
      return updated;
    });
  };

  // Delete item
  const deleteItem = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  // Calculations
  const subtotal = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  const delivery = cart.length > 0 ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const total = (subtotal + delivery + tax).toFixed(2);

  return (
    <PageWrapper>
      {/* HEADER */}
      <div style={{ background: "#030182", padding: 16, position: "relative" }}>
        <button
          onClick={() => setScreen("home")}
          style={{ background: "transparent", border: "none", color: "white", fontSize: 20 }}
        >
          ←
        </button>
        <h2 style={{ color: "white", textAlign: "center", margin: 0 }}>View Cart</h2>
      </div>

      <div style={{ padding: 16 }}>
        {/* No Items TEMPORARY UPDATE WHEN MENU IS ADDED*/}
        {cart.length === 0 && (
          <div style={{ textAlign: "center", marginTop: 40, color: "#4A5565" }}>
            Your cart is empty.
          </div>
        )}

        {/* ITEMS */}
        {cart.map((item, index) => (
          <div
            key={index}
            style={{
              background: "white",
              borderRadius: 16,
              padding: 16,
              marginBottom: 12,
              border: "1px solid #e0e0ff"
            }}
          >
            <div style={{ color: "#030182", fontSize: 18 }}>{item.name}</div>
            <div style={{ color: "#4A5565" }}>{item.restaurant}</div>
            <div style={{ color: "#1674D5", fontSize: 16 }}>
              ${item.price.toFixed(2)}
            </div>

            {/* Quantity Controls */}
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

              <div style={{
                display: "flex",
                background: "#F3F4F6",
                padding: "6px 12px",
                borderRadius: 12,
                alignItems: "center",
                gap: 12
              }}>

                <button
                  onClick={() => updateQty(index, -1)}
                  style={qtyBtn}
                >
                  –
                </button>

                <div style={{ fontSize: 16, fontWeight: 600, color: "#030182" }}>
                  {item.qty}
                </div>

                <button
                  onClick={() => updateQty(index, 1)}
                  style={qtyBtn}
                >
                  +
                </button>

              </div>
            </div>
          </div>
        ))}

        {/* SUMMARY */}
        {cart.length > 0 && (
          <>
            <h3 style={{ color: "#030182", marginTop: 20 }}>Order Summary</h3>

            <div style={{
              background: "white",
              padding: 16,
              borderRadius: 16,
              border: "1px solid #e0e0ff"
            }}>
              <Row label="Subtotal" value={`$${subtotal.toFixed(2)}`} />
              <Row label="Delivery Fee" value={`$${delivery.toFixed(2)}`} />
              <Row label="Tax" value={`$${tax.toFixed(2)}`} />

              <div style={{ borderTop: "1px solid #e0e0ff", margin: "12px 0" }} />

              <Row label={<b>Total</b>} value={<b>${total}</b>} />
            </div>

            <button
              onClick={() => setScreen("payment")}
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
              Proceed to Checkout • ${total}
            </button>
          </>
        )}

      </div>
    </PageWrapper>
  );
}

// STYLES
const qtyBtn = {
  width: 28,
  height: 28,
  borderRadius: 8,
  background: "white",
  border: "1px solid #ccc",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontSize: 18,
  color: "#030182",
  cursor: "pointer"
};

const Row = ({ label, value }) => (
  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
    <div style={{ color: "#4A5565" }}>{label}</div>
    <div style={{ color: "#030182" }}>{value}</div>
  </div>
);
