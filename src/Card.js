import "./App.css";

function Card({name, hostname, message, time}) {
  return (
    <>
      <div className="card">
        <div className="cardContainer">
          <h2>
            <b>{name}</b>
          </h2>
          <p>{message}</p>
          <p>{hostname}</p>
          <p>{time}</p>
        </div>
      </div>
    </>
  );
}

export default Card;
