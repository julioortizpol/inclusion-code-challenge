import "./App.css";

function Card({name = '', hostname, message, time, success}) {
  const messageColor = (success) ? {color:"green"}:{color:'red'}
  return (
    <>
      <div className="card">
        <div className="cardContainer">
          <h2>
            <b>{name.toLocaleUpperCase()}</b>
          </h2>
          <p style={messageColor}>{message}</p>
          <p>{hostname}</p>
          <p>{time}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
