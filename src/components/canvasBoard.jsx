import { Stage, Layer, Line } from "react-konva";
import BudgetCardKonva from "./budgetCard";

export default function CanvasBoard({ cards, onUpdateCard }) {
  const width = window.innerWidth;
  const height = window.innerHeight;

  // Generate grid lines
  const gridSize = 40;
  const gridLines = [];
  for (let i = 0; i < width / gridSize; i++) {
    gridLines.push(
      <Line
        key={`v-${i}`}
        points={[i * gridSize, 0, i * gridSize, height]}
        stroke="#e5e7eb"
        strokeWidth={1}
      />
    );
  }
  for (let j = 0; j < height / gridSize; j++) {
    gridLines.push(
      <Line
        key={`h-${j}`}
        points={[0, j * gridSize, width, j * gridSize]}
        stroke="#e5e7eb"
        strokeWidth={1}
      />
    );
  }

  return (
    <Stage width={width} height={height}>
      {/* Grid Background */}
      <Layer>{gridLines}</Layer>

      {/* Cards Layer */}
      <Layer>
        {cards.map((card) => (
          <BudgetCardKonva
            key={card.id}
            {...card}
            onDragEnd={onUpdateCard}
          />
        ))}
      </Layer>
    </Stage>
  );
}
