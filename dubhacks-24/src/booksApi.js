const API_KEY = 'AIzaSyCltFhS2dqK1tsvvlSPI9GSvQ8mBDz1qE0'; // Replace with your API key

async function searchBooks() {
    const query = document.getElementById('searchQuery').value;
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayResults(data.items);
    } catch (error) {
        console.error('Error fetching books:', error);
    }
}

function displayResults(books) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = ''; // Clear previous results

    books.forEach(book => {
        const bookInfo = book.volumeInfo;
        const bookElement = `
            <div>
                <h2>${bookInfo.title}</h2>
                <p>Author: ${bookInfo.authors ? bookInfo.authors.join(', ') : 'Unknown'}</p>
                <p>Published Date: ${bookInfo.publishedDate}</p>
                <p>${bookInfo.description ? bookInfo.description : 'No description available'}</p>
                <a href="${bookInfo.previewLink}" target="_blank">Read More</a>
            </div>
            <hr>
        `;
        resultsDiv.innerHTML += bookElement;
    });
}
