import React, { useState } from "react";
import pizzaLogo from "../assets/pizzamyheart.png";
import laVictoriaImg from "../assets/La-Victoria.png";
import janeDoePic from '../assets/JaneDoe.jpg';

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

export default function HomePage({ setScreen, cart }) {
  const [search, setSearch] = useState("");

  const restaurants = [
    {
      name: "Pizza My Heart",
      address: "1 Washington Square, San Jose, CA",
      cuisine: "Pizza, Italian",
      rating: 4.8,
      time: "15–25 min",
      minOrder: "$10 min order",
      img: pizzaLogo,
      id: "pizzamyheart"
    },
    {
      name: "La Victoria Taqueria",
      address: "140 E San Carlos St, San Jose, CA",
      cuisine: "Mexican, Burritos",
      rating: 4.7,
      time: "10–20 min",
      minOrder: "$10 min order",
      img: laVictoriaImg,
      id: "lavictoria"
    }
  ];

  const filtered = restaurants.filter((r) =>
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <PageWrapper>
      {/* HEADER */}
      <div style={styles.header}>
        <button
          onClick={() => setScreen("login")}
          style={styles.logoutBtn}
        >
          Logout
        </button>

        <h2 style={styles.headerText}>Home Page</h2>
        <button
          onClick={() => setScreen("profile")}
          style={styles.profileBtn}
        >
          {}
          <img 
            src={janeDoePic} 
            alt="User Profile" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        </button>
      </div>

      {/* TOP SECTION */}
      <div style={styles.topSection}>
        <div style={{ color: "white", opacity: 0.8 }}>Deliver to</div>
        <div style={{ color: "white", fontSize: 18, fontWeight: 600 }}>
          1 Washington Square, San Jose, CA
        </div>

        <div style={styles.searchWrapper}>
          <span style={styles.searchIcon}>🔍</span>
          <input
            style={styles.searchInput}
            placeholder="Search restaurants…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* RESTAURANTS */}
      <div style={{ paddingBottom: 80, paddingTop: 16 }}>
        {filtered.map((r, i) => (
          <div
            key={i}
            style={styles.card}
            onClick={() => setScreen("menu")}
          >
            <img src={r.img} alt="" style={styles.cardImg} />

            <div style={styles.cardInfo}>
              <div style={styles.cardTitleRow}>
                <strong style={{ color: "#030182", fontSize: 18 }}>
                  {r.name}
                </strong>
                <span style={{ fontSize: 16 }}>⭐ {r.rating}</span>
              </div>

              <div style={styles.cuisine}>{r.cuisine}</div>

              <div style={styles.meta}>
                <span>{r.time}</span>
                <span>{r.minOrder}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CART */}
      <div
        style={styles.cartButton}
        onClick={() => setScreen("cart")}
      >
        🛒 {cart?.length || 0}
      </div>
    </PageWrapper>
  );
}

// Styles

const styles = {
  header: {
  width: "100%",
  background: "#030182",
  padding: "16px 8px",        
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  position: "relative"
}, 

  headerText: {
    margin: 0,
    color: "white",
    fontSize: 20,
    fontWeight: 600,
  },
logoutBtn: {
  background: "transparent",
  border: "1px solid white",
  padding: "4px 8px",
  borderRadius: 8,
  color: "white",
  cursor: "pointer",
  fontSize: 12,
  zIndex: 2                     
},

profileBtn: {
  background: "transparent",
  border: "none",
  borderRadius: "50%",
  padding: 0,
  width: 40,
  height: 40,
  overflow: 'hidden',
  cursor: "pointer",
  marginRight: 15,
  zIndex: 2,
},

  topSection: {
    width: "100%",
    background: "#030182",
    padding: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },

  searchWrapper: {
    position: "relative",
    marginTop: 12,
  },

  searchIcon: {
    position: "absolute",
    top: 10,
    left: 12,
    fontSize: 18,
  },

  searchInput: {
    width: "80%",
    height: 42,
    padding: "8px 12px 8px 40px",
    borderRadius: 10,
    border: "none",
    fontSize: 16,
    outline: "none",
    background: "white",
    color: "black"  
  },

  card: {
    width: "90%",
    margin: "0 auto 24px auto",
    background: "white",
    borderRadius: 16,
    cursor: "pointer",
    boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
  },

  cardImg: {
    width: "100%",
    height: "auto",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  cardInfo: {
    padding: 16,
  },

  cardTitleRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 6,
  },

  cuisine: {
    color: "#4A5565",
    fontSize: 15,
    marginBottom: 6,
  },

  meta: {
    display: "flex",
    justifyContent: "space-between",
    color: "#6A7282",
    fontSize: 14,
  },

  cartButton: {
    position: "fixed",
    bottom: 20,
    right: 20,
    background: "#D1AD38",
    padding: "12px 18px",
    borderRadius: 50,
    cursor: "pointer",
    boxShadow: "0px 3px 8px rgba(0,0,0,0.25)",
    color: "#030182",
    fontWeight: 700,
    fontSize: 18,
  },
};
