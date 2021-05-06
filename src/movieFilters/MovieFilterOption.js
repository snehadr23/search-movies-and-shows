import './MovieFilter.css';

function MovieFilterOption(props) {
    const searchOptionsTextMap = {
        default: 'Select an option',
        name: 'Name',
        category: 'Category',
        primary_release_year: 'Release Year',
        with_genres: 'Genre',
        with_original_language: 'Original Language'
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
    }
    if (props.filterType === 'search') {
        return (
            <option value = {props.option}>{searchOptionsTextMap[props.option]}</option>
        )
    } else if (props.filterType === 'sort') {
        return (
            <option value = {props.option}>{sortOptionsTextMap[props.option]}</option>
        )
    }
}

export default MovieFilterOption;