const SearchForm = (props) => {
  return (
    <div>
      <input className="search-form" name="searchedWord" onChange={props.handleChange} onKeyPress={props.handleKeyPress} placeholder="Search reviews" />
    </div>
  );
}

export default SearchForm;