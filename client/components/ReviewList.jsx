import React from 'react';
import axios from 'axios';
import Review from './Review.jsx';

class ReviewList extends React.Component {
  constructor(props) {
    super(props);
  
  
    this.state = {
      reviews: []
    }

    this.getReviews = this.getReviews.bind(this);
  }

  componentDidMount() {
    this.getReviews();
  }

  getReviews(id) {
    axios.get(`/apartment/4`)
    .then(({ data }) => {
      this.setState({
        reviews: data
      })
    })
  }

  render() {
    return (
      <Review reviews={this.state.reviews} />
    );
  }
}

export default ReviewList;