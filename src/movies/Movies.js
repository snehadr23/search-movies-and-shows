import                            './Movies.css';
import {useState, useEffect, useRef} from 'react';
import axios                 from 'axios';
import MovieTitle            from '../movieTitle/MovieTitle';
import MovieDetails          from '../movieDetails/MovieDetails';
import MovieFilterDropdown   from '../movieFilters/MovieFilterDropdown';
import MovieFilterApplied    from '../movieFilters/MovieFilterApplied';

function Movies() {
    const TMDBAPIKEY = '6e68d3270b70a22c9546f15b60cb98f9';
    const TMDBSEARCHURL = 'https://api.themoviedb.org/3/search/movie?api_key=';
    const [moviesList, setMoviesList] = useState([]);
    const [movieTitlesList, setMovieTitlesList] = useState(null);
    const [clickedMovieDtls, setClickedMovieDtls] = useState('Click on one of the movie titles to see more details.');
    const [imageBaseURL, setImageBaseURL] = useState(null);
    // const [appliedFilters, setAppliedFilters] = useState(null);
    const [searchFilterOptionSelected, setSearchFilterOptionSelected] = useState('default');
    const [searchTermInputDisabled, setSearchTermInputDisabled] = useState(true);
    const [sortFilterAddBtnDisabled, setSortFilterAddBtnDisabled] = useState(true);
    const [searchFilterAddBtnDisabled, setSearchFilterAddBtnDisabled] = useState(true);
    const [sortFilterOptionSelected, setSortFilterOptionSelected] = useState('default');
    const [movieDetailsToShow, setMovieDetailsToShow] = useState();
    const [appliedSearchTerms, setAppliedSearchTerms] = useState([]);
    const [appliedSortSelection, setAppliedSortSelection] = useState([]);
    const [showAppliedSearchTerms, setShowAppliedSearchTerms] = useState('hide');
    const [showAppliedSortSelection, setShowAppliedSortSelection] = useState('hide');
    const [appliedSearchTermsToDisplay, setAppliedSearchTermsToDisplay] = useState(null);
    const [appliedSortSelectionToDisplay, setAppliedSortSelectionToDisplay] = useState(null);
    const [searchURL, setSearchURL] = useState(TMDBSEARCHURL + TMDBAPIKEY + '&page=1&include_adult=false');
    const searchFilterOptions = ['default', 'name', 'primary_release_year', 'region'];//, 'with_original_language'];
    const sortFilterOptions = ['default', 'popularity.asc', 'popularity.desc', 'release_date.asc', 'release_date.desc', 'revenue.asc', 'revenue.desc', 'primary_release_date.asc', 'primary_release_date.desc', 'original_title.asc', 'original_title.desc', 'vote_average.asc', 'vote_average.desc', 'vote_count.asc', 'vote_count.desc'];
    const POSTERSIZE = 'w92';
    const BACKDROPSIZE = 'w300';
    const SEARCHFILTERLABEL = 'Search By';
    const SORTFILTERLABEL = 'Sort By';
    const SEARCHTERMINPUTPLACEHOLDER = 'Search Term...';
    const ADDSORTFILTERBUTTONTEXT = 'Add Sort Filter';
    const ADDSEARCHFILTERBUTTONTEXT = 'Add Search Filter';
    const SEARCHFILTERTYPE = 'search';
    const SORTFILTERTYPE = 'sort';
    const searchOptionsTextMap = {
        default: 'Select an option',
        name: 'Name',
        region: 'Region',
        primary_release_year: 'Release Year'
        // with_original_language: 'Original Language'
    };
    const sortOptionsTextMap = {
        'default': 'Select an option',
        'popularity.asc': 'Popularity(Ascending)',
        'popularity.desc': 'Popularity(Descending)',
        'release_date.asc': 'Release Date(Ascending)',
        'release_date.desc': 'Release Date(Descending)',
        'revenue.asc': 'Revenue(Ascending)',
        'revenue.desc': 'Revenue(Descending)',
        'primary_release_date.asc': 'Primary Release Date(Ascending)',
        'primary_release_date.desc': 'Primary Release Date(Descending)',
        'original_title.asc': 'Original Title(Ascending)',
        'original_title.desc': 'Original Title(Descending)',
        'vote_average.asc': 'Vote Average(Ascending)',
        'vote_average.desc': 'Vote Average(Descending)',
        'vote_count.asc': 'Vote Count(Ascending)',
        'vote_count.desc': 'Vote Count(Descending)',
    };
    const searchTermInputRef = useRef(null);
    const sortFilterDropdownRef = useRef(null);

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
            setSearchFilterAddBtnDisabled(true);
        }
    }

    function searchFilterTextEntered (e) {
        if((e.target.value !== null) || (e.target.value !== '')) {
            setSearchFilterAddBtnDisabled(false);
        }
    }

    function addSearchFilterBtnClickHandler(prevAppliedSearchTerms) {
        let updatedAppliedSearchTerms = [...prevAppliedSearchTerms];
        let searchFilterOptionSelectedKey = '';
        let prevSearchURL = searchURL;
        if((searchTermInputRef.current.value !== null) || (searchTermInputRef.current.value !== '')) {
            console.log('searchTermInputRef: ', searchTermInputRef.current.value);
            updatedAppliedSearchTerms.push('search: ' + searchOptionsTextMap[searchFilterOptionSelected] + ' - ' + searchTermInputRef.current.value);
            setAppliedSearchTerms(updatedAppliedSearchTerms);
            if(searchFilterOptionSelected === 'name') {
                searchFilterOptionSelectedKey = 'query';
            } else if (searchFilterOptionSelected === 'primary_release_year') {
                searchFilterOptionSelectedKey = 'primary_release_year';
            } else if (searchFilterOptionSelected === 'region') {
                searchFilterOptionSelectedKey = 'region';
                searchTermInputRef.current.value = encodeURIComponent(searchTermInputRef.current.value.trim())
            } else if (searchFilterOptionSelected === 'with_original_language') {
                searchFilterOptionSelectedKey = 'language';
            }
            console.log('searchURL: ', prevSearchURL + '&' + searchFilterOptionSelectedKey + '=' + searchTermInputRef.current.value);
            setSearchURL(prevSearchURL + '&' + searchFilterOptionSelectedKey + '=' + searchTermInputRef.current.value);
            searchTermInputRef.current.value = '';
            setSearchFilterAddBtnDisabled(true);
            setShowAppliedSearchTerms('show');
        }
    }

    function sortFilterOptionChanged (e) {
        console.log(e.target.value);
        let prevSearchURL = searchURL;
        setSortFilterOptionSelected(e.target.value);
        if(e.target.value !== 'default') {
            setAppliedSortSelection(['sort: ' + sortOptionsTextMap[sortFilterDropdownRef.current.value]]);
            console.log(prevSearchURL + '&sort_by=' + sortFilterDropdownRef.current.value);
            setSearchURL(prevSearchURL + '&sort_by=' + sortFilterDropdownRef.current.value);
            sortFilterDropdownRef.current.value = 'default';
            setShowAppliedSortSelection('show');

        }
    }

    // function addSortFilterBtnClickHandler(prevSortFilterOptionSelected) {
    //     console.log('addSortFilterBtnClickHandler');
    //     let updatedAppliedSortFilters = [...prevSortFilterOptionSelected];
    //     if((sortFilterDropdownRef.current.value !== null) || (sortFilterDropdownRef.current.value !== '')) {
    //         console.log('sortFilterDropdownRef: ', sortFilterDropdownRef.current.value);
    //         updatedAppliedSortFilters.push('sort: ' + sortOptionsTextMap[sortFilterDropdownRef.current.value]);
    //         setAppliedSortSelection(updatedAppliedSortFilters);
    //         sortFilterDropdownRef.current.value = 'default';
    //         setSortFilterAddBtnDisabled(true);
    //         setShowAppliedSortSelection('show');
    //     }
    // }

    function deleteSearchTerm(idx) {
        console.log('deleteSearchTerm: delete btn clicked');
        setAppliedSearchTerms(appliedSearchTerms => appliedSearchTerms.filter((appliedSearchTerm, i) => i !== idx));
    }

    function deleteSortSel(idx) {
        console.log('deleteSortSel: delete btn clicked');
        setAppliedSortSelection(appliedSortSelection => appliedSortSelection.filter((appliedSortSel, i) => i !== idx));
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

    useEffect(() => {
        let showAppliedSearchTerms = null;
        showAppliedSearchTerms = (
            appliedSearchTerms.map((appliedSearchTerm, idx) => {
                return <MovieFilterApplied
                        appliedSearchTerm = {appliedSearchTerm}
                        filterType = {SEARCHFILTERTYPE}
                        deleteSearchTerm = {() => deleteSearchTerm(idx)}
                        key = {appliedSearchTerm}/>
            })
        )
        setAppliedSearchTermsToDisplay(showAppliedSearchTerms);
    }, [appliedSearchTerms]);

    useEffect(() => {
        let showAppliedSortSelection = null;
        showAppliedSortSelection = (
            appliedSortSelection.map((appliedSortSel, idx) => {
                return <MovieFilterApplied
                        appliedSortSel = {appliedSortSel}
                        filterType = {SORTFILTERTYPE}
                        deleteSortSel = {() => deleteSortSel(idx)}
                        key = {appliedSortSel}/>
            })
        )
        setAppliedSortSelectionToDisplay(showAppliedSortSelection);
    }, [appliedSortSelection]);

    return(
        <main className = 'main'>
            <div className = 'filters'>
                <MovieFilterDropdown label = {SEARCHFILTERLABEL} 
                                     searchFilterOptionSelected = {searchFilterOptionSelected}
                                     searchFilterOptions = {searchFilterOptions}
                                     filterType = {SEARCHFILTERTYPE}
                                     searchTermInputPlaceholder = {SEARCHTERMINPUTPLACEHOLDER}
                                     searchTermInputDisabled = {searchTermInputDisabled}
                                     addFilterBtnText = {ADDSEARCHFILTERBUTTONTEXT}
                                     searchFilterAddBtnDisabled = {searchFilterAddBtnDisabled}
                                     searchTermInputRef = {searchTermInputRef}
                                     changeOption = {(e) => searchFilterOptionChanged(e)}
                                     changeSearchTerm = {(e) => searchFilterTextEntered(e)}
                                     addSearchFilter = {(e) => addSearchFilterBtnClickHandler(appliedSearchTerms)}/>

                <MovieFilterDropdown label = {SORTFILTERLABEL} 
                                     sortFilterOptionSelected = {sortFilterOptionSelected}
                                     sortFilterOptions = {sortFilterOptions}
                                     filterType = {SORTFILTERTYPE}
                                     change = {(e) => sortFilterOptionChanged(e, sortFilterOptionSelected)}
                                    //  addFilterBtnText = {ADDSORTFILTERBUTTONTEXT}
                                    //  sortFilterAddBtnDisabled = {sortFilterAddBtnDisabled}
                                     sortFilterDropdownRef = {sortFilterDropdownRef}
                                    //  addSortFilter = {(e) => addSortFilterBtnClickHandler(appliedSortSelection)}
                                    />
                <div className = 'filters-applied'>
                    {/* {appliedSearchTermsToDisplay}
                    {appliedSortSelectionToDisplay} */}
                    <p className = {'search-filters-applied ' + showAppliedSearchTerms}>{appliedSearchTermsToDisplay}</p>
                    <p className = {'sort-filters-applied ' + showAppliedSortSelection}>{appliedSortSelectionToDisplay}</p>
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