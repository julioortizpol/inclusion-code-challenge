import "./App.css";
import Card from "./Card";

function CardList({list}) {
  return (
    <>
      <div class="row">
        {list.map(element =>
            <div class="column">
            <Card
              {...element}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default CardList;
