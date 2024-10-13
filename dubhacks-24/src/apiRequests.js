const API_KEY = 'AIzaSyCltFhS2dqK1tsvvlSPI9GSvQ8mBDz1qE0'; // Replace with your actual YouTube API key

async function searchYouTube(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(query)}&type=video&videoDuration=medium&key=${API_KEY}&order=relevance`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    return data.items; // Return the video results to be used in the App component
  } catch (error) {
    console.error('Error fetching YouTube data:', error);
    return [];
  }
}

export default searchYouTube;


