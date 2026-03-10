const clubs = [
  {
    name: "Ruby",
    description: "Tech & Programming Club",
    color: "#e74c3c",
    icon: "💻",
    events: [
      { 
        id: 1, 
        title: "Coding Contest", 
        description: "Competitive coding event with prize money.",
        category: "Competition",
        date: "2026-03-25",
        time: "10:00 AM",
        location: "Computer Lab A",
        capacity: 50,
        registered: 32,
        duration: "4 hours",
        level: "Intermediate",
        status: "upcoming"
      },
      { 
        id: 2, 
        title: "Hackathon", 
        description: "24 hour coding challenge to build innovative projects.",
        category: "Hackathon",
        date: "2026-04-10",
        time: "9:00 AM",
        location: "Main Auditorium",
        capacity: 100,
        registered: 76,
        duration: "24 hours",
        level: "All",
        status: "upcoming"
      }
    ]
  },
  {
    name: "Sapphire",
    description: "Debate & Discussion Forum",
    color: "#3498db",
    icon: "🎤",
    events: [
      { 
        id: 3, 
        title: "Debate Competition", 
        description: "Debate on emerging technology trends and their impact.",
        category: "Debate",
        date: "2026-03-20",
        time: "2:00 PM",
        location: "Seminar Hall",
        capacity: 40,
        registered: 28,
        duration: "3 hours",
        level: "Beginner",
        status: "upcoming"
      }
    ]
  },
  {
    name: "Emerald",
    description: "Dance & Performing Arts",
    color: "#2ecc71",
    icon: "💃",
    events: [
      { 
        id: 4, 
        title: "Dance Battle", 
        description: "Inter college dance competition with various categories.",
        category: "Performance",
        date: "2026-03-28",
        time: "6:00 PM",
        location: "Open Auditorium",
        capacity: 200,
        registered: 85,
        duration: "3 hours",
        level: "All",
        status: "upcoming"
      }
    ]
  },
  {
    name: "Topez",
    description: "Photography & Visual Arts",
    color: "#f39c12",
    icon: "📷",
    events: [
      { 
        id: 5, 
        title: "Photography Contest", 
        description: "Capture the best moments. Win amazing prizes!",
        category: "Contest",
        date: "2026-04-05",
        time: "12:00 PM",
        location: "Canvas Gallery",
        capacity: 60,
        registered: 42,
        duration: "2 hours",
        level: "All",
        status: "upcoming"
      }
    ]
  }
];

export default clubs;