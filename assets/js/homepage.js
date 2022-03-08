var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");
var repoContainerEl = document.querySelector("#repos-container");
var repoSearchTerm = document.querySelector("#repo-search-term");
var displayRepos = function(repos, searchTerm){
    repoContainerEl.textContent = "";
    repoSearchTerm.textContent = searchTerm;
    // Check if API returned any repos
    if (repos.length === 0){
        repoContainerEl.textContent = "No repositories found.";
        return;
    };
    // Loop over repos
    for (var i = 0; i < repos.length; i++){
        // Format repo name
        var repoName = repos[i].owner.login + "/" + repos[i].name;
        // Create a container for each repo
        var repoEl = document.createElement("div");
        repoEl.classList = "list-item flex-row justify-space-between align-center";
        // Create a span element to hold repository name
        var titleEl = document.createElement("span");
        titleEl.textContent = repoName;
        // Append to container
        repoEl.appendChild(titleEl);
        // Append container to the DOM
        repoContainerEl.appendChild(repoEl);
        // Create a status element
        var statusEl = document.createElement("span");
        statusEl.classList = "flex-row align-center";
        // Check if current repo has issues or not
        if (repos[i].open_issues_count > 0){
            statusEl.innerHTML = "<i class='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issue(s)";
        }else{
            statusEl.innerHTML = "<i class= 'fas fa-check-square status-icon icon-success'></i>";
        };
        // Append to container
        repoEl.appendChild(statusEl);
    };
};
var formSubmitHandler = function(event){
    event.preventDefault();
    // Get value from input element
    var username = nameInputEl.value.trim();
    if (username){
        getUserRepos(username);
        nameInputEl.value = "";
    }else{
        alert("Please enter a GitHub username");
    };
};
var getUserRepos = function(user) {
    // Format the Github API url
    var apiUrl = "https://api.github.com/users/" + user + "/repos";
    // Make a requesty to the url
    fetch(apiUrl).then(function(response){
        // Check if request was successful
        if (response.ok){
            response.json().then(function(data){
            displayRepos(data, user);
            });
        }else{
            alert("Error: GitHub User Not Found");
        };
    })
    .catch(function(error){
        alert("Unable to connect to GitHub");
    });
};
userFormEl.addEventListener("submit", formSubmitHandler);