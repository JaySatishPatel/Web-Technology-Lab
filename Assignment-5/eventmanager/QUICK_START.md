# 🚀 Event Manager - Quick Start Guide

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Installation & Running

1. **Navigate to project directory**
   ```bash
   cd Assignment-5/eventmanager
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   - Automatically opens at http://localhost:3000
   - Or manually navigate to http://localhost:3000

---

## 🎯 How to Use the App

### Home Page
✅ **Explore All Clubs**
- See all clubs displayed as attractive cards
- Each club shows its icon, name, and description
- View number of upcoming events for each club

✅ **Search Clubs**
- Use the search bar at the top to find clubs by name or description
- Search updates results in real-time

✅ **Sort Clubs**
- Sort by name (A-Z)
- Sort by number of events

### Club Page
✅ **View Club Events**
- Click "Explore Events" on any club card
- See statistics: total events, registrations, available slots

✅ **Sort Events**
- **By Date**: Shows upcoming events in chronological order
- **Most Registered**: Popular events first
- **Most Available**: Events with most open slots

✅ **Filter by Level**
- Filter events by difficulty level (Beginner/Intermediate/All)

✅ **Event Information**
- See date, time, location, and duration
- View capacity and registration status
- Visual progress bar showing registration percentage

### Event Details Page
✅ **Complete Event Information**
- Large hero section with event name and status
- Category and difficulty level badges
- Full event description

✅ **Event Specifics**
- Date and time information
- Location details
- Duration and difficulty level
- Organizer (club) name
- Registration statistics with progress bar

✅ **Registration Options**
- View available slots
- See warnings if event is full
- Sticky sidebar with quick registration button
- Add to favorites option

### Registration Page
✅ **Fill Registration Form**
- Full Name: Your complete name
- Roll Number: Your college roll number
- Class: Your year/class
- Department: Your department
- Email: Valid email address
- Phone: 10-digit phone number

✅ **Form Validation**
- All fields required (marked with *)
- Email validation ensures valid format
- Phone number must be 10 digits
- Real-time error messages below each field
- Form shows event summary for reference

✅ **Submit Registration**
- Click "Complete Registration" to submit
- Success message confirms registration
- Automatic redirect to home page

---

## 📊 Key Features Explained

### Search & Filter
- **Search**: Type keywords to filter clubs
- **Sort**: Choose sorting order for clubs or events
- **Filter Events**: Select specific difficulty level

### Event Capacity Tracking
- **Progress Bar**: Visual representation of registrations
- **Slots Available**: Number of remaining spots
- **Status Indicator**: Shows if slots are available
- **Full Event Warning**: Alerts when event is full

### Event Information
Every event shows:
- 📅 **Date**: When the event is happening
- 🕐 **Time**: Start time of the event
- 📍 **Location**: Where the event takes place
- ⏱️ **Duration**: How long the event runs
- 👥 **Registrations**: Current registration count  
- 🎯 **Difficulty**: Beginner/Intermediate/All
- 📊 **Capacity**: Total slots available

---

## 💡 Tips & Tricks

### Quick Navigation
- Use back buttons to go back one page
- Click club name from event details to see other club events
- Click Event Manager logo to return to home anytime

### Finding Events
- Use search + sort for specific event discovery
- Sort by "Most Available" to find events with open slots
- Filter by difficulty to find events matching your level

### Registration Tips
- Review event details before registering
- Make sure all form fields are filled correctly
- Check email for confirmations (when email system is connected)
- Note the event date and time after registration

---

## 🎨 Understanding the Design

### Colors
- **Purple Gradient Header**: Eye-catching navigation
- **Club Colors**: Each club has unique color (Ruby-Red, Sapphire-Blue, etc.)
- **Green Progress Bar**: Shows registration filling up
- **Status Colors**: Red=Ended, Yellow=Ongoing, Green=Upcoming

### Icons
- 🎉 Event Manager logo
- 💻 Ruby Club (Tech & Programming)
- 🎤 Sapphire Club (Debate)
- 💃 Emerald Club (Dance)
- 📷 Topez Club (Photography)
- ⭐ Favorites (bookmark events)
- ✓ Success confirmations

---

## 📱 Mobile Usage

The app works perfectly on mobile!
- Touch-friendly buttons and inputs
- Responsive layout adapts to screen size
- All features work the same on mobile

### Tips for Mobile
- Tap events to see full details
- Scroll horizontally to view all details
- Form inputs auto-zoom for easy typing
- Use device notifications when available

---

## 🔧 Troubleshooting

### App Won't Start?
```bash
# Make sure you're in the right directory
cd Assignment-5/eventmanager

# Clear npm cache if needed
npm cache clean --force
npm install

# Try starting again
npm start
```

### Form Validation Issues?
- Ensure all required fields (marked with *) are filled
- Email must contain @ and a domain (e.g., user@example.com)
- Phone must be exactly 10 digits
- Wait for error messages to appear below each field

### Can't See Events?
- Go back to home page
- Make sure you selected a valid club
- Check if filters are too restrictive
- Try clearing search/filter results

---

## 🆘 Need Help?

### Page Not Loading?
1. Refresh the page (F5 or Cmd+R)
2. Check your internet connection
3. Clear browser cache
4. Open DevTools (F12) to check for errors

### Form Issues?
1. Make sure all fields are completed
2. Check for error messages below fields
3. Ensure email format is correct
4. Phone must be 10 digits (0-9 only)

### Events Not Showing?
1. Try different search terms
2. Remove filters to see all events
3. Go back to home and try again
4. Refresh the page

---

## 📚 Example Workflows

### Scenario 1: Find a Coding Competition
1. Home page → Search "Ruby" or "Coding"
2. Click "Explore Events" on Ruby Club
3. See all Ruby Club events
4. Click "View Details" on Coding Contest
5. Review event information and register

### Scenario 2: Find Beginner-Friendly Events
1. Home page → Click on a club
2. Use filter dropdown → Select "Beginner"
3. See only beginner events
4. Sort by date to see upcoming beginner events

### Scenario 3: Find Event with Most Availability
1. Home page → Click on any club
2. Sort by "Most Available"
3. Events with most open slots appear first
4. Choose one and register

---

## ✨ Enjoy!

The Event Manager is now ready to help you discover and register for amazing events. Have fun exploring and registering for events!

For more details, check out the IMPROVEMENTS.md file in the project directory. 🎉
