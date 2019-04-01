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
      rating: null,
      reviews: [],
      searchedReviews: [],
      searchedWord: '',
      allResults: true,
    }

    this.getReviews = this.getReviews.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.getSearchResults = this.getSearchResults.bind(this);
  }
  
  componentDidMount() {
    this.getReviews()
    .then(() => { this.calculateRating() })
    .then(() => { this.renderStars() })
    .catch(err => console.log('ERROR!', err));
  }

  calculateRating() {
    const reviews = this.state.reviews;
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

  getReviews(id) {
    return axios.get(`/apartment/2`)
    .then(({ data }) => {
      this.setState({
        reviews: data
      });
    });
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
  }

  handleKeyPress(e) {
    if (e.charCode === 13) {
      this.getSearchResults(e.target.value);
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  renderStars() {
    var rating = this.state.rating;

    for (let i = 0; i < 5; i++) {
      var star = document.getElementById(`star${i}`);
      if (rating - i >= 1) {
        star.setAttribute("src", fullStar);
      } else if (rating - i === .5) {
        star.setAttribute("src", halfStar);
      } else {
        star.setAttribute("src", emptyStar);
      }
    }
  }

  renderReviews() {
    if (this.state.allResults === true) {
      return this.state.reviews;
    } else {
      return this.state.searchedReviews;
    }
  }

  addSearchFeatures() {
    let searchFeatures = document.getElementsByClassName("search-features");
    let categoryContainer = document.getElementsByClassName("rating-category-container");

    if (this.state.allResults === false) {
      for (let i = 0; i < searchFeatures.length; i++) {
        searchFeatures[i].style.display = "block";
      }
      categoryContainer[0].style.display = "none";
    } else {
      for (let i = 0; i < searchFeatures.length; i++) {
        searchFeatures[i].style.display = "none";
      }
      categoryContainer[0].style.display = "block";
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
        <SearchForm value={this.state.searchedWord} handleChange={this.handleChange} handleKeyPress={this.handleKeyPress} />
        <hr/>
        <div className="rating-category-container">
          <div className="first-column">
            <div className="rating-category">Accurary
              <div className="star-container">
                <img className="category-star0"></img>
                <img className="category-star1"></img>
                <img className="category-star2"></img>
                <img className="category-star3"></img>
                <img className="category-star4"></img>
              </div>
            </div>
            <br/>
            <div className="rating-category">Communication
              <div className="star-container">
                <img className="category-star0"></img>
                <img className="category-star1"></img>
                <img className="category-star2"></img>
                <img className="category-star3"></img>
                <img className="category-star4"></img>
              </div>
            </div>
            <br/>
            <div className="rating-category">Cleanliness
              <div className="star-container">
                <img className="category-star0"></img>
                <img className="category-star1"></img>
                <img className="category-star2"></img>
                <img className="category-star3"></img>
                <img className="category-star4"></img>
              </div>
            </div>
          </div>
          <div className="second-column">
            <div className="rating-category">Location
              <div className="star-container">
                <img className="category-star0"></img>
                <img className="category-star1"></img>
                <img className="category-star2"></img>
                <img className="category-star3"></img>
                <img className="category-star4"></img>
              </div>
            </div>
            <br/>
            <div className="rating-category">Check-in
              <div className="star-container">
                <img className="category-star0"></img>
                <img className="category-star1"></img>
                <img className="category-star2"></img>
                <img className="category-star3"></img>
                <img className="category-star4"></img>
              </div>
            </div>
            <br/>
            <div className="rating-category">Value
              <div className="star-container">
                <img className="category-star0"></img>
                <img className="category-star1"></img>
                <img className="category-star2"></img>
                <img className="category-star3"></img>
                <img className="category-star4"></img>
              </div>
            </div>
          </div>
        </div>
        <hr/>
        <div className="search-features">{this.state.searchedReviews.length} guests have mentioned "<strong>{this.state.searchedWord}</strong>"</div>
        <hr className="search-features"/> 
        <Review reviews={this.renderReviews()} />
      </div>
    );
  }
}

export default ReviewList;