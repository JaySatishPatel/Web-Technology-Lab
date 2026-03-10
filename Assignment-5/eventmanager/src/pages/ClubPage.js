import { useParams } from "react-router-dom";
import clubs from "../data/clubsData";
import EventCard from "../components/EventCard";
import Navbar from "../components/Navbar";

function ClubPage() {
  const { name } = useParams();

  const club = clubs.find(
    (c) => c.name.toLowerCase() === name.toLowerCase()
  );

  return (
    <div>
      <Navbar />

      <h1>{club.name} Club Events</h1>

      {club.events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default ClubPage;