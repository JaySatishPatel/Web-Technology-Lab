import { useParams, Link } from "react-router-dom";
import clubs from "../data/clubsData";

function EventDetails() {
  const { id } = useParams();

  const event = clubs
    .flatMap((club) => club.events)
    .find((e) => e.id === parseInt(id));

  return (
    <div>
      <h2>{event.title}</h2>
      <p>{event.description}</p>

      <Link to={`/register/${event.id}`}>
        <button>Register</button>
      </Link>
    </div>
  );
}

export default EventDetails;