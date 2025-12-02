import React, {useState} from "react";
import mapPlaceholder from "../assets/map-placeholder.jpg";

// Proper Page Wrapper
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

export default function Tracking({setScreen, order}) {
    const restaurantName = "Pizza Paradise";
    const orderId = "100100";
    const eta = "11:00 AM";
    const address = "123 Main St";
    
    const [statusMessage, setStatusMessage] = useState("");
    const [isCancelled, setIsCancelled] = useState(false);
    const [instructions, setInstructions] = useState("");
    const handleSaveInstructions = () => {
        setStatusMessage("Delivery instructions updated");
        setTimeout(() => setStatusMessage(""), 2500);
    };

    const handleCancelOrder = () => {
        const confirm = window.confirm("Are you sure you want to cancel this order?");

        if(!confirm) return;

        setIsCancelled(true);
        setStatusMessage("Order cancelled");
        setTimeout(() => setStatusMessage(""), 2500);
    };

    return (
    <PageWrapper>
      {/* Header */}
      <div style={trackingStyles.header}>
        <button
          onClick={() => setScreen("profile")}
          style={trackingStyles.backBtn}
        >
          ←
        </button>
        <div style={trackingStyles.headerTextBlock}>
          <div style={trackingStyles.headerTitle}>{restaurantName}</div>
          <div style={trackingStyles.headerSubtitle}>
            Order # {orderId}
          </div>
        </div>
        <div style={{ width: 85 }} /> {/* spacer */}
      </div>

      <div style={trackingStyles.body}>
        {isCancelled && (
          <div style={trackingStyles.cancelBanner}>
            This order has been cancelled.
          </div>
        )}

        {/* Status Messages */}
        <div style={trackingStyles.statusCardPrimary}>
          <div style={trackingStyles.statusTitle}>Order Confirmed</div>
          <div style={trackingStyles.statusSubtitle}>
            Restaurant preparing your order
          </div>
        </div>

        <div style={trackingStyles.statusCardPrimary}>
          <div style={trackingStyles.statusTitle}>Driver Found</div>
          <div style={trackingStyles.statusSubtitle}>
            Driver headed to the restaurant
          </div>
        </div>

        {/* Map */}
        <div style={trackingStyles.mapWrapper}>
          <img
            src={mapPlaceholder}
            alt="Map showing driver route"
            style={trackingStyles.mapImage}
          />
        </div>

        {/* Secondary status blocks */}
        <div style={trackingStyles.statusCardSecondary}>
          <div style={trackingStyles.statusTitleDark}>Order Picked Up</div>
          <div style={trackingStyles.statusSubtitleDark}>
            Driver has picked up your order
          </div>
        </div>

        <div style={trackingStyles.statusCardSecondary}>
          <div style={trackingStyles.statusTitleDark}>Headed your way</div>
          <div style={trackingStyles.statusSubtitleDark}>{address}</div>
        </div>

        <div style={trackingStyles.statusCardSecondary}>
          <div style={trackingStyles.statusTitleDark}>
            Estimated delivery time:
          </div>
          <div style={trackingStyles.eta}>{eta}</div>
        </div>

        {/* Delivery instructions */}
        <div style={trackingStyles.instructionsBlock}>
          <label style={trackingStyles.instructionsLabel}>
            Delivery instructions
          </label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            placeholder="e.g., Gate code, call when outside, leave at door…"
            style={trackingStyles.textarea}
          />
          <button
            onClick={handleSaveInstructions}
            style={trackingStyles.saveInstructionsBtn}
          >
            Save Instructions
          </button>
        </div>

        {/* Cancel & Contact buttons */}
        <div style={trackingStyles.actionsRow}>
          <button
            onClick={handleCancelOrder}
            style={trackingStyles.cancelBtn}
            disabled={isCancelled}
          >
            Cancel Order
          </button>
          <button
            onClick={() => alert("Pretend we are calling the driver…")}
            style={trackingStyles.contactBtn}
          >
            Contact Driver
          </button>
        </div>

        {statusMessage && (
          <div style={trackingStyles.toast}>{statusMessage}</div>
        )}
      </div>
    </PageWrapper>
  );
}

const trackingStyles = {
  header: {
    width: "100%",
    backgroundColor: "#030182",
    padding: "16px 8px",
    display: "flex",
    alignItems: "center",
  },
  backBtn: {
    marginLeft: 8,
    background: "transparent",
    border: "none",
    color: "#FFFFFF",
    fontSize: 20,
    cursor: "pointer",
  },
  headerTextBlock: {
    flex: 1,
    textAlign: "center",
    color: "#FFFFFF",
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 700,
  },
  headerSubtitle: {
    fontSize: 12,
    opacity: 0.8,
  },
  body: {
    padding: "16px 16px 24px",
    backgroundColor: "#FFFFFF",
  },
  statusCardPrimary: {
    backgroundColor: "#030182",
    borderRadius: 12,
    padding: "14px 16px",
    marginBottom: 12,
    color: "#FFFFFF",
    textAlign: "center",
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: 700,
  },
  statusSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  mapWrapper: {
    borderRadius: 18,
    overflow: "hidden",
    margin: "8px 0 16px 0",
  },
  mapImage: {
    width: "100%",
    display: "block",
  },
  statusCardSecondary: {
    backgroundColor: "#F5F5F5",
    borderRadius: 12,
    padding: "12px 16px",
    marginBottom: 10,
    textAlign: "center",
  },
  statusTitleDark: {
    fontSize: 15,
    fontWeight: 700,
    color: "#111827",
  },
  statusSubtitleDark: {
    fontSize: 12,
    marginTop: 4,
    color: "#4B5563",
  },
  eta: {
    marginTop: 6,
    fontSize: 20,
    fontWeight: 700,
    color: "#111827",
  },
  instructionsBlock: {
    marginTop: 16,
    marginBottom: 12,
  },
  instructionsLabel: {
    display: "block",
    fontSize: 13,
    marginBottom: 6,
    color: "#374151",
    fontWeight: 600,
  },
  textarea: {
    width: "100%",
    minHeight: 60,
    borderRadius: 8,
    border: "1px solid #D1D5DB",
    padding: 8,
    fontSize: 13,
    resize: "vertical",
    boxSizing: "border-box",
  },
  saveInstructionsBtn: {
    marginTop: 8,
    padding: "8px 12px",
    borderRadius: 999,
    border: "none",
    backgroundColor: "#2563EB",
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  actionsRow: {
    display: "flex",
    gap: 10,
    marginTop: 16,
  },
  cancelBtn: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 999,
    border: "1px solid #DC2626",
    backgroundColor: "#FFFFFF",
    color: "#DC2626",
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
  },
  contactBtn: {
    flex: 1,
    padding: "10px 12px",
    borderRadius: 999,
    border: "none",
    backgroundColor: "#030182",
    color: "#FFFFFF",
    fontWeight: 600,
    fontSize: 13,
    cursor: "pointer",
  },
  cancelBanner: {
    marginBottom: 12,
    padding: "8px 12px",
    borderRadius: 8,
    backgroundColor: "#FEE2E2",
    color: "#B91C1C",
    fontSize: 13,
    textAlign: "center",
  },
  toast: {
    marginTop: 12,
    padding: "6px 10px",
    borderRadius: 999,
    backgroundColor: "#E5F3FF",
    color: "#1D4ED8",
    fontSize: 12,
    textAlign: "center",
  },
};


