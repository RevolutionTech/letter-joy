import { styled } from "@mui/material";

import Example01 from "../../assets/lobby/help/example01.png";
import Example02 from "../../assets/lobby/help/example02.png";
import Example03 from "../../assets/lobby/help/example03.png";
import Example04 from "../../assets/lobby/help/example04.png";
import Example05 from "../../assets/lobby/help/example05.png";
import Example06 from "../../assets/lobby/help/example06.png";
import Example07 from "../../assets/lobby/help/example07.png";
import Example08 from "../../assets/lobby/help/example08.png";
import Example09 from "../../assets/lobby/help/example09.png";
import Example10 from "../../assets/lobby/help/example10.png";
import Example11 from "../../assets/lobby/help/example11.png";
import Example12 from "../../assets/lobby/help/example12.png";
import theme from "../../theme";
import { LobbyBody } from "../lobbyBody";

const Example = styled("div")({
  display: "flex",
  flexDirection: "column",
  [theme.mediaLg]: {
    flexDirection: "row",
  },
  alignItems: "center",
  gap: "8px",
});
const ExampleImageLink = styled("a")({ display: "contents" });
const ExampleImage = styled("img")({
  maxWidth: "100%",
  [theme.mediaLg]: {
    maxWidth: "60%",
  },
  maxHeight: "300px",
  border: `thin solid ${theme.black}`,
});
const ExampleText = styled("small")({ color: theme.grey });
const Clue = styled("span")({ whiteSpace: "nowrap" });

export const HelpContent = () => (
  <>
    <h1>How to play</h1>
    <LobbyBody>
      <h2>Summary</h2>
      <p>
        Letter Joy is a cooperative word deduction game for 2-6 players. Players
        will ultimately need to form a secret word from the letters they are
        dealt without ever looking at the letters they have. Players do this by
        interpreting clues given to them by other players. Let&apos;s see how
        this works by taking a look at what clues look like in Letter Joy!
      </p>
      <h2>Clues</h2>
      <p>
        Each round you will be shown one letter from each other player&apos;s
        secret word and you will reveal one letter from your secret word to each
        other player. You can give clues to other players by spelling a word
        using the letters visible to you. Similarly, other players can offer
        clues by using the letters visible to them, which may include your
        letter.
      </p>
      <Example>
        <ExampleImageLink href={Example01} target="_blank" rel="noreferrer">
          <ExampleImage src={Example01} alt="Typical clue" />
        </ExampleImageLink>
        <ExampleText>
          Example: Katrina uses JMac&apos;s &quot;O&quot; first, then your
          letter, then Aaron&apos;s &quot;I&quot;, followed by JMac&apos;s
          &quot;O&quot; again, and finally your letter again. Your first letter
          is represented by ?<sub>1</sub>, so from your perspective this clue
          spells out{" "}
          <Clue>
            O ?<sub>1</sub> I O ?<sub>1</sub>.
          </Clue>{" "}
          Using this clue, can you guess what your first letter is?
        </ExampleText>
      </Example>
      <p>
        Players may also use the wildcard to represent any letter. When used
        multiple times in the same clue, the wildcard always represents the same
        letter.
      </p>
      <Example>
        <ExampleImageLink href={Example02} target="_blank" rel="noreferrer">
          <ExampleImage src={Example02} alt="Clue using wildcard" />
        </ExampleImageLink>
        <ExampleText>
          Example: The word in this case could be <Clue>R E M E M B E R</Clue>.
          It could not be <Clue>D E C E M B E R</Clue> because that would mean
          the wildcard represents both &quot;C&quot; and &quot;M.&quot;
        </ExampleText>
      </Example>
      <p>
        Any clue is valid in Letter Joy. Longer clues are usually better, but
        more obscure clues are unlikely to be helpful to your teammates. The
        safest bet is just to stick to words in the dictionary.
      </p>
      <h2>Round</h2>
      <p>
        At the start of the game, players will shuffle the letters from their
        secret word. Thus, the letters players learn about won&apos;t necessary
        be in their original order. On the first round, players will reveal the
        first letter of their hand for other players to use in a clue.
      </p>
      <p>
        During the round, players can propose different clues based on the
        letters that they can see. Players decide which clue will be the most
        useful using the following information: number of letters in the clue,
        whether or not the clue uses the wildcard, number of players that are
        part of the clue, and the author of the clue.
      </p>
      <Example>
        <ExampleImageLink href={Example03} target="_blank" rel="noreferrer">
          <ExampleImage src={Example03} alt="Two clues proposed" />
        </ExampleImageLink>
        <ExampleText>
          Example: The clue proposed by JMac is 7 letters long and uses the
          wildcard. Katrina&apos;s proposed clue is only 6 letters long, but it
          helps every other player and doesn&apos;t use the wildcard.
        </ExampleText>
      </Example>
      <p>
        The number of clues that can be given in a game of Letter Joy is
        limited, so each round counts. All players begin the game with some
        exclusive hints that only they can use, and shared team hints that
        anyone can use. More hints can also be unlocked throughout the course of
        the game.
      </p>
      <Example>
        <ExampleImageLink href={Example04} target="_blank" rel="noreferrer">
          <ExampleImage src={Example04} alt="Hints" />
        </ExampleImageLink>
        <ExampleText>
          Example: Katrina, JMac, and Aaron have each used two hints. Nick
          hasn&apos;t given used his exclusive hint yet, but more team hints
          will be unlocked once he does.
        </ExampleText>
      </Example>
      <p>
        Once a concensus is reached on which proposed clue is best, the author
        of the clue will use a hint and the clue will automatically be revealed
        to all players. Players that figure out their letter can choose to move
        on to their next letter in the following round. Once a player has moved
        on, they can never go back to an earlier letter. Play continues in this
        way until all players are confident that they know all of their letters.
      </p>
      <Example>
        <ExampleImageLink href={Example05} target="_blank" rel="noreferrer">
          <ExampleImage src={Example05} alt="Ambiguous clue" />
        </ExampleImageLink>
        <ExampleText>
          Example: The word in this case could either be{" "}
          <Clue>T H E R E F O R E</Clue> or <Clue>W H E R E F O R E</Clue>.
          Since it&apos;s unclear whether you have a &quot;T&quot; or a
          &quot;W&quot; you decide to keep your letter for another round.
        </ExampleText>
      </Example>
      <h2>Game end</h2>
      <p>
        At the end of the game, each player will have a chance to rearrange
        their letters to spell a word. It doesn&apos;t actually matter whether
        or not players produce the same secret word they were originally given
        as long as they spell a real dictionary word in the end.
      </p>
      <Example>
        <ExampleImageLink href={Example06} target="_blank" rel="noreferrer">
          <ExampleImage src={Example06} alt="Alternate solution" />
        </ExampleImageLink>
        <ExampleText>
          Example: At the beginning of the game, Katrina was given the word{" "}
          <Clue>S T A R E</Clue>. In the end she actually spelled{" "}
          <Clue>R A T E S</Clue>, but it doesn&apos;t matter since{" "}
          <Clue>R A T E S</Clue> is also a valid word.
        </ExampleText>
      </Example>
      <p>
        Points are awarded at the end of the game based on how many players can
        spell a word in the end. Players that can&apos;t spell a word are
        awarded partial points for the letters they did know.
      </p>
      <Example>
        <ExampleImageLink href={Example07} target="_blank" rel="noreferrer">
          <ExampleImage src={Example07} alt="Mistake when rearranging" />
        </ExampleImageLink>
        <ExampleText>
          Example: JMac made a mistake and thought his third letter was an
          &quot;S&quot; when it was actually a &quot;K&quot;.{" "}
          <Clue>K O B E R</Clue> isn&apos;t a word but he will be awarded
          partial points for knowing his other 4 letters.
        </ExampleText>
      </Example>
      <p>
        One player may use the team&apos;s wildcard when spelling out their
        final word. This can be helpful if a player is unsure of one of their
        letters. Alternatively, the wildcard could be used to create a longer
        word.
      </p>
      <Example>
        <ExampleImageLink href={Example08} target="_blank" rel="noreferrer">
          <ExampleImage src={Example08} alt="Used wildcard when rearranging" />
        </ExampleImageLink>
        <ExampleText>
          Example: Aaron isn&apos;t sure of his fourth letter, so he decides to
          use the team&apos;s wildcard instead so that he can be more confident
          that he is spelling a valid word in the end.
        </ExampleText>
      </Example>
      <h2>Non-players</h2>
      <p>
        When playing with fewer than 6 players, additional
        &quot;non-player&quot; stacks of letters will be included in the game so
        that everyone has at least 5 letters to build clues from. The top letter
        from each non-player stack will be visible to every player. When a
        non-player letter is used in a clue, that letter will be replaced with
        the next letter in the stack on the following round.
      </p>
      <Example>
        <ExampleImageLink href={Example09} target="_blank" rel="noreferrer">
          <ExampleImage src={Example09} alt="Clue using some non-players" />
        </ExampleImageLink>
        <ExampleText>
          Example: On this round the &quot;O&quot; non-player letter was used.
          In the next round, this letter will be replaced with a new letter but
          the &quot;Y&quot; will remain.
        </ExampleText>
      </Example>
      <p>
        When non-players are in a game, the number of non-players involved in a
        clue is shown in the proposed clue summary.
      </p>
      <Example>
        <ExampleImageLink href={Example10} target="_blank" rel="noreferrer">
          <ExampleImage
            src={Example10}
            alt="Two clues with non-players proposed"
          />
        </ExampleImageLink>
        <ExampleText>
          Example: The clue proposed by Katrina involves 3 players and 1
          non-player whereas the clue proposed by Aaron involves 2 players and 2
          non-players.
        </ExampleText>
      </Example>
      <p>
        Exhausting a non-player stack unlocks an additional hint for the team.
        When a non-player runs out of letters, letters will be drawn from the
        deck so that players continue to have at least 5 letters to build clues
        from.
      </p>
      <h2>Bonus letters</h2>
      <p>
        If a player advances beyond the final letter in their word, they will be
        assigned an extra letter from the deck. If the player can guess this
        letter correctly, that letter will become available to the rest of the
        team to be used once in a future clue as a bonus letter.
      </p>
      <Example>
        <ExampleImageLink href={Example11} target="_blank" rel="noreferrer">
          <ExampleImage src={Example11} alt="Guessing a bonus letter" />
        </ExampleImageLink>
        <ExampleText>
          Example: It seems like your bonus letter could be an &quot;I&quot;. If
          your guess is correct, the team will have access to a one-time
          &quot;I&quot; in a future round.
        </ExampleText>
      </Example>
      <p>
        When the team has one or more bonus letters, the number of bonus letters
        used in a clue is shown in the proposed clue summary. Once a bonus
        letter is used in a clue, it is discarded.
      </p>
      <Example>
        <ExampleImageLink href={Example12} target="_blank" rel="noreferrer">
          <ExampleImage src={Example12} alt="Clue with bonus letter proposed" />
        </ExampleImageLink>
        <ExampleText>
          Example: JMac&apos;s clue helps 3 players whereas Katrina&apos;s clue
          only helps 2 players, but JMac&apos;s clue will consume a bonus letter
          whereas Katrina&apos;s clue doesn&apos;t use one.
        </ExampleText>
      </Example>
      <p>
        Bonus letters remaining at the end of the game can also be used when
        spelling out final words, but just like the wildcard, each bonus letter
        may only be used by one player.
      </p>
    </LobbyBody>
  </>
);
