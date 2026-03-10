import { useParams, useNavigate } from "react-router-dom";
import { useState, useMemo } from "react";
import clubs from "../data/clubsData";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";

function ClubPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [sortBy, setSortBy] = useState("date");
  const [filterLevel, setFilterLevel] = useState("all");

  const club = clubs.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );

  const filteredAndSortedEvents = useMemo(() => {
    if (!club) return [];
    
    let filtered = club.events;

    if (filterLevel !== "all") {
      filtered = filtered.filter(event => event.level === filterLevel);
    }

    if (sortBy === "date") {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    } else if (sortBy === "most-registered") {
      filtered.sort((a, b) => b.registered - a.registered);
    } else if (sortBy === "availability") {
      filtered.sort((a, b) => 
        (b.capacity - b.registered) - (a.capacity - a.registered)
      );
    }

    return filtered;
  }, [club, sortBy, filterLevel]);

  if (!club) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.container}>
          <div style={styles.errorMessage}>Club not found</div>
          <button 
            onClick={() => navigate("/")}
            style={styles.backButton}
          >
            ← Back to Home
          </button>
        </div>
      </div>
    );
  }

  const availableLevels = [...new Set(club.events.map(e => e.level))];

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <button 
          onClick={() => navigate("/")}
          style={styles.backButton}
        >
          ← Back to Clubs
        </button>

        <div style={{...styles.pageHeader, borderLeftColor: club.color}}>
          <span style={styles.clubIcon}>{club.icon}</span>
          <h1>{club.name} Club</h1>
          <p>{club.description}</p>
        </div>

        <div style={styles.statsSection}>
          <div style={{...styles.statBox, backgroundColor: club.color}}>
            <div style={styles.statNumber}>{club.events.length}</div>
            <div style={styles.statLabel}>Total Events</div>
          </div>
          <div style={{...styles.statBox, backgroundColor: "#3498db"}}>
            <div style={styles.statNumber}>
              {club.events.reduce((sum, e) => sum + e.registered, 0)}
            </div>
            <div style={styles.statLabel}>Total Registrations</div>
          </div>
          <div style={{...styles.statBox, backgroundColor: "#2ecc71"}}>
            <div style={styles.statNumber}>
              {club.events.reduce((sum, e) => sum + (e.capacity - e.registered), 0)}
            </div>
            <div style={styles.statLabel}>Available Slots</div>
          </div>
        </div>

        <div style={styles.controlsSection}>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={styles.select}
          >
            <option value="date">Sort by Date</option>
            <option value="most-registered">Most Registered</option>
            <option value="availability">Most Available</option>
          </select>

          {availableLevels.length > 1 && (
            <select 
              value={filterLevel}
              onChange={(e) => setFilterLevel(e.target.value)}
              style={styles.select}
            >
              <option value="all">All Levels</option>
              {availableLevels.map(level => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
          )}
        </div>

        {filteredAndSortedEvents.length > 0 ? (
          <div style={styles.eventsList}>
            {filteredAndSortedEvents.map((event) => (
              <EventCard key={event.id} event={event} clubColor={club.color} />
            ))}
          </div>
        ) : (
          <div style={styles.emptyState}>
            <div style={styles.emptyIcon}>📭</div>
            <h2>No events found</h2>
            <p>Try adjusting your filters</p>
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
  backButton: {
    padding: "10px 20px",
    background: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1em",
    fontWeight: "600",
    marginBottom: "20px",
    transition: "all 0.3s ease"
  },
  pageHeader: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    textAlign: "center",
    marginBottom: "30px",
    borderLeft: "6px solid",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)"
  },
  clubIcon: {
    fontSize: "3em",
    display: "block",
    marginBottom: "10px"
  },
  statsSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "15px",
    marginBottom: "30px"
  },
  statBox: {
    padding: "20px",
    borderRadius: "10px",
    color: "white",
    textAlign: "center",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)"
  },
  statNumber: {
    fontSize: "2.5em",
    fontWeight: "700",
    marginBottom: "8px"
  },
  statLabel: {
    fontSize: "0.9em",
    opacity: 0.95
  },
  controlsSection: {
    display: "flex",
    gap: "12px",
    marginBottom: "25px",
    flexWrap: "wrap"
  },
  select: {
    padding: "12px 16px",
    border: "none",
    borderRadius: "8px",
    fontSize: "15px",
    background: "white",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    cursor: "pointer"
  },
  eventsList: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
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
  },
  errorMessage: {
    background: "white",
    padding: "40px",
    borderRadius: "12px",
    textAlign: "center",
    fontSize: "1.2em",
    color: "#e74c3c",
    marginTop: "40px"
  }
};

export default ClubPage;