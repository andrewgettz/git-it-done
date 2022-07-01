const getUserRepos = function(user) {
// format the github api url 
const apiURL = "https://api.github.com/users/" + user + "/repos"; 
// make a request to the url 
      fetch(apiURL).then(function(response) {
        response.json().then(function(data) {
            console.log(data);
        }); 
    });
};

getUserRepos("andrewgettz");


