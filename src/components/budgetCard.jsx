import { Group, Rect, Text } from "react-konva";

export default function BudgetCardKonva({ id, type, title, amount, notes, x, y, onDragEnd }) {
  const colors = {
    income: "#10b981", // green
    expense: "#ef4444", // red
    savings: "#3b82f6", // blue
  };

  const cardWidth = 220;
  const cardHeight = 120;

  return (
    <Group
      x={x}
      y={y}
      draggable
      onDragEnd={(e) => {
        onDragEnd(id, e.target.x(), e.target.y());
      }}
    >
      {/* Card Background */}
      <Rect
        width={cardWidth}
        height={cardHeight}
        fill="white"
        stroke={colors[type]}
        strokeWidth={3}
        cornerRadius={12}
        shadowBlur={6}
        shadowColor="rgba(0,0,0,0.15)"
      />

      {/* Title */}
      <Text
        text={title}
        fontSize={16}
        fontStyle="bold"
        fill="#111827"
        x={12}
        y={12}
        width={cardWidth - 70} // keep space for badge
        ellipsis
      />

      {/* Type Badge */}
      <Group x={cardWidth - 60} y={10}>
        <Rect
          width={50}
          height={20}
          fill={colors[type]}
          cornerRadius={10}
        />
        <Text
          text={type.charAt(0).toUpperCase() + type.slice(1)}
          fontSize={11}
          fill="white"
          width={50}
          height={20}
          align="center"
          verticalAlign="middle"
        />
      </Group>

      {/* Amount */}
      <Text
        text={`KES ${amount}`}
        fontSize={18}
        fill={colors[type]}
        fontStyle="bold"
        x={12}
        y={44}
      />

      {/* Notes */}
      {notes && (
        <Text
          text={notes}
          fontSize={12}
          fill="#6b7280"
          x={12}
          y={72}
          width={cardWidth - 24}
          ellipsis
        />
      )}
    </Group>
  );
}
