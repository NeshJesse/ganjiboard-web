import { Group, Rect, Text } from "react-konva";

export default function WishlistCard({
  id,
  title,
  items = [],
  x,
  y,
  currentTool,
  onDragEnd,
  onCardClick,
  onEditCard,
  onStartEdit
}) {
  const cardWidth = 220;
  const cardHeight = 120 + (items.length * 22);

  const priorityColors = {
    high: "#EF4444",
    medium: "#F59E0B",
    low: "#10B981"
  };

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
        stroke="#F97316" // Orange color for wishlists
        strokeWidth={3}
        cornerRadius={12}
        shadowBlur={6}
        shadowColor="rgba(0,0,0,0.15)"
      />
      
      <Text
        text={`⭐ ${title}`}
        fontSize={16}
        fontStyle="bold"
        fill="#111827"
        x={12}
        y={12}
        width={cardWidth - 24}
        ellipsis
        onDblClick={(e) => {
          if (!onStartEdit) return;
          const stage = e.target.getStage();
          const pointer = stage.getPointerPosition();
          onStartEdit({
            id,
            type: 'wishlist',
            position: { x: pointer.x + 12, y: pointer.y + 12 },
            fields: [
              { key: 'title', label: 'Title', type: 'text' },
            ],
            initialValues: { title }
          });
        }}
      />

      {items.map((item, index) => (
        <Group key={index} x={12} y={40 + (index * 22)}>
          <Rect
            width={6}
            height={6}
            fill={priorityColors[item.priority] || "#9CA3AF"}
            cornerRadius={3}
          />
          <Text
            text={item.name}
            fontSize={12}
            fill="#374151"
            x={15}
            y={-2}
            width={cardWidth - 30}
          />
          {item.price && (
            <Text
              text={`$${item.price}`}
              fontSize={11}
              fill="#6B7280"
              x={cardWidth - 50}
              y={-2}
            />
          )}
        </Group>
      ))}
    </Group>
  );
}