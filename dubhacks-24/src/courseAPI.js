// courseAPI.js

export async function getAccessToken(clientId, clientSecret) {
    const url = 'https://api.coursera.org/oauth2/v1/token';
  
    const params = new URLSearchParams();
    params.append('grant_type', 'client_credentials');
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: params,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
  
      const data = await response.json();
      return data.access_token; // Extract the access token from the response
    } catch (error) {
      console.error('Error getting access token:', error);
    }
  }
  
  export async function fetchCourses(accessToken) {
    const url = 'https://api.coursera.org/api/enterprise/v1/courses';
  
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`, // Use the access token in headers
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
      return data.elements; // The courses are usually in the 'elements' array
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  }
  