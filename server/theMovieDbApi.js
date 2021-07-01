const { movieDbApiKey, movieDbUrl } = require("./config");
const fetch = require("node-fetch");
const apiParam = `api_key=${movieDbApiKey}`;

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
    return data.results;
};

module.exports = {
    getMovieActors,
    getActorsMovies,
    searchMovies,
};
