const API_KEY = 'AIzaSyCltFhS2dqK1tsvvlSPI9GSvQ8mBDz1qE0';
async function searchYouTube(query) {
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${encodeURIComponent(query)}&key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  return data.items; // Return video data
}


async function fetchCourses(accessToken) {
    const url = 'https://api.coursera.org/api/enterprise/v1/courses';
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    return data.elements;
  }
  