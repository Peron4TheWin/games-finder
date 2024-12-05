const sources = [
    { name: 'Dodi', url: 'https://hydralinks.cloud/sources/dodi.json' },
    { name: 'FitGirl', url: 'https://hydralinks.cloud/sources/fitgirl.json' },
    { name: 'OnlineFix', url: 'https://hydralinks.cloud/sources/onlinefix.json' }
];

document.getElementById('searchButton').addEventListener('click', async () => {
    const query = document.getElementById('searchInput').value.trim();
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';

    if (!query) {
        alert('Please enter a search term!');
        return;
    }

    const allResults = [];

    try {
        for (const source of sources) {
            const response = await fetch(source.url);
            if (!response.ok) throw new Error(`Failed to fetch ${source.name}`);

            const data = await response.json();

            const filteredResults = data.downloads.filter(item =>
                item.title.toLowerCase().includes(query.toLowerCase())
            );

            filteredResults.forEach(result => {
                allResults.push({
                    title: result.title,
                    link: result.uris[0],
                    source: source.name
                });
            });
        }

        if (allResults.length === 0) {
            resultsContainer.innerHTML = '<p>No results found</p>';
        } else {
            allResults.forEach(result => {
                const resultDiv = document.createElement('div');
                resultDiv.className = 'result';
                resultDiv.innerHTML = `
          <h3>${result.title}</h3>
          <p><a href="${result.link}" target="_blank">Download Link</a></p>
          <small>Source: ${result.source}</small>
        `;
                resultsContainer.appendChild(resultDiv);
            });
        }
    } catch (error) {
        console.error('Error:', error);
        resultsContainer.innerHTML = '<p>An error occurred while fetching results.</p>';
    }
});
