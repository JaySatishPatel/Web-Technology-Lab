import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <h2>Event Manager</h2>

      <div>
        <Link to="/" style={styles.link}>Home</Link>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px",
    background: "#333",
    color: "white"
  },
  link: {
    color: "white",
    textDecoration: "none",
    marginLeft: "10px"
  }
};

export default Navbar;