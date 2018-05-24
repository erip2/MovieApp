    //call the fetch function
    fetch('http://www.omdbapi.com/?apikey=b773ce7d&')
    .then(res => res.json())//response type
    .then(data => console.log(data)); //log the data;

