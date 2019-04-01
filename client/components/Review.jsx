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

  handleClick(text) {
    return $(".read-more").append(text);
  }

  readMore(text) {
    if (text.length > 280) {
      const lessText = text.slice(0, 280);
      const moreText = text.slice(280, text.length);
      
      return <React.Fragment>{lessText} <button onClick={() => this.handleClick(moreText)}>Read more</button></React.Fragment>

    } else {
      return text;
    }
  }

  

  render() {
    return (
      <div>
        {this.props.reviews.map(review => {
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
                <div className="read-more">{this.readMore(review.text)}</div>
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