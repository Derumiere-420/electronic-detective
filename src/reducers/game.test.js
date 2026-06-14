import { describe, expect, it } from "vitest";
import {
  accuseSuspect,
  endPlayerTurn,
  updateLocationAddress,
  CREATE_SUSPECT_ALIBI
} from "../actions";
import game from "./game";

const state = {
  setupData: {},
  difficulty: 3,
  screen: "investigation",
  playerId: "1",
  turn: {
    display: "list",
    interrogationSuspect: 0,
    questionsRemaining: 0,
    questionsAnswered: { 1: "answer" },
    answerOrder: [1]
  },
  gameData: {
    murderer: "9",
    sheets: {
      0: { locations: { A: { address: { side: "", town: "" } } } },
      1: { locations: { A: { address: { side: "", town: "" } } } },
      2: { locations: { A: { address: { side: "", town: "" } } } },
      numPlayers: 3
    },
    alibis: {}
  }
};

describe("game reducer", () => {
  it("moves to the next player without treating numPlayers as a player", () => {
    const nextState = game(state, endPlayerTurn());

    expect(nextState.playerId).toBe("2");
    expect(nextState.screen).toBe("startturn");
    expect(nextState.turn.questionsRemaining).toBe(3);
  });

  it("updates location address parts", () => {
    const nextState = game(state, updateLocationAddress("1", "A", "town", "Uptown"));

    expect(nextState.gameData.sheets["1"].locations.A.address.town).toBe(
      "Uptown"
    );
  });

  it("stores suspect alibis under the suspect id", () => {
    const action = {
      type: CREATE_SUSPECT_ALIBI,
      data: {
        suspectId: "5",
        alibiArr: [{ id: 0, fact: "I was at the Art Show" }]
      }
    };
    const nextState = game(state, action);

    expect(nextState.gameData.alibis["5"].length).toBeGreaterThan(0);
  });

  it("removes a player after a wrong accusation and selects the next player", () => {
    const nextState = game(state, accuseSuspect("1", "3", "9"));

    expect(nextState.gameData.sheets["1"]).toBeUndefined();
    expect(nextState.gameData.sheets.numPlayers).toBe(2);
    expect(nextState.playerId).toBe("2");
    expect(nextState.screen).toBe("unsolved");
  });
});
