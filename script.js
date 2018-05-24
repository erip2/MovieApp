    //call the fetch function
    fetch('https://api.themoviedb.org/3/movie/550?api_key=9d58539c5ba127904dce76603c0bcbca')
    .then(res => res.json())//response type
    .then(data => console.log(data)); //log the data;

