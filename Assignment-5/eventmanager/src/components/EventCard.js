import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div style={styles.card}>
      <h3>{event.title}</h3>

      <p>{event.description}</p>

      <Link to={`/event/${event.id}`}>
        <button style={styles.button}>View Details</button>
      </Link>
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ccc",
    padding: "15px",
    margin: "10px",
    borderRadius: "8px"
  },
  button: {
    padding: "8px 12px",
    background: "green",
    color: "white",
    border: "none",
    cursor: "pointer"
  }
};

export default EventCard;