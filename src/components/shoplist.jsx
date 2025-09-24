import { Group, Rect, Text, Circle } from "react-konva";


export default function ShoppingListCard({
  id,
  title,
  items = [],
  totalCost = "",
  x,
  y,
  currentTool,
  onDragEnd,
  onCardClick,
  onItemToggle,
  onEditCard,
  onStartEdit,
  onDeleteCard
}) {
  const cardWidth = 240; // Slightly wider to accommodate cost
  const cardHeight = 140 + (items.length * 25); // Extra height for cost field

  return (
    <Group
      x={x}
      y={y}
      draggable
      onDragEnd={(e) => onDragEnd(id, e.target.x(), e.target.y())}
      onClick={() => {
        if (currentTool === "connect") onCardClick(id);
      }}
    >
      <Rect
        width={cardWidth}
        height={cardHeight}
        fill="white"
        stroke="#8B5CF6"
        strokeWidth={3}
        cornerRadius={12}
        shadowBlur={6}
        shadowColor="rgba(0,0,0,0.15)"
      />
      
      {/* Header */}
      <Text
        text={`🛒 ${title}`}
        fontSize={16}
        fontStyle="bold"
        fill="#111827"
        x={12}
        y={12}
        width={cardWidth - 50}
        ellipsis
        onDblClick={(e) => {
          if (!onStartEdit) return;
          const stage = e.target.getStage();
          const pointer = stage.getPointerPosition();
          onStartEdit({
            id,
            type: 'shopping',
            position: { x: pointer.x + 12, y: pointer.y + 12 },
            fields: [
              { key: 'title', label: 'Title', type: 'text' },
              { key: 'totalCost', label: 'Total cost', type: 'number' },
            ],
            initialValues: { title, totalCost }
          });
        }}
      />
      
      {/* Delete button */}
      <Group x={cardWidth - 25} y={5}>
        <Circle
          radius={10}
          fill="#ef4444"
          stroke="#dc2626"
          strokeWidth={1}
          onClick={(e) => {
            e.cancelBubble = true;
            if (onDeleteCard) onDeleteCard(id);
          }}
        />
        <Text
          text="×"
          fontSize={14}
          fill="white"
          width={20}
          height={20}
          align="center"
          verticalAlign="middle"
          x={-10}
          y={-10}
          onClick={(e) => {
            e.cancelBubble = true;
            if (onDeleteCard) onDeleteCard(id);
          }}
        />
      </Group>

      {/* Total Cost Display */}
      {totalCost && (
        <Group x={12} y={35}>
          <Rect
            width={cardWidth - 24}
            height={25}
            fill="#F3F4F6"
            cornerRadius={6}
          />
          <Text
            text={`Total: KES ${totalCost}`}
            fontSize={14}
            fontStyle="bold"
            fill="#374151"
            x={8}
            y={5}
            width={cardWidth - 40}
          />
        </Group>
      )}

      {/* Items List */}
      <Group x={12} y={totalCost ? 70 : 40}>
        {items.map((item, index) => (
          <Group key={index} y={index * 25}>
            <Circle
              x={10}
              y={10}
              radius={8}
              stroke={item.checked ? "#10B981" : "#D1D5DB"}
              strokeWidth={2}
              fill={item.checked ? "#10B981" : "transparent"}
              onClick={() => onItemToggle(id, index)}
            />
            <Text
              text={item.name}
              fontSize={14}
              fill={item.checked ? "#9CA3AF" : "#374151"}
              x={25}
              y={4}
              width={cardWidth - 40}
              textDecoration={item.checked ? "line-through" : "none"}
            />
          </Group>
        ))}
      </Group>
    </Group>
  );
}