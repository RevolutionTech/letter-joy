import { LobbyBody } from "./lobbyBody";
import { LobbyPage } from "./LobbyPage";

export const Credits = () => (
  <LobbyPage>
    <h1>Credits</h1>
    <LobbyBody>
      <p>
        Letter Joy was inspired by the board game{" "}
        <a
          href="https://czechgames.com/en/letter-jam/"
          target="_blank"
          rel="noreferrer"
        >
          Letter Jam
        </a>
        , designed by{" "}
        <a
          href="https://boardgamegeek.com/boardgamedesigner/116183/ondra-skoupy"
          target="_blank"
          rel="noreferrer"
        >
          Ondra Skoup&yacute;
        </a>{" "}
        and published by{" "}
        <a href="https://czechgames.com/" target="_blank" rel="noreferrer">
          Czech Games Edition
        </a>
        . If you like this game, support them by purchasing Letter Jam. Thank
        you Ondra Skoup&yacute; and CGE for creating one of my favourite games
        of all time.
      </p>
      <p>
        Letter Joy implemented by{" "}
        <a href="https://revolutiontech.ca/" target="_blank" rel="noreferrer">
          Lucas Connors
        </a>
        .
      </p>
      <p>
        Letter Joy playtested by Katrina Kokta, JMac, Aaron Moser, Nick Watson,
        Alison Firth, Michael &quot;MMF&quot; Feldman, Nolan Leung, Michelle
        Zheng, Olena, SK, and DT.
      </p>
      <a
        href="https://www.flaticon.com/free-icons/cursor"
        title="cursor icon"
        target="_blank"
        rel="noreferrer"
      >
        Cursor icon on help page created by Freepik - Flaticon
      </a>
    </LobbyBody>
  </LobbyPage>
);
