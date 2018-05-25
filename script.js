var output = document.getElementById('movies');
var searchInput = document.getElementById('searchText');

searchInput.addEventListener('keyup', function(e) {
  e.preventDefault();
  if(e.keyCode == 13) {
    getMovies(searchInput.value);
  }
});

function getMovies(searchText) {
  async function getData() {
    //await the response of the fetch call
    let response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=9d58539c5ba127904dce76603c0bcbca&language=en-US&query=' + searchText + '&include_adult=true');
    //proceed once the first promise is resolved.
    let data = await response.json()
    //proceed only when the second promise is resolved
    return data;
  }

  //call getData function
  getData()
  .then(data => {
      let movie = data.results;
      output.innerHTML = '';
      console.log(movie);
      movie.forEach(function(m, i) {
        
        if(m.poster_path == null) {
          m.poster_path = 'https://cdn.glitch.com/833b6908-d1bb-4b8d-aef7-4cdaaa642c4a%2Fno-img.png?1527172635831';
        } else {
          m.poster_path = 'http://image.tmdb.org/t/p/w185/' + m.poster_path;
        }
        
        output.innerHTML +=    `<div class="col-md-3"> 
               <div class="well text-center">
                <img src="${m.poster_path}">
              <div class="text-center for-btn">
                <h5>${m.title}</h5>
                <a class="btn btn-primary" id="${i}" onclick="movieSelected(${m.id})" href="#">Movie Details</a>
              </div>
            </div>`
      });
  });//log the data  
}


function movieSelected(id) {
  sessionStorage.setItem('movieDetails', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieDetails');
  
    async function getData() {
    //await the response of the fetch call
    let response = await fetch('https://api.themoviedb.org/3/movie/' + movieId  + '?api_key=9d58539c5ba127904dce76603c0bcbca&language=en-US');
    //proceed once the first promise is resolved.
    let data = await response.json()
    //proceed only when the second promise is resolved
    return data;
  }

  //call getData function
  getData()
  .then(data => {
    let movie = data;
    console.log(data);
    
    if(movie.poster_path == null) {
      movie.poster_path = 'https://cdn.glitch.com/833b6908-d1bb-4b8d-aef7-4cdaaa642c4a%2Fno-img.png?1527172635831';
    } else {
      movie.poster_path = 'http://image.tmdb.org/t/p/w185/' + movie.poster_path;
    }
    
     let output =`
        <div class="row">
          <div class="col-md-4">
            <img src="${movie.poster_path}" class="thumbnail">
          </div>
          <div class="col-md-8">
            <h2>${movie.original_title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong>
                ${movie.genres.map(function(genre) {
                  return genre.name;
                })}
            </li>
              <li class="list-group-item"><strong>Released:</strong> ${movie.release_date}</li>
              <li class="list-group-item"><strong>Rated:</strong> ${movie.vote_average}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
              <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
              <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
            </ul>
          </div>
        </div>
        <div class="row">
          <div class="well">
            <h3>Plot</h3>
            ${movie.overview}
            <hr>
            <a href="http://imdb.com/title/${movie.imdb_id}" target="_blank" class="btn btn-primary">View IMDB</a>
            <a href="index.html" class="btn btn-default">Go Back To Search</a>
          </div>
        </div>
      `;
    
    document.getElementById('movie').innerHTML = output;
  });
}

