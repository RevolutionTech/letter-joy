import { LETTERS_PER_PLAYER } from "../../../game/constants";
import { Bottombar } from "../../panels/Bottombar";
import { Button } from "../../panels/Button";

interface Props {
  numSortedCards: number;
  onConfirmSortedCards: () => void;
  onResetSortedCards: () => void;
}

export const ConfirmSortedCardsContent = (props: Props) => {
  const { numSortedCards, onConfirmSortedCards, onResetSortedCards } = props;
  return (
    <Bottombar
      buttons={[
        <Button
          key="confirm"
          variant="contained"
          color="primary"
          size="large"
          disabled={numSortedCards < LETTERS_PER_PLAYER}
          onClick={onConfirmSortedCards}
        >
          Confirm
        </Button>,
        <Button
          key="reset"
          variant="outlined"
          size="large"
          disabled={numSortedCards === 0}
          onClick={onResetSortedCards}
        >
          Reset
        </Button>,
      ]}
    >
      <div>
        <div style={{ fontSize: "36pt" }}>
          Rearrange your letters to spell a word.
        </div>
        <div style={{ fontSize: "24pt" }}>
          You may use bonus letters too, but then no one else can.
        </div>
      </div>
    </Bottombar>
  );
};
