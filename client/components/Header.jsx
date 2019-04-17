import SearchForm from './SearchForm.jsx';
import RatingStars from './RatingStars.jsx';

const Header = props => (
  <React.Fragment>
    {/* Total Reviews */}
    <span className="total-reviews">{props.reviewCount} Reviews</span>
  
    {/* Search */}
    <SearchForm value={props.searchValue} handleChange={props.handleChange} handleKeyPress={props.handleKeyPress} />
    <button className="clear-input" onClick={() => {props.handleClick()}}>&#x2715;</button>
  
    <hr className="header-divider1"/>
  
    {/* Render Stars */}
    {props.reviews.length > 0 ? <RatingStars reviews={props.reviews} /> : <p style={{fontFamily: "Nunito"}}>Waiting for reviews to populate...</p>}
  
    <hr id="anchor" className="header-divider2"/>
  
    {/* Conditional Search Elements */}
    <div className="search-features">
    {props.searchedReviews.length} {props.searchedReviews.length === 1 ? 'guest has mentioned' : 'guests have mentioned'} "<strong>{props.searchedWord}</strong>"
    </div>
    <button className="show-all-reviews" onClick={() => {props.handleClick()}}>Back to all reviews</button>
  
    <hr className="search-features"/> 
  </React.Fragment>
);

export default Header;