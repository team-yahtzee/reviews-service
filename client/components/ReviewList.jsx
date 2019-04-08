import React from 'react';
import axios from 'axios';
import Review from './Review.jsx';
import SearchForm from './SearchForm.jsx';
import RatingStars from './RatingStars.jsx';
import ReactPaginate from 'react-paginate';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      offset: 0,
      reviews: [],
      pageCount: 1,
      searchValue: '',
      allResults: true,
      searchedWord: '',
      searchedReviews: [],
    }

    this.handleChange = this.handleChange.bind(this);
    this.renderReviews = this.renderReviews.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentDidMount() {
    this.getReviews()
    .then(({ data }) => {
      this.setState({
        reviews: data,
        pageCount: Math.ceil(data.length / 7)
      });
    })
    .catch(() => { 
      console.error('Error retrieving reviews', err);
    });
  }

  getReviews(id) {
    return axios({
     url: `/33`,
     method: 'get',
     data: { limit: 7, offset: this.state.offset } 
    })
  }

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

  getSearchResults(word) {
    axios.get(`/33/search/${word}`)
    .then(({ data }) => {
      this.setState({
        searchedReviews: data,
        allResults: false
      });
    })
    .then(() => {
      this.addSearchFeatures();
      this.boldSearchedWord();
    })
  }
    
  boldSearchedWord() {
    let { searchedReviews, searchedWord } = this.state;
    let regex = new RegExp(`(\\b)(${searchedWord})(\\b)`, 'gi');
    console.log(regex.ignoreCase)
    for (let i = 0; i < searchedReviews.length; i++) {
      let currentReview = document.getElementsByClassName(`read-more-${i}`);
      if (searchedReviews[i].text.includes(searchedWord)) {
        currentReview[0].innerHTML = searchedReviews[i].text.replace(regex, '$1<b>$2</b>$3');
      }
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    }, () => { this.renderXButton() });
  }

  handleKeyPress(e) {
    let boldedWords = document.querySelectorAll("b");
    boldedWords.forEach(word => {
      word.parentNode.replaceChild(word.firstChild, word)
    });

    if (e.charCode === 13) {
      this.getSearchResults(e.target.value);
      this.setState({
        searchedWord: e.target.value
      });
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

  handlePageClick(data) {
    console.log('selected data', data)
    let selected = data.selected;
    let offset = Math.ceil(selected * 7);

    this.setState({ offset: offset }, () => {
      this.getReviews();
    });
  };

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

  renderReviews() {
    if (this.state.allResults === true) {
      return this.sortReviews(this.state.reviews);
    } else {
      return this.sortReviews(this.state.searchedReviews);
    }
  }

  render() {
    return (
      <React.Fragment>

        {/* Total Reviews */}
        <span className="total-reviews">{this.state.reviews.length} Reviews</span>

        {/* Search */}
        <SearchForm value={this.state.searchValue} handleChange={this.handleChange} handleKeyPress={this.handleKeyPress} />
        <button className="clear-input" onClick={() => {this.handleClick()}}>&#x2715;</button>

        <hr/>

        {/* Render Stars */}
        {this.state.reviews.length > 0 ? <RatingStars reviews={this.state.reviews} /> : <p>Waiting for reviews to populate</p>}

        <hr/>

        {/* Conditional Search Elements */}
        <div className="search-features">{this.state.searchedReviews.length} guests have mentioned "<strong>{this.state.searchedWord}</strong>"</div>
        <button className="show-all-reviews" onClick={() => {this.handleClick()}}>Back to all reviews</button>

        <hr className="search-features"/> 

        {/* Reviews */}
        <Review reviews={this.renderReviews()} />

        {/* Page Numbers */}
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
      </React.Fragment>
    );
  }
}

export default ReviewList;