import { Stage, Layer, Line } from "react-konva";
import BudgetCardKonva from "./budgetCard";
import ConnectionLayer from "./connLayer";
import ShoppingListCard from "./shoplist";
import WishlistCard from "./wishlist";

export default function CanvasBoard({ 
  cards, 
  connections, 
  currentTool, 
  onUpdateCard, 
  onCardClick, 
  onItemToggle 
}) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  
  const gridSize = 40;
  const gridLines = [];
  for (let i = 0; i < width / gridSize; i++) {
    gridLines.push(
      <Line key={`v-${i}`} points={[i * gridSize, 0, i * gridSize, height]} stroke="#f3f4f6" />
    );
  }
  for (let j = 0; j < height / gridSize; j++) {
    gridLines.push(
      <Line key={`h-${j}`} points={[0, j * gridSize, width, j * gridSize]} stroke="#f3f4f6" />
    );
  }

  return (
    <Stage width={width} height={height}>
      <Layer>{gridLines}</Layer>

      <Layer>
        <ConnectionLayer cards={cards} connections={connections} />
      </Layer>

      <Layer>
        {cards.map((card) => {
          switch (card.cardType) {
            case "shopping":
              return (
                <ShoppingListCard
                  key={card.id}
                  {...card}
                  currentTool={currentTool}
                  onDragEnd={onUpdateCard}
                  onCardClick={onCardClick}
                  onItemToggle={onItemToggle}
                />
              );
            
            case "wishlist":
              return (
                <WishlistCard
                  key={card.id}
                  {...card}
                  currentTool={currentTool}
                  onDragEnd={onUpdateCard}
                  onCardClick={onCardClick}
                />
              );
            
            default: // budget card
              return (
                <BudgetCardKonva
                  key={card.id}
                  {...card}
                  currentTool={currentTool}
                  onDragEnd={onUpdateCard}
                  onCardClick={onCardClick}
                />
              );
          }
        })}
      </Layer>
    </Stage>
  );
}