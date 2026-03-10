import { Link } from "react-router-dom";

function ClubCard({ club }) {
  return (
    <div style={styles.card}>
      <h2>{club.name} Club</h2>

      <Link to={`/club/${club.name}`}>
        <button style={styles.button}>Explore Events</button>
      </Link>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "20px",
    margin: "15px",
    borderRadius: "8px",
    width: "200px",
    textAlign: "center"
  },
  button: {
    padding: "8px 12px",
    background: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default ClubCard;