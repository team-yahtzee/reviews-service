const SearchForm = (props) => {
  return (
    <div>
      <input className="search-form" name="searchedWord" onKeyPress={props.handleKeyPress} placeholder="Search reviews" />
    </div>
  );
}

export default SearchForm;