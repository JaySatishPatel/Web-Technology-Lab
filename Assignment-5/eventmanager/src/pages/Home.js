import clubs from "../data/clubsData";
import ClubCard from "../components/ClubCard";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div>
      <Navbar />

      <h1>All Clubs</h1>

      {clubs.map((club, index) => (
        <ClubCard key={index} club={club} />
      ))}
    </div>
  );
}

export default Home;