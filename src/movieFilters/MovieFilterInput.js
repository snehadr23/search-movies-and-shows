import './MovieFilter.css';

function MovieFilterInput(props) {
    return (
        <input type = 'text' placeholder = {props.placeholder} disabled = {props.disabled} onChange = {props.change} ref = {props.searchTermInputRef}/>
    )
}

export default MovieFilterInput;