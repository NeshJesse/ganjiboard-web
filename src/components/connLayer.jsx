import { Arrow } from "react-konva";

export default function ConnectionLayer({ cards, connections }) {
  // Find center of a card - FIXED calculation
  const getCardCenter = (card) => ({
    x: card.x + 110, // half of cardWidth (220/2)
    y: card.y + 60,  // half of cardHeight (120/2)
  });

  return (
    <>
      {connections.map((conn) => {
        const fromCard = cards.find((c) => c.id === conn.fromId);
        const toCard = cards.find((c) => c.id === conn.toId);

        if (!fromCard || !toCard) return null;

        const from = getCardCenter(fromCard);
        const to = getCardCenter(toCard);

        return (
          <Arrow
            key={conn.id}
            points={[from.x, from.y, to.x, to.y]}
            stroke="#374151"
            fill="#374151"
            strokeWidth={2}
            pointerLength={10}
            pointerWidth={10}
          />
        );
      })}
    </>
  );
}