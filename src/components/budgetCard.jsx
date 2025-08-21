
import { Group, Rect, Text } from "react-konva";

export default function BudgetCardKonva({ id, type, title, amount, notes, x, y, onDragEnd }) {
  const colors = {
    income: "#10b981", // green
    expense: "#ef4444", // red
    savings: "#3b82f6", // blue
  };

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
        width={200}
        height={110}
        fill="white"
        stroke={colors[type]}
        strokeWidth={4}
        cornerRadius={12}
        shadowBlur={8}
      />

      {/* Title */}
      <Text text={title} fontSize={16} fontStyle="bold" fill="#111827" x={10} y={10} />

      {/* Type Tag */}
      <Text text={type.toUpperCase()} fontSize={12} fill={colors[type]} x={150} y={10} />

      {/* Amount */}
      <Text
        text={`KES ${amount}`}
        fontSize={18}
        fill={colors[type]}
        fontStyle="bold"
        x={10}
        y={40}
      />

      {/* Notes */}
      {notes && <Text text={notes} fontSize={12} fill="#6b7280" x={10} y={70} width={180} />}
    </Group>
  );
}
