import React from 'react';
import axios from 'axios';
import Review from './Review.jsx';
import SearchForm from './SearchForm.jsx';
import ReactPaginate from 'react-paginate';
import emptyStar from '../../public/images/airbnb-empty-star.png';
import halfStar from '../../public/images/airbnb-half-star.png';
import fullStar from '../../public/images/airbnb-full-star.png';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      offset: 0,
      reviews: [],
      rating: null,
      pageCount: 1,
      searchValue: '',
      allResults: true,
      searchedWord: '',
      searchedReviews: [],
      categories: ['accuracy', 'communication', 'cleanliness', 'location', 'check-in', 'value']
    }

    this.handleChange = this.handleChange.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }
  
  boldSearchedWord() {
    let { searchedReviews, searchedWord } = this.state;
    let regex = new RegExp(`(\\b)(${searchedWord})(\\b)`, 'gi');
    for (let i = 0; i < searchedReviews.length; i++) {
      let currentReview = document.getElementsByClassName(`read-more-${i}`);
      if (searchedReviews[i].text.includes(searchedWord)) {
        currentReview[0].innerHTML = searchedReviews[i].text.replace(regex, '$1<b>$2</b>$3');
      }
    }
  }

  componentDidMount() {
    this.getReviews()
    .then(() => { this.calculateRating(this.state.reviews) })
    .then(() => { this.renderStars() })
    .then(() => { this.renderCategoryStars() })
    .catch(err => console.log('ERROR!', err));
  }

  getReviews(id) {
    return axios({
     url: `/apartment/33`,
     method: 'get',
     data: { limit: 7, offset: this.state.offset } 
    })
    .then(({ data }) => {
      console.log(data)
      this.setState({
        reviews: data,
        pageCount: Math.ceil(data.length / 7)
      });
    })
    .catch(() => { 
      console.error('Error retrieving reviews');
    });
  }

  handlePageClick(data) {
    console.log('selected data', data)
    let selected = data.selected;
    let offset = Math.ceil(selected * 7);

    this.setState({ offset: offset }, () => {
      this.getReviews();
    });
  };

  sortReviews(dates) {
    return dates.sort((a, b) => {
      const dateA = new Date(a.date.replace(' ', ', '));
      const dateB = new Date(b.date.replace(' ', ', '));
      return dateB - dateA;
    });
  }

  renderXButton() {
    let clearInputButton = document.getElementsByClassName("clear-input");

    if (this.state.searchValue !== '') {
      clearInputButton[0].style.display = "block";
    } else {
      clearInputButton[0].style.display = "none";
    }
  }

  calculateRating(reviews) {
    let total = 0;
    let average;
    
    for (let i = 0; i < reviews.length; i++) {
      total += reviews[i].rating;
    }

    average = total / reviews.length;
    let firstDigit = Number(average.toString()[0]);

    if (.5 - (average - firstDigit) > -.25 && .5 - (average - firstDigit) <= .25) {
      average = firstDigit + .5;
    } else {
      average = firstDigit;
    }
    
    this.setState({
      rating: average + 1.5
    });
  }

  calculateCategoryRatings(rating) {
    let firstDigit = Number(rating.toString()[0]);

    if (.5 - (rating - firstDigit) > -.25 && .5 - (rating - firstDigit) <= .25) {
      return firstDigit + .5;
    } else {
      return firstDigit;
    }
  }

  getSearchResults(word) {
    axios.get(`/apartment/33/search/${word}`)
    .then(({ data }) => {
      this.setState({
        searchedReviews: data,
        allResults: false
      });
    })
    .then(() => {
      this.addSearchFeatures();
    })
    .then(() => {
      this.boldSearchedWord();
    })
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => { this.renderXButton() });
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      this.getSearchResults(e.target.value);
      this.setState({
        searchedWord: e.target.value
      })
    }
  }

  handleClick() {
    this.setState({
      allResults: true
    }, () => {this.addSearchFeatures()});

    // Unbolds searched words
    let boldedWords = document.querySelectorAll("b");
    boldedWords.forEach(word => {
      word.parentNode.replaceChild(word.firstChild, word)
    });

    // Clears input form
    let input = document.getElementsByClassName("search-form");
    let clearInputButton = document.getElementsByClassName("clear-input");
    input[0].value = '';
    clearInputButton[0].style.display = "none";
  }

  renderStars() {
    let rating = this.state.rating;

    for (let i = 0; i < 5; i++) {
      let star = document.getElementById(`star${i}`);
      if (rating - i >= 1) {
        star.setAttribute("src", fullStar);
      } else if (rating - i === .5) {
        star.setAttribute("src", halfStar);
      } else {
        star.setAttribute("src", emptyStar);
      }
    }
  }

  renderCategoryStars() {
    let categories = this.state.categories;

    for (let i = 0; i < categories.length; i++) {
      for (let j = 0; j < 5; j++) {
        let star = document.getElementsByClassName(`${categories[i]}-category-star${j}`);
        if (this.calculateCategoryRatings(Math.random() * 2 + 4) - j >= 1) {
          star[0].setAttribute("src", fullStar);
        } else if (this.calculateCategoryRatings(Math.random() * 2 + 4) - j === .5) {
          star[0].setAttribute("src", halfStar);
        } else {
          star[0].setAttribute("src", emptyStar);
        }
      }
    }
  }

  renderReviews() {
    if (this.state.allResults === true) {
      return this.sortReviews(this.state.reviews);
    } else {
      return this.sortReviews(this.state.searchedReviews);
    }
  }

  addSearchFeatures() {
    let searchFeatures = document.getElementsByClassName("search-features");
    let categoryContainer = document.getElementsByClassName("rating-category-container");
    let showAllReviewsButton = document.getElementsByClassName("show-all-reviews");
    
    if (this.state.allResults === false) {
      for (let i = 0; i < searchFeatures.length; i++) {
        searchFeatures[i].style.display = "block";
      }
      categoryContainer[0].style.display = "none";
      showAllReviewsButton[0].style.display = "block";
    } else {
      for (let i = 0; i < searchFeatures.length; i++) {
        searchFeatures[i].style.display = "none";
      }
      categoryContainer[0].style.display = "flex";
      showAllReviewsButton[0].style.display = "none";
    }
  }

  render() {
    return (
      <div>
        <span className="total-reviews">{this.state.reviews.length} Reviews</span>
        <div id="star-container">
          <img id="star0"></img>
          <img id="star1"></img>
          <img id="star2"></img>
          <img id="star3"></img>
          <img id="star4"></img>
        </div>
        <SearchForm value={this.state.searchValue} handleChange={this.handleChange} handleKeyPress={this.handleKeyPress} />
        <button className="clear-input" onClick={() => {this.handleClick()}}>&#x2715;</button>
        <hr/>
        <div className="rating-category-container">
          <div className="first-column">
            <div className="rating-category">Accurary
              <div className="left-star-category-container">
                <img className="accuracy-category-star0"></img>
                <img className="accuracy-category-star1"></img>
                <img className="accuracy-category-star2"></img>
                <img className="accuracy-category-star3"></img>
                <img className="accuracy-category-star4"></img>
              </div>
            </div>
            <br/>           
            <div className="rating-category">Communication
              <div className="left-star-category-container">
                <img className="communication-category-star0"></img>
                <img className="communication-category-star1"></img>
                <img className="communication-category-star2"></img>
                <img className="communication-category-star3"></img>
                <img className="communication-category-star4"></img>
              </div>
            </div>
            <br/>
            <div className="rating-category">Cleanliness
              <div className="left-star-category-container">
                <img className="cleanliness-category-star0"></img>
                <img className="cleanliness-category-star1"></img>
                <img className="cleanliness-category-star2"></img>
                <img className="cleanliness-category-star3"></img>
                <img className="cleanliness-category-star4"></img>
              </div>
            </div>
          </div>
          <div className="second-column">
            <div className="rating-category">Location
              <div className="right-star-category-container">
                <img className="location-category-star0"></img>
                <img className="location-category-star1"></img>
                <img className="location-category-star2"></img>
                <img className="location-category-star3"></img>
                <img className="location-category-star4"></img>
              </div>
            </div>
            <br/>
            <div className="rating-category">Check-in
              <div className="right-star-category-container">
                <img className="check-in-category-star0"></img>
                <img className="check-in-category-star1"></img>
                <img className="check-in-category-star2"></img>
                <img className="check-in-category-star3"></img>
                <img className="check-in-category-star4"></img>
              </div>
            </div>
            <br/>
            <div className="rating-category">Value
              <div className="right-star-category-container">
                <img className="value-category-star0"></img>
                <img className="value-category-star1"></img>
                <img className="value-category-star2"></img>
                <img className="value-category-star3"></img>
                <img className="value-category-star4"></img>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div className="search-features">{this.state.searchedReviews.length} guests have mentioned "<strong>{this.state.searchedWord}</strong>"</div>
        <button className="show-all-reviews" onClick={() => {this.handleClick()}}>Back to all reviews</button>
        <hr className="search-features"/> 
        <Review reviews={this.renderReviews()} />
        <ReactPaginate
          previousLabel={'<'}
          nextLabel={'>'}
          breakLabel={'...'}
          breakClassName={'break-me'}
          itemClass={'item'}
          pageClassName={'page'}
          pageCount={this.state.pageCount}
          marginPagesDisplayed={1}
          pageRangeDisplayed={3}
          onPageChange={this.handlePageClick}
          containerClassName={'pagination'}
          subContainerClassName={'pages pagination'}
          activeClassName={'active'}
        />
      </div>
    );
  }
}

export default ReviewList;