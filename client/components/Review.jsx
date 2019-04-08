import $ from 'jQuery';

class Review extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      show: true
    }

    this.readMore = this.readMore.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(i, text) {
    let review = document.getElementsByClassName(`read-more-${i}`);
    let lessText = review[0].innerText.slice(0, -13);
    
    return $(`.read-more-${i}`).replaceWith(lessText + text);
    // causes error after clicking read more first and then searching for words
    // return $(`.read-more-${i}`).slice(0, -3).append(text);
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

  

  render() {
    return (
      <div>
        {this.props.reviews.map((review, i) => {
          return (
            <div key={review.text} className="review-container" >
              <div className="header-container">
                <div className="avatar">
                  <img className="avatar-pic" src={`${review.avatar}`} />
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