import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import searchYouTube from './apiRequests.js'; // Ensure this function exists in apiRequests.js
import { getAccessToken, fetchCourses } from './courseAPI.js'; // Ensure these functions exist in courseraApi.js

function App() {
  const [query, setQuery] = useState(''); // State to track search query
  const [videos, setVideos] = useState([]); // State to track YouTube search results
  const [courses, setCourses] = useState([]); // State to track Coursera courses

  // Function to handle YouTube video search
  const handleSearchYouTube = async () => {
    const results = await searchYouTube(query); // Pass the query to searchYouTube function
    setVideos(results); // Set the results to state
  };

  // Fetch Coursera courses on component mount
    const fetchData = async () => {
      const accessToken = await getAccessToken('4af3f720-1c8f-436f-ad79-2f1f8855e0cf', '8R3oJyIXv0U6p1xsWyiMO5CrOhLOGo8nlJxmlJVJbcab96fp8IXGICc1rvwi4sEm'); // Replace with your client credentials
      const courseData = await fetchCourses(accessToken); // Fetch Coursera courses using the access token
      setCourses(courseData); // Set courses to state
    };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Edit <code>src/App.js</code> and save to reload.</p>
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>

        {/* Input and Button to search for YouTube videos */}
        <input
          type="text"
          id="searchQuery"
          placeholder="Search for videos..."
          value={query} // Controlled component
          onChange={(e) => setQuery(e.target.value)} // Update state on input change
        />
        <button onClick={handleSearchYouTube}>Search YouTube</button>

        {/* Render YouTube video results */}
        <div id="videoResults">
          <h2>YouTube Results:</h2>
          {videos.length > 0 ? (
            videos.map((video) => (
              <div key={video.id.videoId}>
                <h3>{video.snippet.title}</h3>
                <p>{video.snippet.description}</p>
                <a href={`https://www.youtube.com/watch?v=${video.id.videoId}`} target="_blank" rel="noopener noreferrer">
                  <img src={video.snippet.thumbnails.default.url} alt="Video thumbnail" />
                </a>
              </div>
            ))
          ) : (
            <p>No videos found.</p>
          )}
        </div>

        <button onClick={fetchData}>Search courses</button>

        {/* Render Coursera course results */}
        <div id="courses">
          <h2>Coursera Results:</h2>
          {courses && courses.length > 0 ? (
            courses.map((course) => (
              <div key={course.id}>
                <h3>{course.name}</h3>
                <p>{course.description}</p>
                <a href={course.link} target="_blank" rel="noopener noreferrer">
                  View Course
                </a>
              </div>
            ))
          ) : (
            <p>Loading Coursera courses...</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
