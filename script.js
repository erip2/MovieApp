    //call the fetch function
    fetch('https://api.github.com/users')
    .then(res => res.json())//response type
    .then(data => console.log(data)); //log the data;