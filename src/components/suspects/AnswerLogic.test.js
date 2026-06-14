import { describe, expect, it } from "vitest";
import { getQuestionResponse } from "./AnswerLogic";

const game = {
  setupData: {
    characters: {
      "1": { gender: "M" },
      "2": { gender: "M" },
      "3": { gender: "F" }
    }
  },
  gameData: {
    murderer: "1",
    weapon: ".38",
    locations: {
      A: {
        name: "Art Show",
        address: { side: "East", town: "Uptown" },
        occupants: ["1", "2"],
        weapon: { type: ".38", fingerprint: "odd" }
      },
      B: {
        name: "Box at Theatre",
        address: { side: "West", town: "Downtown" },
        occupants: ["3"],
        weapon: ""
      }
    }
  }
};

describe("getQuestionResponse", () => {
  it("finds weapon locations without crashing on empty weapon slots", () => {
    const response = getQuestionResponse(game, "2", {
      subject: "weapon",
      answerFunction: "check38Location",
      responseText: { affirmative: "The .38 was hidden at the " }
    });

    expect(response.answer).toBe("The .38 was hidden at the Art Show");
  });

  it("answers weapon presence safely for locations without weapons", () => {
    const response = getQuestionResponse(game, "3", {
      subject: "suspect",
      answerFunction: "checkWeaponLocation",
      responseText: {
        affirmative: "Weapon found",
        negative: "No weapon"
      }
    });

    expect(response.answer).toBe("No weapon");
  });

  it("returns unknown when a suspect did not see the target weapon", () => {
    const response = getQuestionResponse(game, "3", {
      subject: ".38",
      answerFunction: "checkPrints",
      responseText: {
        affirmative: "Odd",
        negative: "Even",
        unknown: "Unknown"
      }
    });

    expect(response.answer).toBe("Unknown");
  });
});
