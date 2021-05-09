import './MovieFilter.css';
import MovieFilerInput from './MovieFilterInput';
import FilterOption    from './MovieFilterOption';

function MovieFilterDropdown(props) {
    if (props.filterType === 'search') {
        return (
            <p>
                <label htmlFor = 'searchFilter'>{props.label}</label>
                <select value = {props.searchFilterOptionSelected} id = 'searchFilter' className = 'search-filter' onChange = {props.changeOption}>
                    {props.searchFilterOptions.map((option) => {
                        return (
                            <FilterOption option = {option} filterType = {props.filterType}/>
                        )
                    })}
                </select>
                <MovieFilerInput placeholder = {props.searchTermInputPlaceholder} disabled = {props.searchTermInputDisabled} change = {props.changeSearchTerm} searchTermInputRef = {props.searchTermInputRef}/>
                <button className = 'btn-add-filter' disabled = {props.searchFilterAddBtnDisabled} onClick = {props.addSearchFilter}>{props.addFilterBtnText}</button>
            </p>
        )
    } else if (props.filterType === 'sort') {
        return (
            <p>
                <label htmlFor = 'sortFilter'>{props.label}</label>
                <select value = {props.sortFilterOptionSelected} id = 'sortFilter' className = 'sort-filter' onChange = {props.change} ref = {props.sortFilterDropdownRef}>
                    {props.sortFilterOptions.map((option) => {
                        return (
                            <FilterOption option = {option} filterType = {props.filterType}/>
                        )
                    })}
                </select>
                {/* <button className = 'btn-add-filter' disabled = {props.sortFilterAddBtnDisabled} onClick = {props.addSortFilter}>{props.addFilterBtnText}</button> */}
            </p>
        )
    }
}

export default MovieFilterDropdown;