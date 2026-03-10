import { Link } from "react-router-dom";

function ClubCard({ club }) {
  return (
    <div style={{...styles.card, borderLeftColor: club.color}}>
      <div style={styles.header}>
        <span style={styles.icon}>{club.icon}</span>
        <h2 style={styles.title}>{club.name}</h2>
      </div>

      <p style={styles.description}>{club.description}</p>

      <p style={styles.eventCount}>
        {club.events.length} event{club.events.length !== 1 ? 's' : ''} upcoming
      </p>

      <Link to={`/club/${club.name}`} style={{ textDecoration: 'none' }}>
        <button style={{...styles.button, backgroundColor: club.color}}>
          Explore Events →
        </button>
      </Link>
    </div>
  );
}

const styles = {
  card: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    transition: "all 0.3s ease",
    borderLeft: "5px solid",
    cursor: "pointer"
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    marginBottom: "15px"
  },
  icon: {
    fontSize: "2em"
  },
  title: {
    margin: 0,
    color: "#333",
    fontSize: "1.5em"
  },
  description: {
    color: "#666",
    fontSize: "0.95em",
    marginBottom: "12px"
  },
  eventCount: {
    color: "#999",
    fontSize: "0.85em",
    marginBottom: "15px"
  },
  button: {
    padding: "12px 24px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1em",
    fontWeight: "600",
    width: "100%",
    transition: "all 0.3s ease"
  }
};

export default ClubCard;