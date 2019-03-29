const Review = (props) => {
  return (
    <div>
      {props.reviews.map(review => {
        return (
          <div>
            <img src={`${review.avatar}`} />
            <div>{review.name}</div> 
            <div>{review.date}</div>
            <div>{review.text}</div>
          </div>
        );
      })}
    </div>
  );
}

export default Review;