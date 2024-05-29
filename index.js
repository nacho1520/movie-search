window.addEventListener('load', () => {
    const searchBar = document.querySelector('.search-bar');
    const userInput = document.querySelector('#user-input');

    const loader = document.querySelector('.loader');

    // Movie Widgets
    const movieContainer = document.querySelector('.movie');
    const moviePoster = document.querySelector('.movie-img');
    const movieTitle = document.querySelector('.movie-title');
    const movieGenres = document.querySelector('.genres');
    const movieSinopsis = document.querySelector('.movie-sinopsis');
    const movieDirector = document.querySelector('#director');
    const movieWriters = document.querySelector('#writers');
    const movieStars = document.querySelector('#stars');
    const movieRating = document.querySelector('#rating');

    // Not Found message
    const notFound = document.querySelector('.not-found');

    const fillMove = (data) => {
        moviePoster.src = data.Poster;
        movieTitle.textContent = data.Title;
        movieSinopsis.textContent = data.Plot;
        movieDirector.textContent = data.Director;
        movieWriters.textContent = data.Writer;
        movieStars.textContent = data.Actors;
        movieRating.textContent = data.imdbRating;
        const genres = data.Genre.split(', ');
        genres.forEach(genre => {
            const node = document.createElement('span');
            const textNode = document.createTextNode(genre);
            node.appendChild(textNode);
            movieGenres.appendChild(node);
        });
    }

    const fetchMovie = (title) => {
        loader.classList.add('active');
        fetch(`http://www.omdbapi.com/?apikey=b972cb3d&t=${ title }`)
            .then(response => response.json())
            .then(data => {
                if(data.Response == 'False') {
                    notFound.classList.add('active');
                } else {
                    fillMove(data);
                    loader.classList.remove('active');
                    movieContainer.classList.add('active');
                }
            })
            .catch(error => {
              console.log(error)
            })
    };

    searchBar.addEventListener('submit', () => {
        movieContainer.classList.remove('active');
        notFound.classList.remove('active');
        fetchMovie(userInput.value);
    });

});
