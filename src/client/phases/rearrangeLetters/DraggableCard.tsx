import { Draggable } from "react-beautiful-dnd";

import { Letter } from "../../../game/types";
import { Card } from "../../cards/Card";

interface Props {
  draggableId: string;
  index: number;
  letter: Letter | null;
}

export const DraggableCard = (props: Props) => {
  const { draggableId, index, letter } = props;
  return (
    <Draggable draggableId={draggableId} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card letter={letter} />
        </div>
      )}
    </Draggable>
  );
};
