import { Draggable } from "@react-forked/dnd";

import { Letter, OwnerType } from "../../../game/types";
import { Card } from "../../cards/Card";

interface Props {
  draggableId: string;
  index: number;
  letter: Letter | null;
  destinedOwner: OwnerType;
  isDragDisabled: boolean;
}

export const DraggableCard = (props: Props) => {
  const { draggableId, index, letter, destinedOwner, isDragDisabled } = props;
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
          <Card letter={letter} destinedOwner={destinedOwner} />
        </div>
      )}
    </Draggable>
  );
};
