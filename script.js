var output = document.getElementById('movies');

async function getData() 
    {
        //await the response of the fetch call
       let response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=9d58539c5ba127904dce76603c0bcbca&language=en-US&query=Fast&page=1&include_adult=true');
        //proceed once the first promise is resolved.
       let data = await response.json()
        //proceed only when the second promise is resolved
        return data;
    }

//call getData function
getData()
.then(data => {
    let movie = data.results;
    console.log(movie);
    output.innerHTML = '';
    movie.forEach(function(m, i) {
      output.innerHTML +=    '<div class="col-md-3">' + 
             '<div class="well text-center">' +
              '<img src="http://image.tmdb.org/t/p/w185/' + m.poster_path + ' ">' +
            '<div class="well text-center">' +
              '<h5>' + m.title + '</h5>' +
              '<a class="btn btn-primary" href=" +">Movie Details</a>' +
            '</div>' +
          '</div>'
    });
});//log the data

getData();
