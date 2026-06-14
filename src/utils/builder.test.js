import { describe, expect, it } from "vitest";
import { buildGame } from "./builder";
import addresses from "../../public/json/addresses.json";
import characters from "../../public/json/characters.json";
import locations from "../../public/json/locations.json";
import questions from "../../public/json/questions.json";
import sheet from "../../public/json/casesheet.json";
import weapons from "../../public/json/weapons.json";

const setupData = {
  addresses,
  characters,
  locations,
  questions,
  sheet,
  weapons
};

describe("buildGame", () => {
  it("creates a valid solution with stable location weapon fields", () => {
    const gameData = buildGame(setupData, ["Ada", "Grace"]);
    const murdererLocation = Object.entries(gameData.locations).find(
      ([, location]) => location.occupants.includes(gameData.murderer)
    );

    expect(gameData.victim).not.toBe(gameData.murderer);
    expect(gameData.locations[gameData.scene].weapon).toBe("");
    expect(murdererLocation[1].weapon).toBe("");

    Object.values(gameData.locations).forEach(location => {
      expect(location).toHaveProperty("weapon");
    });
  });
});
