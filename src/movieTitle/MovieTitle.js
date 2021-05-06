import './MovieTitle.css';

function MovieTitle(props) {
    return (
        <p onClick = {props.click}>{props.movieTitle}</p>
    )
}

export default MovieTitle;