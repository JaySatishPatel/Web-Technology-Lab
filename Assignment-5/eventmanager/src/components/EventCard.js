import { Link } from "react-router-dom";
import { useState } from "react";

function EventCard({ event, clubColor = "#667eea" }) {
  const [isFavorite, setIsFavorite] = useState(false);

  const handleFavorite = (e) => {
    e.preventDefault();
    setIsFavorite(!isFavorite);
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "upcoming": return "#2ecc71";
      case "ongoing": return "#f39c12";
      case "ended": return "#95a5a6";
      default: return "#667eea";
    }
  };

  const getCapacityPercentage = () => {
    return Math.round((event.registered / event.capacity) * 100);
  };

  return (
    <div style={{...styles.card, borderTopColor: clubColor}}>
      <div style={styles.cardHeader}>
        <div>
          <span style={{...styles.badge, backgroundColor: getStatusColor(event.status)}}>
            {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
          </span>
          <span style={{...styles.badge, backgroundColor: "#667eea", marginLeft: "8px"}}>
            {event.category}
          </span>
        </div>
        <button 
          onClick={handleFavorite}
          style={{...styles.favoriteBtn, color: isFavorite ? "#e74c3c" : "#ccc"}}
        >
          ★
        </button>
      </div>

      <h3 style={styles.title}>{event.title}</h3>
      <p style={styles.description}>{event.description}</p>

      <div style={styles.details}>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>📅</span>
          <span>{event.date}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>🕐</span>
          <span>{event.time}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>📍</span>
          <span>{event.location}</span>
        </div>
        <div style={styles.detailItem}>
          <span style={styles.detailLabel}>⏱️</span>
          <span>{event.duration}</span>
        </div>
      </div>

      <div style={styles.capacitySection}>
        <div style={styles.capacityLabel}>
          <span>Registrations</span>
          <span style={styles.capacityText}>{event.registered}/{event.capacity}</span>
        </div>
        <div style={styles.progressBar}>
          <div 
            style={{...styles.progressFill, width: `${getCapacityPercentage()}%`}}
          ></div>
        </div>
        <small style={styles.slotsText}>{event.capacity - event.registered} slots available</small>
      </div>

      <Link to={`/event/${event.id}`} style={{ textDecoration: 'none', width: '100%' }}>
        <button style={{...styles.button, backgroundColor: clubColor}}>
          View Details
        </button>
      </Link>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    transition: "all 0.3s ease",
    borderTop: "4px solid",
    hover: {
      boxShadow: "0 8px 20px rgba(0, 0, 0, 0.12)"
    }
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "12px"
  },
  badge: {
    display: "inline-block",
    padding: "4px 12px",
    borderRadius: "20px",
    color: "white",
    fontSize: "0.75em",
    fontWeight: "600"
  },
  favoriteBtn: {
    background: "none",
    border: "none",
    fontSize: "1.8em",
    cursor: "pointer",
    padding: "0",
    transition: "all 0.2s ease"
  },
  title: {
    margin: "12px 0",
    color: "#333",
    fontSize: "1.2em"
  },
  description: {
    color: "#666",
    fontSize: "0.9em",
    marginBottom: "15px"
  },
  details: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "15px",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px"
  },
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.85em",
    color: "#555"
  },
  detailLabel: {
    fontSize: "1.1em"
  },
  capacitySection: {
    marginBottom: "15px"
  },
  capacityLabel: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "0.85em",
    color: "#666"
  },
  capacityText: {
    fontWeight: "600",
    color: "#333"
  },
  progressBar: {
    width: "100%",
    height: "8px",
    backgroundColor: "#e0e0e0",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "6px"
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#2ecc71",
    transition: "width 0.3s ease"
  },
  slotsText: {
    color: "#999",
    fontSize: "0.8em"
  },
  button: {
    padding: "10px 16px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95em",
    fontWeight: "600",
    width: "100%",
    transition: "all 0.3s ease"
  }
};

export default EventCard;