import React, { useState } from 'react';

// --- Mock Data: 10 Orders ---
const MOCK_ORDER_HISTORY = [
    { id: 1009, date: "12/02/2025", total: 15.75, restaurant: "Pizza My Heart", items: ["Small Veggie Pizza", "Soda"], isFavorite: true },
    { id: 1008, date: "12/01/2025", total: 22.50, restaurant: "La Victoria Taqueria", items: ["Super Burrito", "Orange Sauce"], isFavorite: false },
    { id: 1007, date: "11/29/2025", total: 30.00, restaurant: "Pizza My Heart", items: ["Large Signature Pie", "Garlic Knots"], isFavorite: true },
    { id: 1006, date: "11/27/2025", total: 18.00, restaurant: "La Victoria Taqueria", items: ["Taco Plate", "Horchata"], isFavorite: false },
    { id: 1005, date: "11/25/2025", total: 12.50, restaurant: "Pizza My Heart", items: ["Pepperoni Slice", "Side Salad"], isFavorite: false },
    { id: 1004, date: "11/22/2025", total: 10.99, restaurant: "La Victoria Taqueria", items: ["Carnitas Taco"], isFavorite: true },
    { id: 1003, date: "11/20/2025", total: 28.50, restaurant: "Pizza My Heart", items: ["Medium Cheese Pizza", "Two Sodas"], isFavorite: false },
    { id: 1002, date: "11/18/2025", total: 16.50, restaurant: "La Victoria Taqueria", items: ["Quesadilla"], isFavorite: false },
    { id: 1001, date: "11/15/2025", total: 32.00, restaurant: "Pizza My Heart", items: ["Large White Pie", "Coke"], isFavorite: true },
    { id: 1000, date: "11/12/2025", total: 14.25, restaurant: "La Victoria Taqueria", items: ["Chips and Guacamole"], isFavorite: false },
];

// --- Component for a single order item ---
const MockOrderItem = ({ order, navigateToCart, setCart, favoriteOrders, setFavoriteOrders }) => {
    
    const isFavorited = favoriteOrders.includes(order.id);

    const handleToggleFavorite = () => {
        if (isFavorited) {
            setFavoriteOrders(prev => prev.filter(id => id !== order.id));
        } else {
            setFavoriteOrders(prev => [...prev, order.id]);
        }
    };

    const handleReorder = () => {
        const newCartItems = order.items.map(itemName => ({
            name: itemName,
            restaurant: order.restaurant,
            // Mock price calculation relies on the total, use a fixed price for simplicity
            price: order.total / order.items.length, 
            quantity: 1,
        }));
        
        setCart(prevCart => [...prevCart, ...newCartItems]);
        alert(`Order #${order.id} duplicated! Added items to cart.`);
        
        if (navigateToCart) {
            setScreen("cart"); // Use setScreen directly
        }
    };

    return (
        <div style={styles.orderItem}>
            
            <div style={styles.orderHeartWrapper}>
                <div style={styles.orderDetails}>
                    <h4 style={styles.orderTitle}>{order.restaurant}<br />Order #{order.id}</h4> 
                    
                    <p style={styles.orderSummary}>
                        <strong>Total:</strong> ${order.total.toFixed(2)} <br /> <strong>Items:</strong> {order.items.join(', ')}
                    </p>
                </div>
                
                <span 
                    onClick={handleToggleFavorite} 
                    style={{ 
                        ...styles.favoriteHeart, 
                        color: isFavorited ? 'red' : 'lightgray' 
                    }}
                    role="img" 
                    aria-label="favorite"
                >
                    &#x2764; 
                </span>
            </div>

            <button 
                onClick={handleReorder} 
                style={styles.reorderButton}
            >
                Reorder
            </button>
        </div>
    );
};


// --- Main Past Orders Component (Conditional Rendering) ---
// ACCEPT orderHistory PROP
const PastOrders = ({ navigateToProfile, setScreen, setCart, favoriteOrders, setFavoriteOrders, orderViewMode, orderHistory }) => {
    
    // Combine live orders (orderHistory) with mock data
    const ALL_ORDERS = [...orderHistory, ...MOCK_ORDER_HISTORY]; 

    const navigateToCart = () => {
        if (setScreen) {
            setScreen("cart");
        }
    };
    
    let listContent;

    if (orderViewMode === 'favorites') {
        // --- FAVORITES VIEW: Filtered and Grouped ---
        
        const favoritedOrders = ALL_ORDERS.filter(order => favoriteOrders.includes(order.id));
        
        const groupedOrders = favoritedOrders.reduce((acc, order) => {
            if (!acc[order.restaurant]) {
                acc[order.restaurant] = [];
            }
            acc[order.restaurant].push(order);
            return acc;
        }, {});

        const restaurantNames = Object.keys(groupedOrders);
        
        if (restaurantNames.length === 0) {
            listContent = (
                <p style={{ textAlign: 'center', padding: '50px' }}>
                    No favorited orders found. Click a heart icon to save one!
                </p>
            );
        } else {
            listContent = restaurantNames.map(restaurant => (
                <div key={restaurant} style={styles.restaurantGroup}>
                    <h3 style={styles.restaurantHeader}>{restaurant}</h3>
                    {groupedOrders[restaurant].map(order => (
                        <MockOrderItem 
                            key={order.id} 
                            order={order} 
                            navigateToCart={navigateToCart}
                            setCart={setCart} 
                            favoriteOrders={favoriteOrders}
                            setFavoriteOrders={setFavoriteOrders} 
                        />
                    ))}
                </div>
            ));
        }

    } else {
        // --- ALL ORDERS VIEW: Simple, unsorted list (Default for "Orders" tab) ---
        listContent = ALL_ORDERS.map(order => (
            <MockOrderItem 
                key={order.id} 
                order={order} 
                navigateToCart={navigateToCart}
                setCart={setCart} 
                favoriteOrders={favoriteOrders}
                setFavoriteOrders={setFavoriteOrders} 
            />
        ));
    }


    return (
        <div style={styles.pageWrapper}>
            <div style={styles.profileCard}> 
                <h2 style={styles.header}>
                    {orderViewMode === 'favorites' ? '❤️ Favorite Orders' : '📜 All Order History'}
                </h2> 
                <p style={styles.subtitle}>
                    {orderViewMode === 'favorites' ? 'Your saved orders, grouped by restaurant.' : 'View all completed orders and reorder quickly.'}
                </p>

                <div style={styles.listContainer}>
                    {listContent} {/* RENDER THE CONDITIONAL CONTENT */}
                </div>

                <div style={styles.finalFooterWrapper}>
                    <button style={styles.finalHomeButton} onClick={navigateToProfile}>
                        <span style={styles.finalButtonArrow}>←</span> Back to Profile
                    </button>
                </div>
            </div>
        </div>
    );
};

const styles = {
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
    },
    orderItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        margin: '10px 0',
        backgroundColor: '#f9f9f9',
        borderRadius: '8px',
        border: '1px solid #ddd',
    },
    orderHeartWrapper: {
        display: 'flex',
        alignItems: 'flex-start',
        flexGrow: 1,
        paddingRight: 15,
    },
    favoriteHeart: {
        fontSize: 24,
        cursor: 'pointer',
        paddingTop: 5,
    },
    orderDetails: {
        flexGrow: 1,
    },
    orderTitle: {
        margin: '0 0 5px 0',
        fontSize: '16px', 
        fontWeight: 'bold',
        color: '#003366', 
    },
    orderSummary: {
        margin: 0,
        fontSize: '14px',
        color: '#666',
    },
    restaurantGroup: {
        padding: '10px 0',
        borderTop: '2px solid #003366', 
        marginTop: '20px',
    },
    restaurantHeader: {
        fontSize: '20px',
        color: '#003366',
        marginBottom: '10px',
        paddingLeft: '5px',
    },
    reorderButton: {
        padding: '8px 15px',
        backgroundColor: '#4CAF50', 
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
        marginLeft: '10px',
    },
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

export default PastOrders;