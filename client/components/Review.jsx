import Response from './Response.jsx';

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    }

    this.readMore = this.readMore.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.appendResponses = this.appendResponses.bind(this);
  }

  handleClick(i, text) {
    let review = document.getElementsByClassName(`read-more-${i}`);
    let lessText = review[0].innerText.slice(0, -13);

    return review[0].innerText = lessText + text;
  }

  readMore(index, text) {
    if (text.length > 280) {
      for (let i = 280; i > 0; i--) {
        if (text[i + 1] === ' ') {
          var lessText = text.slice(0, i + 1) + '...';
          var moreText = text.slice(i + 1, text.length);
          break;
        } 
      }
      return (
        <React.Fragment>
          {lessText} <button className="read-more-button" onClick={() => this.handleClick(index, moreText)}>Read more</button>
        </React.Fragment>
      );
    } else {
      return text;
    }
  }

  appendResponses() {
    let reviews = this.props.reviews;
    let owner = reviews[reviews.length - 1];
    // console.log(owner)
    if (Math.random() * reviews.length > reviews.length / 1.5) {
      return <Response review={owner} />;
    }
  }

  render() {
    return (
      <div>
        {this.props.reviews.map((review, i) => {
          return (
            <div key={review.text} className="review-container">
              <div className="header-container">
                <div>
                  <img className="avatar" src={`${review.avatar}`}/>
                </div>
                <div className="name">
                  <div>{review.name}</div> 
                </div>
                <div className="date">
                  <div>{review.date}</div>
                </div>
              </div>
              <div className="text">
                <div className={`read-more-${i}`}>{this.readMore(i, review.text)}</div>
                {this.appendResponses()}
              </div>
              <hr className="divider"/>
            </div>
          );
        })}
      </div>
    );
  }
}


export default Review;