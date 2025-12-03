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

export default function Cart({ setScreen, cart, setCart, selectedRestaurantId }) {

  const updateQty = (index, delta) => {
    setCart(prev => {
      const updated = [...prev];
      updated[index].qty = Math.max(1, (updated[index].qty || 1) + delta);
      return updated;
    });
  };

  const deleteItem = (index) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const subtotal = cart.reduce((sum, i) => sum + i.price * (i.qty || 1), 0);
  const delivery = cart.length ? 5.99 : 0;
  const tax = subtotal * 0.08;
  const total = (subtotal + delivery + tax).toFixed(2);


  // SEND ORDER TO BACKEND
  const handleCheckout = async () => {
    const userEmail = localStorage.getItem("email");

    const res = await fetch("http://localhost:5000/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userEmail,
        restaurantId: selectedRestaurantId,
        items: cart,
        total,
      }),
    });

    if (!res.ok) {
      return alert("Error placing order.");
    }

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
            <div style={{ color: "#1674D5", fontSize: 16 }}>${item.price}</div>

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

                <button onClick={() => updateQty(index, -1)} style={qtyBtn}>–</button>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#030182" }}>
                  {item.qty || 1}
                </div>
                <button onClick={() => updateQty(index, 1)} style={qtyBtn}>+</button>

              </div>
            </div>
          </div>
        ))}

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
              Proceed to Checkout • ${total}
            </button>
          </>
        )}

      </div>
    </PageWrapper>
  );
}

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
  <div style={{
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 8
  }}>
    <div style={{ color: "#4A5565" }}>{label}</div>
    <div style={{ color: "#030182" }}>{value}</div>
  </div>
);
