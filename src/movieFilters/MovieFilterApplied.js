import './MovieFilter.css';

function MovieFilterApplied(props) {
    if(props.filterType === 'search') {
        return (
            <span>{props.appliedSearchTerm}<button onClick = {props.deleteSearchTerm}>x</button></span>
        )
    } else if (props.filterType === 'sort') {
        return (
            <span>{props.appliedSortSel}<button onClick = {props.deleteSortSel}>x</button></span>
        )
    }
    
}

export default MovieFilterApplied;