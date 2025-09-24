import { Group, Rect, Text, Circle } from "react-konva";

export default function NotesCard({
  id,
  title,
  body,
  x,
  y,
  currentTool,
  onDragEnd,
  onCardClick,
  onEditCard,
  onStartEdit,
  onDeleteCard
}) {
  const width = 240;
  const padding = 12;
  const headerHeight = 28;

  const handleDragEnd = (e) => {
    const nx = e.target.x();
    const ny = e.target.y();
    onDragEnd(id, nx, ny);
  };

  const handleClick = () => {
    if (currentTool === "connect") {
      onCardClick(id);
    }
  };

  return (
    <Group x={x} y={y} draggable onDragEnd={handleDragEnd} onClick={handleClick} onTap={handleClick}>
      <Rect width={width} height={160} fill="#FEF3C7" stroke="#FDE68A" cornerRadius={10} shadowColor="#000" shadowBlur={4} shadowOpacity={0.08} />
      <Rect width={width} height={headerHeight} fill="#FDE68A" cornerRadius={{ tl: 10, tr: 10, br: 0, bl: 0 }} />
      <Text text={title || "Note"} x={padding} y={6} width={width - padding * 2 - 30} fontStyle="bold" fontSize={14} fill="#92400E" onDblClick={(e) => {
        if (!onStartEdit) return;
        const stage = e.target.getStage();
        const pointer = stage.getPointerPosition();
        onStartEdit({
          id,
          type: 'notes',
          position: { x: pointer.x + 12, y: pointer.y + 12 },
          fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'body', label: 'Body', type: 'textarea' },
          ],
          initialValues: { title, body }
        });
      }} />
      
      {/* Delete button */}
      <Group x={width - 25} y={5}>
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
      <Text text={body || ""} x={padding} y={headerHeight + 6} width={width - padding * 2} fontSize={13} fill="#78350F" listening={false} />
    </Group>
  );
}


