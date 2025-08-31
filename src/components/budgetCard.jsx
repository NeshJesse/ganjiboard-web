import { Group, Rect, Text } from "react-konva";

export default function BudgetCardKonva({
  id,
  type,
  title,
  amount,
  notes,
  x,
  y,
  currentTool,
  onDragEnd,
  onCardClick,
  onEditCard,
  onStartEdit,
}) {
  const colors = {
    income: "#10b981",
    expense: "#ef4444",
    savings: "#3b82f6",
  };

  const cardWidth = 220;
  const cardHeight = 120;

  return (
    <Group
      x={x}
      y={y}
      draggable
      onDragEnd={(e) => onDragEnd(id, e.target.x(), e.target.y())}
      onClick={() => {
        if (currentTool === "connect") onCardClick(id);
      }}
      onDblClick={(e) => {
        if (!onStartEdit) return;
        const stage = e.target.getStage();
        const pointer = stage.getPointerPosition();
        onStartEdit({
          id,
          type: 'budget',
          position: { x: pointer.x + 12, y: pointer.y + 12 },
          fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'amount', label: 'Amount', type: 'number' },
            { key: 'notes', label: 'Notes', type: 'textarea' },
          ],
          initialValues: { title, amount, notes }
        });
      }}
    >
      {/* ... rest of your card rendering code ... */}
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
      <Text
        text={title}
        fontSize={16}
        fontStyle="bold"
        fill="#111827"
        x={12}
        y={12}
        width={cardWidth - 70}
        ellipsis
      />
      <Group x={cardWidth - 60} y={10}>
        <Rect width={50} height={20} fill={colors[type]} cornerRadius={10} />
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
      
      <Text
        text={`KES ${amount}`}
        fontSize={18}
        fill={colors[type]}
        fontStyle="bold"
        x={12}
        y={44}
      />
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