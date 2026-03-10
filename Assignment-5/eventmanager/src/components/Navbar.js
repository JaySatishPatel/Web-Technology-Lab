import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav style={styles.nav}>
      <div style={styles.navContent}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoIcon}>🎉</span>
          Event Manager
        </Link>

        <div style={styles.navLinks}>
          <Link to="/" style={styles.link}>
            Home
          </Link>
          <Link to="/favorites" style={styles.link}>
            ⭐ Favorites
          </Link>
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    padding: "0",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    position: "sticky",
    top: 0,
    zIndex: 100
  },
  navContent: {
    maxWidth: "1200px",
    margin: "0 auto",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 20px"
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "1.4em",
    fontWeight: "700",
    color: "white",
    textDecoration: "none",
    transition: "transform 0.3s ease"
  },
  logoIcon: {
    fontSize: "1.5em"
  },
  navLinks: {
    display: "flex",
    gap: "20px",
    alignItems: "center"
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontSize: "1em",
    fontWeight: "500",
    transition: "opacity 0.3s ease",
    padding: "8px 12px",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default Navbar;