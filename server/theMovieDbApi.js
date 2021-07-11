const { movieDbApiKey, movieDbUrl } = require("./config");
const fetch = require("node-fetch");
const apiParam = `api_key=${movieDbApiKey}`;
const IMAGE_URL_92 = "https://image.tmdb.org/t/p/w92";

const getMovieActors = async (movieId) => {
    const response = await fetch(
        `${movieDbUrl}/movie/${movieId}/credits?${apiParam}`
    );
    const data = await response.json();
    return data.cast;
};

const getActorsMovies = async (actorId) => {
    const response = await fetch(
        `${movieDbUrl}/person/${actorId}/movie_credits?${apiParam}`
    );
    const data = await response.json();
    return data.cast;
};

const searchMovies = async (query) => {
    const url = `${movieDbUrl}/search/movie?${apiParam}&query=${query}&page=1&include_adult=false`;
    const response = await fetch(url);
    const data = await response.json();
    const movies = data.results.map((movie) => ({
        id: movie.id,
        title: movie.title,
        image_url:
            movie.poster_path !== null
                ? `${IMAGE_URL_92}/${movie.poster_path}`
                : movie.poster_path,
        release_date: movie.release_date,
    }));
    return movies;
};

module.exports = {
    getMovieActors,
    getActorsMovies,
    searchMovies,
};
