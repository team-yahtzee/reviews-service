import React from 'react';
import axios from 'axios';
import Review from './Review.jsx';
import Header from './Header.jsx';
import Pagination from './Pagination.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      id: 0,
      offset: 0,
      reviews: [],
      pageCount: 1,
      reviewCount: 0,
      searchValue: '',
      searchedWord: '',
      allResults: true,
      searchedReviews: [],
      paginatedReviews: []
    }

    this.setOffset = this.setOffset.bind(this);
    this.getReviews = this.getReviews.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentDidMount() {
    this.getReviews(window.location.pathname.substring(1));
  }
  
  getReviews(id) {
    return axios({
      // url: `http://localhost:3002/room/${id}`,
      url: `3.95.167.44/room/${id}`,
      method: 'get',
      params: { limit: 7, offset: this.state.offset } 
    })
    .then(({ data }) => {
      this.setState({
        id: id,
        reviewCount: data.meta.total_count,
        reviews: data.data,
        paginatedReviews: data.comments,
        pageCount: Math.ceil(data.meta.total_count / data.meta.limit)
      });
    })
    .catch((err) => { console.error('Error retrieving reviews', err) });
  }

  renderXButton() {
    let clearInputButton = document.getElementsByClassName("clear-input");

    if (this.state.searchValue !== '') {
      clearInputButton[0].style.display = "block";
    } else {
      clearInputButton[0].style.display = "none";
    }
  }

  getSearchResults(id, word) {
    axios.get(`http://localhost:3002/${id}/search/${word}`)
    // axios.get(`http://ec2-3-17-160-21.us-east-2.compute.amazonaws.com:3002${id}/search/${word}`)
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
    .catch(err => { console.error(err) });
  }
    
  boldSearchedWord() {
    let { searchedReviews, searchedWord } = this.state;
    let regex = new RegExp(`(\\b)(${searchedWord})(\\b)`, 'gi');

    for (let i = 0; i < searchedReviews.length; i++) {
      let currentReview = document.getElementsByClassName(`read-more${i}`);
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
      word.parentNode.replaceChild(word.firstChild, word);
    });

    if (e.charCode === 13) {
      this.getSearchResults(this.state.id, e.target.value);
      this.setState({
        searchedWord: e.target.value
      });
    }
  }

  handleClick() {
    this.setState({
      allResults: true,
      searchedReviews: []
    }, () => { this.addSearchFeatures() });

    // Unbolds searched words
    let boldedWords = document.querySelectorAll("b");
    boldedWords.forEach(word => {
      word.parentNode.replaceChild(word.firstChild, word);
    });

    // Clears input form
    let input = document.getElementsByClassName("search-form");
    let clearInputButton = document.getElementsByClassName("clear-input");
    input[0].value = '';
    clearInputButton[0].style.display = "none";
  }

  setOffset(offset) {
    this.setState({ offset: offset }, () => { this.getReviews(this.state.id) });
  }

  addSearchFeatures() {
    let searchFeatures = document.getElementsByClassName("search-features");
    let categoryContainer = document.getElementsByClassName("rating-category-container");
    let showAllReviewsButton = document.getElementsByClassName("show-all-reviews");

    if (this.state.allResults === false) {
      categoryContainer[0].style.display = "none";
      searchFeatures[0].style.display = "block";
      searchFeatures[1].style.display = "block";
      showAllReviewsButton[0].style.display = "block";
    } else {
      categoryContainer[0].style.display = "flex";
      searchFeatures[0].style.display = "none";
      searchFeatures[1].style.display = "none";
      showAllReviewsButton[0].style.display = "none";
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header reviewCount={this.state.reviewCount} searchValue={this.state.searchValue} handleChange={this.handleChange} handleKeyPress={this.handleKeyPress} handleClick={this.handleClick} reviews={this.state.reviews} searchedReviews={this.state.searchedReviews} searchedWord={this.state.searchedWord} />

        <Review allReviews={this.state.reviews} paginatedReviews={this.state.paginatedReviews} searchedReviews={this.state.searchedReviews} />

        <Pagination pageCount={this.state.pageCount} id={this.state.id} getReviews={this.getReviews} setOffset={this.setOffset} />
      </React.Fragment>
    );
  }
}

export default ReviewList;