import { useEffect, useState } from "react";
import "./App.css";

export default function App() {
  const [user, setUser] = useState(null);

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [loginError, setLoginError] = useState("");

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  
  const [selectedNotification, setSelectedNotification] = useState(null);

  const [notifications, setNotifications] = useState([
    { id: 1, type: "Placement", msg: "Google hiring drive tomorrow", details: "Google is visiting campus for hiring. Interested candidates should register on the portal. Last date: Tomorrow, 5 PM", priority: 3, date: "Jan 17, 2026", time: "2:30 PM" },
    { id: 2, type: "Event", msg: "Tech Fest registration open", details: "Annual Tech Fest registration is now open. Participate in coding, hackathon, and tech talks. Limited seats available!", priority: 1, date: "Jan 25, 2026", time: "9:15 AM" },
    { id: 3, type: "Result", msg: "Semester results released", details: "Semester 1 results have been released. Check the academic portal for your grades and performance report.", priority: 2, date: "Feb 8, 2026", time: "11:00 AM" },
    { id: 4, type: "Placement", msg: "Amazon internship shortlist", details: "Congratulations! You have been shortlisted for Amazon internship interview. Check your email for further details.", priority: 3, date: "Feb 21, 2026", time: "3:45 PM" },
    { id: 5, type: "Event", msg: "Hackathon starts next week", details: "24-hour hackathon begins next week! Build innovative projects and win amazing prizes. Register your team now.", priority: 1, date: "Mar 3, 2026", time: "10:20 AM" },
    { id: 6, type: "Result", msg: "Internal marks published", details: "Internal assessment marks for all subjects have been published. Review your performance and meet teachers for clarification.", priority: 2, date: "Mar 14, 2026", time: "1:50 PM" },
    { id: 7, type: "Placement", msg: "Infosys campus drive", details: "Infosys is conducting campus recruitment drive. Check eligibility criteria and apply through the placement cell.", priority: 3, date: "Apr 6, 2026", time: "4:30 PM" },
    { id: 8, type: "Event", msg: "Workshop on AI/ML", details: "Free workshop on Artificial Intelligence and Machine Learning conducted by industry experts. Seats limited to 100.", priority: 1, date: "Apr 18, 2026", time: "9:00 AM" },
    { id: 9, type: "Result", msg: "Revaluation results out", details: "Revaluation results for requested subjects are now available. You can view them on the academic portal.", priority: 2, date: "May 2, 2026", time: "2:15 PM" },
    { id: 10, type: "Placement", msg: "TCS hiring open", details: "TCS is recruiting for various profiles. Submit your CV and application through the placement portal by Dec 20.", priority: 3, date: "May 9, 2026", time: "11:30 AM" },
    { id: 11, type: "Event", msg: "Sports meet announcement", details: "Annual inter-college sports meet scheduled for next month. Teams registrations are now open. Register your team today!", priority: 1, date: "May 20, 2026", time: "3:00 PM" },
    { id: 12, type: "Result", msg: "Semester timetable updated", details: "Semester exams timetable has been updated. Check the official academic calendar for exam dates and timings.", priority: 2, date: "Jun 7, 2026", time: "10:45 AM" },
    { id: 13, type: "Placement", msg: "Wipro placement drive", details: "Wipro is visiting campus for recruitment. Minimum CGPA requirement: 7.0. Apply now through the placement cell.", priority: 3, date: "Jun 12, 2026", time: "1:20 PM" },
    { id: 14, type: "Event", msg: "Cultural fest auditions", details: "Cultural festival auditions for various performances - dance, music, drama, and more. Show your talent and win prizes!", priority: 1, date: "Jun 18, 2026", time: "5:00 PM" },
    { id: 15, type: "Result", msg: "Final exam schedule released", details: "Final semester exam schedule has been released. Download the official schedule from the academic portal immediately.", priority: 2, date: "Jun 24, 2026", time: "12:00 PM" },
  ]);

  // REAL-TIME SIMULATION (new notifications coming)
  useEffect(() => {
    const types = ["Placement", "Event", "Result"];
    const typeDetails = {
      Placement: {
        msgPrefix: "Campus placement update",
        details: "Campus placement update is live. Check the placement portal for eligibility and registration details.",
        priority: 3,
      },
      Event: {
        msgPrefix: "Campus event alert",
        details: "Campus event announcement posted. See the details and register if you're interested.",
        priority: 1,
      },
      Result: {
        msgPrefix: "Result announcement",
        details: "Campus result notification published. Visit the portal to view your latest grades.",
        priority: 2,
      },
    };

    const interval = setInterval(() => {
      const type = types[Math.floor(Math.random() * types.length)];
      const detail = typeDetails[type];

      setNotifications((prev) => [
        {
          id: Date.now(),
          type,
          msg: `${detail.msgPrefix} at ${new Date().toLocaleTimeString()}`,
          details: detail.details,
          priority: detail.priority,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          read: false,
        },
        ...prev.slice(0, 14),
      ]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // LOGIN
  const handleLogin = () => {
    const phoneValue = phone.trim();
    const isPhoneValid = /^\d{10}$/.test(phoneValue);

    if (!email.trim() && !isPhoneValid) {
      setLoginError("Please enter a valid email or a 10-digit phone number.");
      return;
    }

    setUser({ email: email.trim(), phone: phoneValue });
    setLoginError("");
  };

  const handleMarkAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
    setSelectedNotification(null);
  };

  // FILTER + SEARCH + PRIORITY SORT
  const filtered = notifications
    .filter((n) =>
      filter === "All" ? true : n.type === filter
    )
    .filter((n) =>
      n.msg.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => b.priority - a.priority);

  // LOGIN PAGE
  if (!user) {
    return (
      <div className="login">
        <h2>Campus Notification</h2>

        <div className="login-container">
          <input
            type="email"
            placeholder="📧 Email ID"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="tel"
            placeholder="📞 Phone Number (10 digits)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          {loginError && <p className="login-error">{loginError}</p>}

          <button onClick={handleLogin}>Login</button>
        </div>
      </div>
    );
  }

  // DASHBOARD
  return (
    <div className="app">
      <h1 className="title">Campus Notification Dashboard</h1>

      <p className="user">
        Logged in as: {user.email || user.phone}
      </p>

      {/* CONTROLS */}
      <div className="controls">
        <input
          placeholder="Search notifications..."
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="select-group">
          <label htmlFor="notification-type">Notification type:</label>
          <select id="notification-type" onChange={(e) => setFilter(e.target.value)}>
            <option value="All">All</option>
            <option value="Placement">Placement</option>
            <option value="Event">Event</option>
            <option value="Result">Result</option>
          </select>
        </div>
      </div>

      {/* GRID */}
      <div className="grid">
        {filtered.map((n) => (
          <div 
            key={n.id} 
            className={`card ${n.read ? "read" : ""}`}
            onClick={() => setSelectedNotification(n)}
          >
            <span className={`tag ${n.type.toLowerCase()}`}>
              {n.type}
            </span>
            <div className="card-header">
              <p>{n.msg}</p>
              {n.read && <span className="read-badge">✓ Read</span>}
            </div>
            <small className="card-meta">{n.date}</small>
          </div>
        ))}
      </div>

      {/* MODAL */}
      {selectedNotification && (
        <div className="modal" onClick={() => setSelectedNotification(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedNotification(null)}>✕</button>
            
            <div className={`modal-tag ${selectedNotification.type.toLowerCase()}`}>
              {selectedNotification.type}
            </div>
            
            <h2 className="modal-title">{selectedNotification.msg}</h2>
            
            <div className="modal-meta">
              <span>📅 {selectedNotification.date}</span>
              <span>🕐 {selectedNotification.time}</span>
            </div>
            
            <p className="modal-details">{selectedNotification.details}</p>
            
            <div className="modal-actions">
              <button className="btn-primary" onClick={() => handleMarkAsRead(selectedNotification.id)}>OK</button>
              <button className="btn-secondary">Share</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}