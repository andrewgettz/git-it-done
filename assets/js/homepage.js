let repoContainerEl = document.querySelector("#repos-container");
let repoSearchTerm = document.querySelector("#repo-search-term");
let userFormEl = document.querySelector("#user-form"); 
const nameInputEl = document.querySelector("#username");


const formSubmitHandler = function(event){
    //prevent page from refreshing 
    event.preventDefault();

    //get value from input element 
    let username = nameInputEl.value.trim();

if (username) {
    getUserRepos(username);

//clear old content 
    repoContainerEl.textContent = '';
    nameInputEl.value = "";
}
else{
    alert("Please enter a GitHub username");
}
};


const getUserRepos = function(user) {
// format the github api url 
const apiURL = "https://api.github.com/users/" + user + "/repos"; 

// make a request to the url 
      fetch(apiURL)
      .then(function(response) {
        //request was successful
        if(response.ok){
        response.json().then(function(data) {
            displayRepos(data, user);
        }); 
    } else {
        alert("Error: GitHub User Not Found");
    }
    })
//If network error occurs 
    .catch(function(error){
        alert("Unable to connect to Github");
    });
};

const displayRepos = function(repos, searchTerm) {
    repoContainerEl.textContent = "";

    //check if api returned any repos
    if(repos.length === 0){
        repoContainerEl.textContent = "No repositories found.";
        return; 
    }

    repoSearchTerm.textContent = searchTerm; 

    //loop over repos 
    for(var i = 0; i < repos.length; i++){
        //format repo name 
        const repoName = repos[i].owner.login + "/" + repos[i].name;

    //create a container for each repo
    const repoEl = document.createElement("a");
    repoEl.classList = "list-item flex-row justify-space-between align-center"; 
    repoEl.setAttribute("href", "./single-repo.html?repo=" + repoName);

    //create a span element to hold repository name 
    let titleEl = document.createElement("span");
    titleEl.textContent = repoName; 

    //append to container
    repoEl.appendChild(titleEl); 

     //create a status element 

     let statusEl =document.createElement("span");
     statusEl.classList = "flex-row align-center"
 
     //check if current repo has issues or not 
     if(repos[i].open_issues_count > 0) {
         statusEl.innerHTML = 
         "<i class ='fas fa-times status-icon icon-danger'></i>" + repos[i].open_issues_count + " issues(s)";
     }
     else {
         statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
     }
     //append to container 
     repoEl.appendChild(statusEl);
     
    //append container to the dom 
    repoContainerEl.appendChild(repoEl);
    }
};

//add event Listener to forms 
userFormEl.addEventListener("submit", formSubmitHandler);


