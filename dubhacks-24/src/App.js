import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import searchYouTube from './apiRequests.js'; // Ensure this function exists in apiRequests.js
import { getAccessToken, fetchCourses } from './courseAPI.js'; // Ensure these functions exist in courseraApi.js
import searchBooks from './booksApi.js'; // Import books API request function

function App() {
  const [query, setQuery] = useState(''); // State to track search query
  const [videos, setVideos] = useState([]); // State to track YouTube search results
  const [courses, setCourses] = useState([]); // State to track Coursera courses
  const [books, setBooks] = useState([]); // State to track Google Books search results

  // Function to handle YouTube video search
  const handleSearchYouTube = async () => {
    const results = await searchYouTube(query); // Pass the query to searchYouTube function
    setVideos(results); // Set the results to state
  };

  // Function to handle Coursera courses search
  // const fetchData = async () => {
  //   const accessToken = await getAccessToken('YOUR_CLIENT_ID', 'YOUR_CLIENT_SECRET'); // Replace with your Coursera credentials
  //   const courseData = await fetchCourses(accessToken); // Fetch Coursera courses using the access token
  //   setCourses(courseData); // Set courses to state
  // };

  // Function to handle Books search
  const handleSearchBooks = async () => {
    const results = await searchBooks(query); // Pass the query to searchBooks function
    setBooks(results); // Set the results to state
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
          placeholder="Search for videos, courses, or books..."
          value={query} // Controlled component
          onChange={(e) => setQuery(e.target.value)} // Update state on input change
        />
        <button onClick={handleSearchYouTube}>Search YouTube</button>
        {/* <button onClick={fetchData}>Search Courses</button> */}
        <button onClick={handleSearchBooks}>Search Books</button>

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
            <p>No courses found.</p>
          )}
        </div>

        {/* Render Google Books results */}
        <div id="booksResults">
          <h2>Books Results:</h2>
          {books.length > 0 ? (
            books.map((book) => (
              <div key={book.id}>
                <h3>{book.volumeInfo.title}</h3>
                <p>Author: {book.volumeInfo.authors ? book.volumeInfo.authors.join(', ') : 'Unknown'}</p>
                <p>Published Date: {book.volumeInfo.publishedDate}</p>
                <p>{book.volumeInfo.description || 'No description available'}</p>
                <a href={book.volumeInfo.previewLink} target="_blank" rel="noopener noreferrer">
                  Read More
                </a>
              </div>
            ))
          ) : (
            <p>No books found.</p>
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
