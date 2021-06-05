import { Draggable } from "react-beautiful-dnd";

import { Letter } from "../../../game/types";
import { Card } from "../../cards/Card";

interface Props {
  draggableId: string;
  index: number;
  letter: Letter | null;
  isDragDisabled: boolean;
}

export const DraggableCard = (props: Props) => {
  const { draggableId, index, letter, isDragDisabled } = props;
  return (
    <Draggable
      draggableId={draggableId}
      index={index}
      isDragDisabled={isDragDisabled}
    >
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
