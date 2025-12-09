// C:\Users\charl\Desktop\SpartanDash\frontend\src\components\ReviewAndTip.jsx

import React, { useState } from 'react';

// Reusing PageWrapper for consistent layout
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
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
      padding: 30,
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {children}
    </div>
  </div>
);


export default function ReviewAndTip({ setScreen }) {
    const [tip, setTip] = useState(3.00); // Default tip
    const [rating, setRating] = useState(5); // Default rating
    const [status, setStatus] = useState('');

    const handleRating = (value) => {
        setRating(value);
    };

    const handleSubmit = () => {
        // System records rating (FR 10.1) and processes tip amount (FR 10.2).
        console.log(`Submitting Review: Rating ${rating} stars, Tip $${tip.toFixed(2)}`);
        
        setStatus('Thank you! Review submitted successfully.');

        // Navigate back to the home screen after a delay
        setTimeout(() => {
            setScreen("home");
        }, 1500);
    };

    return (
        <PageWrapper>
            <h2 style={styles.header}>Delivery Complete!</h2>
            <p style={styles.subtitle}>Rate your experience and leave a tip for your driver.</p>

            {/* Rating Section (FR 10.1) */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Rate the Delivery</h3>
                <div style={styles.ratingContainer}>
                    {[1, 2, 3, 4, 5].map((star) => (
                        <span
                            key={star}
                            onClick={() => handleRating(star)}
                            style={{ 
                                ...styles.star, 
                                color: star <= rating ? '#ffcc33' : '#ccc' 
                            }}
                        >
                            ★
                        </span>
                    ))}
                </div>
            </div>

            {/* Tip Section (FR 10.2) */}
            <div style={styles.section}>
                <h3 style={styles.sectionTitle}>Add Tip Amount</h3>
                <div style={styles.inputGroup}>
                    <span style={styles.currency}>$</span>
                    <input
                        type="number"
                        min="0"
                        step="0.01"
                        value={tip.toFixed(2)}
                        onChange={(e) => setTip(parseFloat(e.target.value) || 0)}
                        style={styles.tipInput}
                    />
                </div>
                <p style={styles.tipMessage}>Suggested tip: $3.00 (15%)</p>
            </div>
            
            {status && <div style={styles.statusToast}>{status}</div>}

            <button onClick={handleSubmit} style={styles.submitButton}>
                Submit Review & Tip
            </button>
        </PageWrapper>
    );
}

const styles = {
    header: { color: '#030182', textAlign: 'center', fontSize: 24, marginBottom: 10 },
    subtitle: { color: '#4A5565', textAlign: 'center', marginBottom: 30, fontSize: 14 },
    section: { marginBottom: 30, padding: 15, border: '1px solid #eee', borderRadius: 10 },
    sectionTitle: { color: '#030182', fontSize: 16, marginBottom: 15 },
    
    // Rating Styles
    ratingContainer: { display: 'flex', justifyContent: 'space-around', fontSize: 40 },
    star: { cursor: 'pointer', transition: 'color 0.2s' },
    
    // Tip Styles
    inputGroup: { 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        marginBottom: 10 
    },
    currency: { 
        fontSize: 30, 
        marginRight: 5, 
        color: '#030182', 
        fontWeight: 'bold' 
    },
    tipInput: {
        width: 120,
        padding: 10,
        fontSize: 30,
        textAlign: 'center',
        border: '1px solid #ccc',
        borderRadius: 8,
        outline: 'none',
    },
    tipMessage: { textAlign: 'center', color: '#4A5565', fontSize: 12, margin: 0 },
    
    // Submission Styles
    submitButton: {
        width: '100%', 
        padding: 15, 
        background: '#030182', 
        color: 'white', 
        border: 'none', 
        borderRadius: 8,
        cursor: 'pointer',
        fontWeight: 'bold',
        marginTop: 'auto',
    },
    statusToast: {
        padding: 10,
        backgroundColor: '#D4EDDA',
        color: '#155724',
        borderRadius: 8,
        textAlign: 'center',
        marginBottom: 20,
    }
};