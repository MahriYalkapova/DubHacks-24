import requests
import csv

# Your YouTube Data API key
API_KEY = 'AIzaSyCltFhS2dqK1tsvvlSPI9GSvQ8mBDz1qE0'

# Function to search YouTube and get video results
def search_youtube(query, max_results=50, order='relevance'):
    base_url = 'https://www.googleapis.com/youtube/v3/search'
    params = {
        'part': 'snippet',
        'q': query,  # Search query
        'maxResults': max_results,
        'type': 'video',  # Ensuring we only get video results
        'order': order,  # Order results by relevance, date, etc.
        'key': API_KEY
    }
    
    response = requests.get(base_url, params=params)
    if response.status_code == 200:
        data = response.json()
        return data.get('items', [])
    else:
        print(f"Error: {response.status_code}")
        return []

# Function to extract relevant video data
def extract_video_data(videos):
    video_list = []
    for video in videos:
        video_info = {
            'video_id': video['id']['videoId'],
            'title': video['snippet']['title'],
            'description': video['snippet']['description'],
            'channel': video['snippet']['channelTitle'],
            'published_at': video['snippet']['publishedAt'],
            'thumbnail': video['snippet']['thumbnails']['default']['url'],
            'video_url': f"https://www.youtube.com/watch?v={video['id']['videoId']}"
        }
        video_list.append(video_info)
    return video_list

# Function to save video data to a CSV file
def save_to_csv(videos, filename='youtube_videos.csv'):
    with open(filename, 'w', newline='', encoding='utf-8') as csvfile:
        fieldnames = ['video_id', 'title', 'description', 'channel', 'published_at', 'thumbnail', 'video_url']
        writer = csv.DictWriter(csvfile, fieldnames=fieldnames)
        writer.writeheader()
        for video in videos:
            writer.writerow(video)
    print(f"Data saved to {filename}")

# Main function to collect video data
def collect_youtube_data(query, max_results=50):
    print(f"Searching YouTube for '{query}'...")
    videos = search_youtube(query, max_results)
    if videos:
        video_data = extract_video_data(videos)
        save_to_csv(video_data)
    else:
        print("No videos found")

# Replace 'python programming' with your preferred search query
if __name__ == "__main__":
    collect_youtube_data(query='python programming', max_results=50)
