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


export default function CourierApplication({ setScreen, setCourierStatus }) {
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [error, setError] = useState('');
    const [submissionStatus, setSubmissionStatus] = useState('pending');

    const handleApplySubmit = () => {
        setError('');

        if (!agreedToTerms) {
            // TC 18 Simulation: Fails if Terms not accepted
            setError("You must agree to the Terms & Conditions to apply.");
            return;
        }

        // TC 17 Implementation: Update status to 'Pending'
        setCourierStatus("Pending"); 
        setSubmissionStatus('success');
        
        // Navigate back to the Profile screen to show the new status
        setTimeout(() => setScreen('profile'), 1500);
    };

    if (submissionStatus === 'success') {
        return (
            <PageWrapper>
                <div style={appStyles.successMessage}>
                    <h2>Application Submitted! 📦</h2>
                    <p>Your existing student details have been submitted for verification. Your profile status is now 'Pending Review'.</p>
                </div>
            </PageWrapper>
        );
    }
    
    return (
        <PageWrapper>
            <h2 style={appStyles.header}>Courier Application</h2>
            <p style={appStyles.message}>
                By proceeding, you confirm your current profile details and student ID will be used for courier verification.
            </p>

            {/* Terms and Conditions Checkbox (for TC 18 simulation) */}
            <div style={appStyles.termsContainer}>
                <input
                    type="checkbox"
                    id="terms"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    style={appStyles.checkbox}
                />
                <label htmlFor="terms" style={appStyles.label}>
                    I agree to the Courier Terms & Conditions.
                </label>
            </div>
            
            {error && <p style={appStyles.error}>{error}</p>}

            <button 
                onClick={handleApplySubmit} 
                style={appStyles.submitButton}
            >
                Submit Application
            </button>
            <button 
                onClick={() => setScreen('profile')} 
                style={appStyles.backButton}
            >
                ← Back to Profile
            </button>
        </PageWrapper>
    );
}

const appStyles = {
    header: { fontSize: 24, color: '#030182', textAlign: 'center' },
    message: { fontSize: 14, color: '#4A5565', textAlign: 'center', marginBottom: 20 },
    termsContainer: { display: 'flex', alignItems: 'center', marginBottom: 20 },
    checkbox: { marginRight: 10 },
    label: { fontSize: 14, color: '#333' },
    error: { color: 'red', textAlign: 'center', marginBottom: 15, fontWeight: 'bold' },
    submitButton: { 
        width: '100%', 
        padding: 12, 
        backgroundColor: '#0033cc', 
        color: 'white', 
        border: 'none', 
        borderRadius: 8, 
        marginTop: 20, 
        cursor: 'pointer' 
    },
    backButton: { 
        width: '100%', 
        padding: 12, 
        backgroundColor: '#ccc', 
        color: '#333', 
        border: 'none', 
        borderRadius: 8, 
        marginTop: 10, 
        cursor: 'pointer' 
    },
    successMessage: { textAlign: 'center', padding: 50, color: '#4CAF50' }
};