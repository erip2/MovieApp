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
                <a class="btn btn-primary" onclick="movieSelected(${m.id})">Movie Details</a>
              </div>
            </div>`
      });
  });//log the data  
}

function getMovie(id) {
  let movieId = sessionStorage.getItem('movieId');
  
    async function getData() {
    //await the response of the fetch call
    let response = await fetch('https://api.themoviedb.org/3/search/movie?api_key=9d58539c5ba127904dce76603c0bcbca&language=en-US&query=' + movieId + '&include_adult=true');
    //proceed once the first promise is resolved.
    let data = await response.json()
    //proceed only when the second promise is resolved
    return data;
  }

  //call getData function
  getData()
  .then(data => {
    let movie = data.results[0];
    console.log(movie);
  });
}

