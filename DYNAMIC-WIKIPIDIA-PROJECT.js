let searchResults = document.getElementById("searchResults");
let searchInput = document.getElementById("searchInput");
let spinner = document.getElementById("spinner");

function createAndAppendSearchResults(result) {
    let {
        title,
        link,
        description
    } = result;

    let resultContainer = document.createElement("div");
    resultContainer.classList.add("search-result-item-container");
    searchResults.appendChild(resultContainer);

    let searchResultItemTitle = document.createElement("a");
    searchResultItemTitle.classList.add("search-result-item-title");
    searchResultItemTitle.textContent = title;
    searchResultItemTitle.href = link;
    searchResultItemTitle.target = "_blank";
    resultContainer.appendChild(searchResultItemTitle);

    let break1 = document.createElement("br");
    resultContainer.appendChild(break1);

    let searchResultItemUrl = document.createElement("a");
    searchResultItemUrl.href = link;
    searchResultItemUrl.target = "_blank";
    searchResultItemUrl.textContent = link;
    searchResultItemUrl.classList.add("search-result-item-url");
    resultContainer.appendChild(searchResultItemUrl);

    let break2 = document.createElement("br");
    resultContainer.appendChild(break2);

    let searchResultItemDescription = document.createElement("p");
    searchResultItemDescription.textContent = description;
    searchResultItemDescription.classList.add("search-result-item-description");
    resultContainer.appendChild(searchResultItemDescription);
}

function displaySearchResults(searchResults) {
    spinner.classList.add("d-none");
    for (let result of searchResults) {
        createAndAppendSearchResults(result);
    }
}

function searchWikiResults(Event) {
    if (Event.key === "Enter") {

        spinner.classList.remove("d-none");
        searchResults.textContent = "";
        let searchValue = searchInput.value;
        let url = "https://apis.ccbp.in/wiki-search?search=" + searchValue;
        let options = {
            method: "GET"
        };

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                let {
                    search_results
                } = jsonData;
                displaySearchResults(search_results);
                console.log(search_results);
            });
    }
}

searchInput.addEventListener("keydown", searchWikiResults);