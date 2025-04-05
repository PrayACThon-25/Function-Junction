import React, { useEffect, useState } from 'react';

const Mentorship = () => {
  const [mentors, setMentors] = useState([]);   // All mentors fetched from the backend
  const [fields, setFields] = useState([]);      // Available fields (expertise areas)
  const [selectedField, setSelectedField] = useState('');  // Selected field from dropdown
  const [filteredMentors, setFilteredMentors] = useState([]);  // Mentors to be displayed based on selected field
  const [name, setName] = useState('');          // User's name for booking
  const [email, setEmail] = useState('');        // User's email for booking
  const [message, setMessage] = useState('');    // Message for booking status
  const [isBooking, setIsBooking] = useState(false);  // Toggle for booking form visibility
  const [selectedMentor, setSelectedMentor] = useState(null);  // Store the selected mentor for booking

  // Sample fields for selection (you can fetch this dynamically if needed)
  useEffect(() => {
    setFields(['Python Development', 'Data Science', 'Software Development', 'Machine Learning', 'Project Management', 'Cloud Computing', 'Cybersecurity']);
  }, []);

  // Sample mentors data (to replace the backend fetch for now)
  const sampleMentors = [
    {
      "id": 1,
      "name": "Aditi Sharma",
      "expertise": "Python Development",
      "available": true,
      "booked": false,  // Track if booked
      "slots": ["10:00 AM", "2:00 PM"]
    },
    {
      "id": 2,
      "name": "Ravi Kumar",
      "expertise": "Data Science",
      "available": true,
      "booked": false,  // Track if booked
      "slots": ["11:00 AM", "4:00 PM"]
    },
    {
      "id": 3,
      "name": "Suman Reddy",
      "expertise": "Software Development",
      "available": false,
      "booked": false,  // Track if booked
      "slots": ["9:00 AM", "1:00 PM"]
    },
    {
      "id": 4,
      "name": "Priya Patel",
      "expertise": "Machine Learning",
      "available": true,
      "booked": false,  // Track if booked
      "slots": ["12:00 PM", "3:00 PM"]
    },
    {
      "id": 5,
      "name": "Karan Verma",
      "expertise": "Project Management",
      "available": true,
      "booked": false,  // Track if booked
      "slots": ["10:30 AM", "3:30 PM"]
    },
    {
      "id": 6,
      "name": "Neha Mehra",
      "expertise": "Data Science",
      "available": false,
      "booked": false,  // Track if booked
      "slots": ["11:30 AM", "2:30 PM"]
    },
    {
      "id": 7,
      "name": "Vikram Singh",
      "expertise": "Cloud Computing",
      "available": true,
      "booked": false,  // Track if booked
      "slots": ["9:30 AM", "12:30 PM"]
    },
    {
      "id": 8,
      "name": "Simran Kaur",
      "expertise": "Cybersecurity",
      "available": true,
      "booked": false,  // Track if booked
      "slots": ["1:00 PM", "4:30 PM"]
    }
  ];

  // Update mentors state based on selected field
  useEffect(() => {
    setMentors(sampleMentors); // Replace with actual fetch in real scenario
    filterMentorsByField(sampleMentors, selectedField); // Filter mentors based on selected field
  }, [selectedField, sampleMentors]);  // Add sampleMentors as a dependency

  // Filter mentors based on selected field
  const filterMentorsByField = (mentors, field) => {
    if (field === '') {
      setFilteredMentors(mentors);  // If no field selected, show all mentors
    } else {
      setFilteredMentors(mentors.filter((mentor) => mentor.expertise === field));
    }
  };

  // Start the booking process
  const startBooking = (mentor) => {
    setMessage('');  // Clear any previous message when a new mentor is selected
    setSelectedMentor(mentor);
    setIsBooking(true);  // Show booking form
  };

  // Submit the booking
  const bookMentor = async (e) => {
    e.preventDefault();

    if (!name || !email) {
      setMessage("Please provide both name and email to book a mentor.");
      return;
    }

    // Simulate booking action (this should ideally be an API request)
    const res = { message: `Successfully booked a session with ${selectedMentor.name}!` };
    setMessage(res.message);

    // Update mentor availability and booked status (assuming successful booking)
    setMentors(mentors.map((mentor) =>
      mentor.id === selectedMentor.id
        ? { ...mentor, available: false, booked: true } // Set booked as true and available as false
        : mentor
    ));

    setIsBooking(false);  // Hide booking form after submission
    setSelectedMentor(null);  // Clear the selected mentor
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">1-on-1 Mentorship Booking</h2>

      {/* Select field (expertise) */}
      <div className="mb-4">
        <select
          className="border p-2 rounded"
          value={selectedField}
          onChange={(e) => setSelectedField(e.target.value)}
        >
          <option value="">Select Expertise Field</option>
          {fields.map((field) => (
            <option key={field} value={field}>
              {field}
            </option>
          ))}
        </select>
      </div>

      {/* Display mentors based on selected field */}
      <ul>
        {filteredMentors.length === 0 && <p>No mentors available for this field.</p>}
        {filteredMentors.map((mentor) => (
          <li key={mentor.id} className="mb-4 p-4 border rounded bg-white shadow">
            <h3 className="font-semibold">{mentor.name}</h3>
            <p>Expertise: {mentor.expertise}</p>
            <p>Status: {mentor.booked ? '❌ Booked' : mentor.available ? '✅ Available' : '❌ Unavailable'}</p>
            <p>Available Slots: {mentor.slots.join(', ')}</p>
            <button
              onClick={() => startBooking(mentor)}
              disabled={mentor.booked || !mentor.available}  // Disable button if booked or unavailable
              className="mt-2 bg-green-600 text-white px-3 py-1 rounded disabled:opacity-50"
            >
              Book
            </button>
            {/* Show success message for booked mentors */}
            {mentor.booked && <p className="text-green-600 mt-2">Successfully Booked</p>}
          </li>
        ))}
      </ul>

      {/* Message after booking */}
      {message && <p className="mt-4 text-blue-600">{message}</p>}

      {/* Booking Form */}
      {isBooking && selectedMentor && (
        <div className="mt-6 p-4 border rounded bg-gray-50">
          <h3 className="text-xl font-semibold mb-4">Book a session with {selectedMentor.name}</h3>
          <form onSubmit={bookMentor}>
            <div className="mb-4">
              <label className="block">Name</label>
              <input
                className="border p-2 w-full rounded"
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label className="block">Email</label>
              <input
                className="border p-2 w-full rounded"
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Mentorship;
