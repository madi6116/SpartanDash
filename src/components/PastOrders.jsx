// src/components/PastOrders.jsx
import React from 'react';

// --- Mock Data ---
// This simulates retrieving completed orders from the database
const MOCK_ORDER_HISTORY = [
    { id: 900, date: "12/01/2025", total: 18.50, items: ["Spartan Burger", "Large Fries", "Soda"] },
    { id: 899, date: "11/15/2025", total: 25.00, items: ["Two Tacos", "Nachos", "Horchata"] },
    { id: 898, date: "11/01/2025", total: 12.00, items: ["Cobb Salad", "Water"] },
];

// --- Component for a single order item ---
const MockOrderItem = ({ order, navigateToCart }) => {
    
    // Simulates the DuplicateOrder function
    const handleReorder = () => {
        alert(`Order #${order.id} duplicated! Proceeding to the cart with original items: ${order.items.join(', ')}.`);
        // In a real application, this would call setScreen("cart")
        if (navigateToCart) {
            navigateToCart();
        }
    };

    return (
        <div style={styles.orderItem}>
            <div style={styles.orderDetails}>
                <h4 style={styles.orderTitle}>Order #{order.id} | {order.date}</h4>
                <p style={styles.orderSummary}>
                    **Total:** ${order.total.toFixed(2)} | **Items:** {order.items.join(', ')}
                </p>
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


// --- Main Past Orders Component ---
const PastOrders = ({ navigateToProfile, setScreen }) => {
    
    // Helper function to navigate to Cart screen if needed for the demo flow
    const navigateToCart = () => {
        if (setScreen) {
            setScreen("cart");
        }
    };

    return (
        <div style={styles.container}>
            <h2 style={styles.header}>📜 Past Orders History</h2>
            <p style={styles.subtitle}>View your completed orders and reorder quickly!</p>

            <div style={styles.listContainer}>
                {MOCK_ORDER_HISTORY.map(order => (
                    <MockOrderItem 
                        key={order.id} 
                        order={order} 
                        navigateToCart={navigateToCart}
                    />
                ))}
            </div>

            <button 
                onClick={navigateToProfile} 
                style={styles.backButton}
            >
                ⬅️ Back to Profile
            </button>
        </div>
    );
};

export default PastOrders;


// --- Simple Inline Styles ---
const styles = {
    container: {
        padding: '20px',
        maxWidth: '600px',
        margin: 'auto',
        backgroundColor: '#f9f9f9',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
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
    },
    orderItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px',
        margin: '10px 0',
        backgroundColor: 'white',
        borderRadius: '8px',
        border: '1px solid #ddd',
    },
    orderDetails: {
        flexGrow: 1,
    },
    orderTitle: {
        margin: '0 0 5px 0',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    orderSummary: {
        margin: 0,
        fontSize: '14px',
        color: '#666',
    },
    reorderButton: {
        padding: '8px 15px',
        backgroundColor: '#4CAF50', // Green color
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        fontWeight: 'bold',
    },
    backButton: {
        padding: '10px 15px',
        backgroundColor: '#ccc',
        color: 'black',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    }
};