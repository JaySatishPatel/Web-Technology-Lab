import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import clubs from "../data/clubsData";
import Navbar from "../components/Navbar";

function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  const event = clubs
    .flatMap((club) => club.events)
    .find((e) => e.id === parseInt(id));

  const club = clubs.find(c => 
    c.events.some(e => e.id === parseInt(id))
  );

  if (!event || !club) {
    return (
      <div style={styles.page}>
        <Navbar />
        <div style={styles.container}>
          <div style={styles.errorMessage}>Event not found</div>
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

  const capacityPercentage = Math.round((event.registered / event.capacity) * 100);
  const isFull = event.registered >= event.capacity;

  return (
    <div style={styles.page}>
      <Navbar />

      <div style={styles.container}>
        <button 
          onClick={() => navigate(`/club/${club.name}`)}
          style={styles.backButton}
        >
          ← Back to {club.name} Club
        </button>

        <div style={{...styles.eventHeader, backgroundColor: club.color}}>
          <div style={styles.headerContent}>
            <div style={styles.titleSection}>
              <h1 style={styles.eventTitle}>{event.title}</h1>
              <div style={styles.badges}>
                <span style={{...styles.badge, backgroundColor: "rgba(255,255,255,0.3)"}}>
                  {event.status.toUpperCase()}
                </span>
                <span style={{...styles.badge, backgroundColor: "rgba(255,255,255,0.3)"}}>
                  {event.category}
                </span>
                <span style={{...styles.badge, backgroundColor: "rgba(255,255,255,0.3)"}}>
                  {event.level}
                </span>
              </div>
            </div>

            <button 
              onClick={() => setIsFavorite(!isFavorite)}
              style={{...styles.favoriteBtn, color: isFavorite ? "#fff" : "rgba(255,255,255,0.7)"}}
            >
              {isFavorite ? "★" : "☆"}
            </button>
          </div>
        </div>

        <div style={styles.contentGrid}>
          <div style={styles.mainContent}>
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>About This Event</h2>
              <p style={styles.description}>{event.description}</p>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Event Details</h2>
              <div style={styles.detailsGrid}>
                <div style={styles.detailCard}>
                  <span style={styles.detailIcon}>📅</span>
                  <div>
                    <div style={styles.detailLabel}>Date</div>
                    <div style={styles.detailValue}>{event.date}</div>
                  </div>
                </div>

                <div style={styles.detailCard}>
                  <span style={styles.detailIcon}>🕐</span>
                  <div>
                    <div style={styles.detailLabel}>Time</div>
                    <div style={styles.detailValue}>{event.time}</div>
                  </div>
                </div>

                <div style={styles.detailCard}>
                  <span style={styles.detailIcon}>⏱️</span>
                  <div>
                    <div style={styles.detailLabel}>Duration</div>
                    <div style={styles.detailValue}>{event.duration}</div>
                  </div>
                </div>

                <div style={styles.detailCard}>
                  <span style={styles.detailIcon}>📍</span>
                  <div>
                    <div style={styles.detailLabel}>Location</div>
                    <div style={styles.detailValue}>{event.location}</div>
                  </div>
                </div>

                <div style={styles.detailCard}>
                  <span style={styles.detailIcon}>👥</span>
                  <div>
                    <div style={styles.detailLabel}>Organizer</div>
                    <div style={styles.detailValue}>{club.name} Club</div>
                  </div>
                </div>

                <div style={styles.detailCard}>
                  <span style={styles.detailIcon}>🎯</span>
                  <div>
                    <div style={styles.detailLabel}>Difficulty</div>
                    <div style={styles.detailValue}>{event.level}</div>
                  </div>
                </div>
              </div>
            </div>

            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Registration Status</h2>
              <div style={styles.registrationBox}>
                <div style={styles.registrationStats}>
                  <div>
                    <div style={styles.registrationLabel}>Registered Participants</div>
                    <div style={styles.registrationNumber}>{event.registered}</div>
                  </div>
                  <div style={styles.divider}>/</div>
                  <div>
                    <div style={styles.registrationLabel}>Total Capacity</div>
                    <div style={styles.registrationNumber}>{event.capacity}</div>
                  </div>
                </div>

                <div style={styles.progressWrapper}>
                  <div style={styles.progressBar}>
                    <div 
                      style={{
                        ...styles.progressFill,
                        width: `${capacityPercentage}%`,
                        backgroundColor: isFull ? "#e74c3c" : "#2ecc71"
                      }}
                    ></div>
                  </div>
                  <div style={styles.progressLabel}>
                    {capacityPercentage}% capacity
                  </div>
                </div>

                <div style={styles.availabilityBox}>
                  {isFull ? (
                    <p style={{color: "#e74c3c"}}>
                      ⚠️ Event is full. No more registrations available.
                    </p>
                  ) : (
                    <p style={{color: "#2ecc71"}}>
                      ✓ {event.capacity - event.registered} slots available
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div style={styles.sidebar}>
            <div style={styles.stickyCard}>
              <div style={{...styles.cardHeader, backgroundColor: club.color}}>
                <h3>Ready to Join?</h3>
              </div>

              <div style={styles.cardBody}>
                <div style={styles.infoItem}>
                  <span>📌 Club</span>
                  <span style={styles.infoValue}>{club.name}</span>
                </div>

                <div style={styles.infoItem}>
                  <span>📊 Status</span>
                  <span style={{
                    ...styles.infoValue,
                    backgroundColor: event.status === 'upcoming' ? '#2ecc71' : '#f39c12',
                    color: 'white',
                    padding: '4px 12px',
                    borderRadius: '4px'
                  }}>
                    {event.status.toUpperCase()}
                  </span>
                </div>

                {!isFull ? (
                  <Link to={`/register/${event.id}`} style={{ textDecoration: 'none' }}>
                    <button style={{...styles.registerBtn, backgroundColor: club.color}}>
                      Register Now
                    </button>
                  </Link>
                ) : (
                  <button style={{...styles.registerBtn, backgroundColor: '#95a5a6', cursor: 'not-allowed'}}>
                    Event Full
                  </button>
                )}

                <button 
                  onClick={() => setIsFavorite(!isFavorite)}
                  style={{...styles.favoriteCardBtn, borderColor: club.color}}
                >
                  {isFavorite ? "★ Added to Favorites" : "☆ Add to Favorites"}
                </button>
              </div>
            </div>
          </div>
        </div>
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
  eventHeader: {
    padding: "40px",
    borderRadius: "12px",
    color: "white",
    marginBottom: "30px",
    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)"
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  titleSection: {
    flex: 1
  },
  eventTitle: {
    fontSize: "2.5em",
    margin: "0 0 15px 0",
    textShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)"
  },
  badges: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap"
  },
  badge: {
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "0.85em",
    fontWeight: "600"
  },
  favoriteBtn: {
    background: "none",
    border: "none",
    fontSize: "2.5em",
    cursor: "pointer",
    padding: "0",
    transition: "all 0.2s ease"
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 320px",
    gap: "20px",
    marginBottom: "30px"
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  section: {
    background: "white",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)"
  },
  sectionTitle: {
    fontSize: "1.3em",
    marginBottom: "15px",
    color: "#333",
    borderBottom: "2px solid #667eea",
    paddingBottom: "10px"
  },
  description: {
    color: "#666",
    fontSize: "1.05em",
    lineHeight: "1.6"
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
    gap: "12px"
  },
  detailCard: {
    display: "flex",
    gap: "12px",
    padding: "12px",
    backgroundColor: "#f8f9fa",
    borderRadius: "8px"
  },
  detailIcon: {
    fontSize: "1.8em"
  },
  detailLabel: {
    size: "0.85em",
    color: "#999"
  },
  detailValue: {
    fontWeight: "600",
    color: "#333"
  },
  registrationBox: {
    backgroundColor: "#f8f9fa",
    padding: "20px",
    borderRadius: "8px"
  },
  registrationStats: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: "20px"
  },
  registrationLabel: {
    fontSize: "0.85em",
    color: "#999"
  },
  registrationNumber: {
    fontSize: "2em",
    fontWeight: "700",
    color: "#333"
  },
  divider: {
    fontSize: "1.5em",
    color: "#ccc"
  },
  progressWrapper: {
    marginBottom: "15px"
  },
  progressBar: {
    width: "100%",
    height: "12px",
    backgroundColor: "#e0e0e0",
    borderRadius: "6px",
    overflow: "hidden",
    marginBottom: "8px"
  },
  progressFill: {
    height: "100%",
    transition: "width 0.3s ease"
  },
  progressLabel: {
    fontSize: "0.9em",
    color: "#666"
  },
  availabilityBox: {
    padding: "10px",
    borderRadius: "6px",
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    textAlign: "center"
  },
  sidebar: {
    height: "fit-content"
  },
  stickyCard: {
    background: "white",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    position: "sticky",
    top: "100px"
  },
  cardHeader: {
    padding: "15px",
    color: "white"
  },
  cardBody: {
    padding: "20px"
  },
  infoItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px",
    padding: "10px 0"
  },
  infoValue: {
    fontWeight: "600"
  },
  registerBtn: {
    width: "100%",
    padding: "12px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1em",
    fontWeight: "600",
    marginBottom: "10px",
    transition: "all 0.3s ease"
  },
  favoriteCardBtn: {
    width: "100%",
    padding: "10px",
    background: "white",
    border: "2px solid",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.95em",
    fontWeight: "600",
    transition: "all 0.3s ease"
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

export default EventDetails;