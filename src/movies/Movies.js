import                            './Movies.css';
import {useState, useEffect} from 'react';
import axios                 from 'axios';
import MovieTitle            from '../movieTitle/MovieTitle';
import MovieDetails          from '../movieDetails/MovieDetails';
import MovieFilterDropdown   from '../movieFilters/MovieFilterDropdown';

function Movies() {
    const [moviesList, setMoviesList] = useState([]);
    const [movieTitlesList, setMovieTitlesList] = useState(null);
    const [clickedMovieDtls, setClickedMovieDtls] = useState('Click on one of the movie titles to see more details.');
    const [imageBaseURL, setImageBaseURL] = useState(null);
    const [appliedFilters, setAppliedFilters] = useState(null);
    const [searchFilterOptionSelected, setSearchFilterOptionSelected] = useState('default');
    const [searchTermInputDisabled, setSearchTermInputDisabled] = useState(true);
    const [sortFilterAddBtnDisabled, setSortFilterAddBtnDisabled] = useState(true);
    const [sortFilterOptionSelected, setSortFilterOptionSelected] = useState('default');
    const [movieDetailsToShow, setMovieDetailsToShow] = useState();
    const searchFilterOptions = ['default', 'name', 'category', 'primary_release_year', 'with_genres', 'with_original_language'];
    const sortFilterOptions = ['default', 'popularity.asc', 'popularity.desc', 'release_date.asc', 'release_date.desc', 'revenue.asc', 'revenue.desc', 'primary_release_date.asc', 'primary_release_date.desc', 'original_title.asc', 'original_title.desc', 'vote_average.asc', 'vote_average.desc', 'vote_count.asc', 'vote_count.desc'];
    const POSTERSIZE = 'w92';
    const BACKDROPSIZE = 'w300';
    const SEARCHFILTERLABEL = 'Search By';
    const SORTFILTERLABEL = 'Sort By';
    const SEARCHTERMINPUTPLACEHOLDER = 'Search Term...';
    const ADDSORTFILTERBUTTONTEXT = 'Add Sort Filter';

    function movieTitleClickHandler (movieId) {
        axios.get('https://api.themoviedb.org/3/movie/'+ movieId + '?api_key=6e68d3270b70a22c9546f15b60cb98f9')
        .then(res => {
            setClickedMovieDtls(res.data);
        });
    }
    function searchFilterOptionChanged (e) {
        console.log(e.target.value);
        setSearchFilterOptionSelected(e.target.value);
        if(e.target.value !== 'default') {
            setSearchTermInputDisabled(false);
        }
    }

    function sortFilterOptionChanged (e) {
        console.log(e.target.value);
        setSortFilterOptionSelected(e.target.value);
        if(e.target.value !== 'default') {
            setSortFilterAddBtnDisabled(false);
        }
    }
    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/discover/movie?api_key=6e68d3270b70a22c9546f15b60cb98f9&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate')
        .then(res => {
            setMoviesList(res.data.results);
        });

        axios.get('https://api.themoviedb.org/3/configuration?api_key=6e68d3270b70a22c9546f15b60cb98f9')
        .then(res => {
            console.log(res.data);
            setImageBaseURL(res.data.images.secure_base_url);
        });
    }, []);
    useEffect(() => {
        let movieTitles = null;
        movieTitles = (
            moviesList.map((movie) => {
                return <MovieTitle
                        movieTitle = {movie.original_title}
                        click = {() => movieTitleClickHandler(movie.id)}
                        key = {movie.id}
                />
            })
        )
        setMovieTitlesList(movieTitles);
    }, [moviesList]);

    useEffect(() => {
        let movieDetails = null;
        movieDetails = (
            <MovieDetails movie = {clickedMovieDtls} 
                          imageBaseUrl = {imageBaseURL} 
                          posterSize = {POSTERSIZE} 
                          backdropSize = {BACKDROPSIZE}/>
        )
        console.log('movieDetails: ', movieDetails);
        setMovieDetailsToShow(movieDetails);
    }, [clickedMovieDtls]);
    return(
        <main className = 'main'>
            <div className = 'filters'>
                <MovieFilterDropdown label = {SEARCHFILTERLABEL} 
                                 searchFilterOptionSelected = {searchFilterOptionSelected}
                                 searchFilterOptions = {searchFilterOptions}
                                 filterType = 'search'
                                 searchTermInputPlaceholder = {SEARCHTERMINPUTPLACEHOLDER}
                                 searchTermInputDisabled = {searchTermInputDisabled}
                                 change = {(e) => searchFilterOptionChanged(e)}/>

                <MovieFilterDropdown label = {SORTFILTERLABEL} 
                                 sortFilterOptionSelected = {sortFilterOptionSelected}
                                 sortFilterOptions = {sortFilterOptions}
                                 filterType = 'sort'
                                 change = {(e) => sortFilterOptionChanged(e)}
                                 addFilterBtnText = {ADDSORTFILTERBUTTONTEXT}
                                 sortFilterAddBtnDisabled = {sortFilterAddBtnDisabled}/>
                <div className = 'filters-applied'>
                    {appliedFilters}
                </div>
            </div>
            <div className = 'section movie-list'>
                {/* <h2>Find Movies to watch</h2> */}
                <div className = 'movie-title-list'>
                    {movieTitlesList}
                </div>
            </div>
            <div className = 'section'>
                {movieDetailsToShow}
            </div>
        </main>
    );
}

export default Movies;