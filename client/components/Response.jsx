const Response = props => (
  <React.Fragment>
    <div className="response-container">
      <div className="avatar">
        <img className="response-avatar" src={props.review.avatar}/>
      </div>
      <div className="response-name">
        <div>Response from {props.review.name}:</div>
      </div>
      <div className="response-text">
        <div>{props.review.text}</div>
      </div>
      <div className="response-date">
        <div>{props.review.date}</div>
      </div>
    </div>
  </React.Fragment>
)

export default Response;