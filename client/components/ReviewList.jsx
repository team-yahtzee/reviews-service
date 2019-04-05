import React from 'react';
import axios from 'axios';
import Review from './Review.jsx';
import SearchForm from './SearchForm.jsx';
import emptyStar from '../../public/images/empty-star.png';
import halfStar from '../../public/images/half-star.png';
import fullStar from '../../public/images/full-star.png';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      reviews: [],
      rating: null,
      allResults: true,
      searchedWord: '',
      searchedReviews: [],
      categories: ['accuracy', 'communication', 'cleanliness', 'location', 'check-in', 'value']
    }

    this.renderReviews = this.renderReviews.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  
  boldSearchedWord() {
    let { searchedReviews, searchedWord } = this.state;
    let regex = new RegExp(`(\\b)(${searchedWord})(\\b)`, 'gi');
    for (let i = 0; i < searchedReviews.length; i++) {
      var currentReview = document.getElementsByClassName(`read-more-${i}`);
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
    return axios.get(`/apartment/100`)
    .then(({ data }) => {
      this.setState({
        reviews: data
      });
    });
  }

  sortReviews(dates) {
    return dates.sort((a, b) => {
      const dateA = new Date(a.date.replace(' ', ', '));
      const dateB = new Date(b.date.replace(' ', ', '));
      return dateB - dateA;
    });
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
      categoryContainer[0].style.display = "block";
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
        <SearchForm value={this.state.searchedWord} handleKeyPress={this.handleKeyPress} />
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
      </div>
    );
  }
}

export default ReviewList;