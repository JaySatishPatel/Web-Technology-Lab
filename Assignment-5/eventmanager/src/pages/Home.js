import { useState, useMemo } from "react";
import clubs from "../data/clubsData";
import ClubCard from "../components/ClubCard";
import Navbar from "../components/Navbar";

function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");

  const filteredAndSortedClubs = useMemo(() => {
    let filtered = clubs.filter(club =>
      club.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      club.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortBy === "name") {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "events") {
      filtered.sort((a, b) => b.events.length - a.events.length);
    }

    return filtered;
  }, [searchTerm, sortBy]);

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <div style={styles.pageHeader}>
          <h1>🎊 Event Manager</h1>
          <p>Discover and join amazing events from various clubs</p>
        </div>

        <div style={styles.controlsSection}>
          <input
            type="text"
            placeholder="Search clubs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.sortSelect}
          >
            <option value="name">Sort by Name</option>
            <option value="events">Sort by Events Count</option>
          </select>
        </div>

        {filteredAndSortedClubs.length > 0 ? (
          <div style={styles.cardsGrid}>
            {filteredAndSortedClubs.map((club, index) => (
              <ClubCard key={index} club={club} />
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>🔍</div>
            <h2>No clubs found</h2>
            <p>Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px"
  },
  pageHeader: {
    textAlign: "center",
    color: "white",
    marginBottom: "30px",
    marginTop: "20px"
  },
  pageheaderH1: {
    fontSize: "2.5em",
    marginBottom: "10px",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"
  },
  pageHeaderP: {
    fontSize: "1.1em",
    opacity: 0.95
  },
  controlsSection: {
    display: "flex",
    gap: "12px",
    marginBottom: "30px",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  searchInput: {
    padding: "12px 16px",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    minWidth: "300px",
    background: "white",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease"
  },
  sortSelect: {
    padding: "12px 16px",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    background: "white",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    minWidth: "200px"
  },
  cardsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "20px"
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    color: "white"
  },
  emptyIcon: {
    fontSize: "4em",
    marginBottom: "20px"
  }
};

export default Home;