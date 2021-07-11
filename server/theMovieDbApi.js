const { movieDbApiKey, movieDbUrl, movieDbImageUrl } = require("./config");
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

const searchActors = async (query) => {
    const url = `${movieDbUrl}/search/person?${apiParam}&query=${query}&page=1&include_adult=false`;
    const response = await fetch(url);
    const data = await response.json();
    const actors = data.results.map((actor) => ({
        id: actor.id,
        image_url:
            actor.profile_path !== null
                ? `${movieDbImageUrl}${actor.profile_path}`
                : actor.profile_path,
        name: actor.name,
    }));
    return actors;
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
                ? `${movieDbImageUrl}${movie.poster_path}`
                : movie.poster_path,
        release_date: movie.release_date,
    }));
    return movies;
};

module.exports = {
    getMovieActors,
    getActorsMovies,
    searchMovies,
    searchActors,
};
