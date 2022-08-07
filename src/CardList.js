import "./App.css";
import Card from "./Card";

function CardList() {
  return (
    <>
      <div class="row">
        <div class="column">
          <Card />
        </div>
        <div class="column">
          <Card />
        </div>
        <div class="column">
          <Card />
        </div>
        <div class="column">
          <Card />
        </div>
      </div>
    </>
  );
}

export default CardList;
