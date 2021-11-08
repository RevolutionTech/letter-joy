import { LETTERS_PER_PLAYER } from "../../../../game/constants";
import { Button } from "../../../panels/Button";
import { SidebarContent } from "../../../panels/sidebar/SidebarContent";

interface Props {
  numSortedCards: number;
  onConfirmSortedCards: () => void;
  onResetSortedCards: () => void;
}

export const ConfirmSortedCardsContent = (props: Props) => {
  const { numSortedCards, onConfirmSortedCards, onResetSortedCards } = props;
  return (
    <SidebarContent
      header="Rearrange Letters"
      buttons={[
        <Button
          key="confirm"
          variant="contained"
          color="primary"
          disabled={numSortedCards < LETTERS_PER_PLAYER}
          onClick={onConfirmSortedCards}
        >
          Confirm
        </Button>,
        <Button
          key="reset"
          variant="outlined"
          disabled={numSortedCards === 0}
          onClick={onResetSortedCards}
        >
          Reset
        </Button>,
      ]}
    >
      <div style={{ fontSize: "16pt" }}>
        Rearrange your letters to spell a word. You may use bonus letters too,
        but then no one else can.
      </div>
    </SidebarContent>
  );
};
