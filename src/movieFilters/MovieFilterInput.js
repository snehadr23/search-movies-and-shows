import './MovieFilter.css';

function MovieFilterInput(props) {
    return (
        <input type = 'text' placeholder = {props.placeholder} disabled = {props.disabled}/>
    )
}

export default MovieFilterInput;