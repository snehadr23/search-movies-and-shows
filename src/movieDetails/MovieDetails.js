import './MovieDetails.css';

function MovieDetails(props) {
    const MSGBEFORESELECTION = 'Click on one of the movie titles to see more details.';
    const LANGUAGES = {
        en: 'English',
        ru: 'Russian',
        es: 'Spanish',
        ja: 'Japanese',
        zh: 'Chinese',
        fr: 'French'
    }
    let spokenLanguages = '';
    let producedCountries = '';
    let producers = '';
    let genres = '';
    if ((props.movie.spoken_languages) && (props.movie.spoken_languages.length > 0)) {
        for (var i = 0; i < props.movie.spoken_languages.length; i++) {
            spokenLanguages += LANGUAGES[(props.movie.spoken_languages[i].iso_639_1)];
            if (props.movie.spoken_languages[i].iso_639_1 === props.movie.original_language) {
                spokenLanguages += '(Original)';
            }
            if (((i >= 0) && (i < props.movie.spoken_languages.length - 1)) && (props.movie.spoken_languages.length >= 2)) {
                spokenLanguages += ', ';
            }
        }
    }

    if ((props.movie.production_countries) && (props.movie.production_countries.length > 0)) {
        for (var j = 0; j < props.movie.production_countries.length; j++) {
            producedCountries += (props.movie.production_countries[j].name);
            if (((j >= 0) && (j < props.movie.production_countries.length - 1)) && (props.movie.production_countries.length >= 2)) {
                producedCountries += ', ';
            }
        }
    }

    if ((props.movie.production_companies) && (props.movie.production_companies.length > 0)) {
        for (var k = 0; k < props.movie.production_companies.length; k++) {
            producers += (props.movie.production_companies[k].name);
            if (((k >= 0) && (k < props.movie.production_companies.length - 1)) && (props.movie.production_companies.length >= 2)) {
                producers += ', ';
            }
        }
    }

    if ((props.movie.genres) && (props.movie.genres.length > 0)) {
        for (var l = 0; l < props.movie.genres.length; l++) {
            genres += (props.movie.genres[l].name);
            if (((l >= 0) && (l < props.movie.genres.length - 1)) && (props.movie.genres.length >= 2)) {
                genres += ', ';
            }
        }
    }

    if(props.movie === MSGBEFORESELECTION) {
        return (
            <p>{MSGBEFORESELECTION}</p>
        )
    } else {
        return (
            <div className = 'movie-details'>
                <img className = 'backdrop' src = {props.imageBaseUrl + props.backdropSize + props.movie.backdrop_path} alt = {'Backdrop - ' + props.movie.original_title}/>
                <div className = 'snapshot'>
                    <h3><a href = {props.movie.homepage} target = '_blank' rel='noreferrer'>{props.movie.original_title}</a></h3>
                    <span>({props.movie.runtime} min)</span>
                    <span>Languages: {spokenLanguages}</span>
                    <img className = 'poster' src = {props.imageBaseUrl + props.posterSize + props.movie.poster_path} alt = {'Poster - ' + props.movie.original_title}/>
                </div>
                <div className = 'genre'>
                    <p>Categories: {genres}</p>
                </div>
                <div className = 'metrics'>
                    <span>{props.movie.vote_average} / 10 ({props.movie.vote_count} reviews)</span>
                    <span>{props.movie.status} on {props.movie.release_date}</span>
                </div>
                <div className = 'overview'>
                    <p>{props.movie.overview}</p>
                </div>
                <div className = 'crew'>
                    <p>Produced in <span>{producedCountries}</span> by <span>{producers}</span></p>
                </div>
            </div>
        )
    }
}

export default MovieDetails;