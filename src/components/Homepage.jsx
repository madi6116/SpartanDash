import React, { useState } from "react";
import pizzaLogo from "../assets/pizzamyheart.png";


export default function HomePage({ setScreen }) {
  const [search, setSearch] = useState("");

  const restaurant = {
    name: "Pizza My Heart",
    address: "1 Washington Square, San Jose, CA",
    cuisine: "Pizza, Italian",
    rating: 4.8,
    time: "15-25 min",
    minOrder: "$10 min order",
    img: pizzaLogo
  };

  const showRestaurant = restaurant.name
    .toLowerCase()
    .includes(search.toLowerCase());

  return (
    <div style={styles.fullScreenCenter}>
      {/* This is the centered card */}
      <div style={styles.pageCard}>

        {/* HEADER */}
        <div style={styles.header}>
          <h2 style={styles.headerText}>Home Page</h2>
        </div>

        {/* DELIVERY + SEARCH */}
        <div style={styles.topSection}>
          <div style={{ color: "white", opacity: 0.8 }}>Deliver to</div>
          <div style={{ color: "white", fontSize: 18, fontWeight: 600 }}>
            {restaurant.address}
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

        {/* RESTAURANT CARD */}
        {showRestaurant && (
          <div
            style={styles.card}
            onClick={() => setScreen("menu")}
          >
            <img src={restaurant.img} alt="" style={styles.cardImg} />

            <div style={styles.cardInfo}>
              <div style={styles.cardTitleRow}>
                <strong style={{ color: "#030182", fontSize: 18 }}>
                  {restaurant.name}
                </strong>
                <span style={{ fontSize: 16 }}>⭐ {restaurant.rating}</span>
              </div>

              <div style={styles.cuisine}>{restaurant.cuisine}</div>

              <div style={styles.meta}>
                <span>{restaurant.time}</span>
                <span>{restaurant.minOrder}</span>
              </div>
            </div>
          </div>
        )}

        {/* CART BUTTON */}
        <div
          style={styles.cartButton}
          onClick={() => setScreen("cart")}
        >
          🛒 Cart
        </div>

      </div>
    </div>
  );
}

/* ------------------ BULLETPROOF CENTERING STYLES ------------------ */
const styles = {
  fullScreenCenter: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#F5F5F5",
    overflow: "auto", // ensures content scrolls on small screens
    padding: 20,
  },

  pageCard: {
    width: "100%",
    maxWidth: 600,      // keeps it nicely centered
    background: "white",
    borderRadius: 16,
    overflow: "hidden",
    minHeight: "80vh",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)"
  },

  header: {
    width: "100%",
    background: "#030182",
    padding: "16px 0",
    textAlign: "center"
  },

  headerText: {
    margin: 0,
    color: "white",
    fontSize: 22,
    fontWeight: 600
  },

  topSection: {
    width: "100%",
    background: "#030182",
    padding: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 20,
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
    width: "100%",
    height: 42,
    padding: "8px 12px 8px 40px",
    borderRadius: 10,
    border: "none",
    fontSize: 16,
    outline: "none",
  },

  card: {
    width: "90%",
    margin: "0 auto 24px auto",
    background: "white",
    borderRadius: 16,
    boxShadow: "0px 2px 6px rgba(0,0,0,0.15)",
    cursor: "pointer",
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
    fontWeight: 700,
    fontSize: 18,
    cursor: "pointer",
    color: "#030182",
    boxShadow: "0px 3px 8px rgba(0,0,0,0.25)",
  }
};
