import React, { useState } from "react";
import pizzaLogo from "../assets/pizzamyheart.png";
import veggieLogo from "../assets/veggie.jfif";
import cheeseLogo from "../assets/cheese.jpg";
import pepperoniLogo from "../assets/pepperoni.jpeg";
import garlicKnots from "../assets/garlicKnots.jpg";
import sideSaladLogo from "../assets/sideSalad.jpg"
import superBurritoLogo from "../assets/superBurrito.jpg";
import tacoPlateLogo from "../assets/tacoPlate.jpg";
import tacoLogo from "../assets/taco.jpg";
import quesadillaLogo from "../assets/quesadilla.jpg";
import chipandguacLogo from "../assets/chipandguac.jpg";

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
const SIZES = ["Small", "Medium", "Large"];

const MENUS = {
  pizzamyheart: {
    name: "Pizza My Heart",
    items: [
      { id: 101, name: "Veggie Pizza", price: [6.99, 8.99, 11.99], category: "Pizza", image: veggieLogo },
      { id: 102, name: "Signature Pie", price: [6.99, 8.99, 11.99], category: "Pizza", image: pizzaLogo },
      { id: 103, name: "Cheese Pizza", price: [6.99, 8.99, 11.99], category: "Pizza", image: cheeseLogo },
      { id: 104, name: "Pepperoni Slice", price: 10.99, category: "Pizza", image: pepperoniLogo },
      { id: 105, name: "Garlic Knots", price: 10.99, category: "Side" , image: garlicKnots},
      { id: 106, name: "Side Salad", price: 6.99, category: "Side", image: sideSaladLogo},
      { id: 107, name: "Soda", price: 2.99, category: "Drink" }
    ]
  },
  lavictoria: {
    name: "La Victoria Taqueria",
    items: [
        {id: 202, name: "Super Burrito", price: 11.99, category: "Burrito", image: superBurritoLogo},
        {id: 203, name: "Taco Plate", price: 10.99, category: "Taco", image: tacoPlateLogo},
        {id: 204, name: "Carnitasa Taco", price: 10.99, category: "Taco", image: tacoLogo},
        {id: 205, name: "Quesadilla", price: 12.99, category: "Quesadilla", image: quesadillaLogo},
        {id: 202, name: "Chips and Guac", price: 5.99, category: "Side", image: chipandguacLogo},
    ]
  },
};

const MenuItemCard = ({ item, setCart, navigateToCart }) => {
  const displayTitle = item.name; // after normalizing data
  
  const isPricedBySize = Array.isArray(item.price);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  const finalPrice = isPricedBySize
    ? item.price[selectedSizeIndex]
    : item.price;

  const finalSize = isPricedBySize ? SIZES[selectedSizeIndex] : "";

  const handleAddToCart = () => {
    const cartItem = {
      name: displayTitle,
      price: finalPrice,
      size: finalSize,
      quantity: 1,
      image: item.image
    };
    setCart(prevCart => [...prevCart, cartItem]);
    alert(`Added ${displayTitle} to cart.`);

    if (navigateToCart) {
      navigateToCart();
    }
  };

  return (
    <div style={styles.card}>
      {item.image && (
        <div style={styles.imageContainer}>
          <img src={item.image} alt={displayTitle} style={styles.image} />
        </div>
      )}

      <div style={styles.content}>
        <h2 style={styles.title}>{displayTitle}</h2>

        {isPricedBySize && (
          <div style={styles.sizeContainer}>
            {SIZES.map((size, index) => (
              <button
                key={size}
                onClick={() => setSelectedSizeIndex(index)}
                style={{
                  ...styles.sizeBtn,
                  ...(selectedSizeIndex === index
                    ? styles.sizeBtnSelected
                    : {})
                }}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        <div style={styles.actionRow}>
          <button onClick={handleAddToCart} style={styles.addBtn}>
            Add to cart ${finalPrice.toFixed(2)} <span>&rarr;</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default function MenuPage({ setScreen, restaurantId, setCart }) {
  const [search, setSearch] = useState("");
  const restaurantData = MENUS[restaurantId];

  if (!restaurantData) {
    return (
      <div style={{ padding: "20px" }}>
        <button onClick={() => setScreen("home")}>Back to Home</button>
        <h2>Restaurant not found or loading...</h2>
      </div>
    );
  }

  const filteredItems = restaurantData.items.filter(item => {
    const name = item.name ?? "";
    return name.toLowerCase().includes(search.toLowerCase());
  });

    return (
    <PageWrapper>
      {/* Blue header INSIDE the phone card, same width as HomePage */}
      <div style={menuStyles.header}>
        <button
          onClick={() => setScreen("home")}
          style={menuStyles.backIcon}
        >
          ←
        </button>
        <span style={menuStyles.headerTitle}>{restaurantData.name}</span>
        <div style={{ width: 32 }} /> {/* spacer to balance the back icon */}
      </div>

      {/* White content area with Menu row + Filters + search + cards */}
      <div style={menuStyles.content}>
        {/* Menu + Filters row */}
        <div style={menuStyles.menuHeaderRow}>
          <h2 style={menuStyles.menuTitle}>Menu</h2>
        </div>

        {/* Search bar */}
        <input
          type="text"
          placeholder={`Search ${restaurantData.name}'s menu...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={menuStyles.searchBar}
        />

        {/* Cards list */}
        <div style={menuStyles.list}>
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              setCart={setCart}
            />
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}

const styles = {
  card: {
    display: "flex",
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    overflow: "hidden",
    border: "1px solid #D0D5FF",     // light blue border
    marginBottom: 12,
    fontFamily: "sans-serif",
    width: "100%",                   // full width in the list
    boxSizing: "border-box",
  },
  imageContainer: {
    width: 110,
    height: 90,
    flexShrink: 0,
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },
  content: {
    flex: 1,
    padding: 10,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: "#F7F7F7",
  },
  title: {
    margin: "0 0 6px 0",
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
  },
  sizeContainer: {
    display: "flex",
    gap: 8,
    marginBottom: 8,
  },
  sizeBtn: {
    flex: 1,
    padding: "4px 0",
    borderRadius: 6,
    border: "1px solid #DDD",
    backgroundColor: "#FFFFFF",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 500,
    color: "#333",
  },
  sizeBtnSelected: {
    border: "1px solid #4F46E5",
    backgroundColor: "#E0E7FF",
  },
  actionRow: {
    display: "flex",
    justifyContent: "flex-end",
  },
  addBtn: {
    borderRadius: 999,
    border: "none",
    padding: "6px 14px",
    cursor: "pointer",
    fontSize: 12,
    fontWeight: 600,
    backgroundColor: "#FFFFFF",
    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
    color: "#030182",
  },
};



const menuStyles = {
  // blue bar at top, same width as HomePage header
  header: {
    width: "100%",
    background: "#030182",
    padding: "16px 8px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backIcon: {
    marginLeft: 8,
    background: "transparent",
    border: "none",
    color: "#FFFFFF",
    fontSize: 20,
    cursor: "pointer",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    margin: 0,
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: 600,
  },

  // everything below the blue header
  content: {
    padding: "16px 12px 24px",
    boxSizing: "border-box",
    backgroundColor: "#FFFFFF",
  },

  menuHeaderRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  menuTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: 700,
  },
  filterBtn: {
    padding: "6px 12px",
    fontSize: 12,
    borderRadius: 999,
    border: "none",
    backgroundColor: "#2563EB",
    color: "#FFFFFF",
    cursor: "pointer",
  },
  searchBar: {
    width: "100%",
    padding: 8,
    borderRadius: 8,
    border: "1px solid #DDD",
    marginBottom: 12,
    fontSize: 13,
    boxSizing: "border-box",
    backgroundColor: "#F5F5F5",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
};

