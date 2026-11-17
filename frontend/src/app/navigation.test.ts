import { describe, expect, it } from "vitest";
import { prochainEcran } from "./navigation";

describe("prochainEcran", () => {
  it("passe de situation à rapport quand on choisit une action", () => {
    expect(prochainEcran("situation", "choisir-action")).toBe("rapport");
  });

  it("revient de rapport à situation quand on reprend plus tard", () => {
    expect(prochainEcran("rapport", "reprendre-plus-tard")).toBe("situation");
  });

  it("ignore un événement sans transition prévue depuis cet écran", () => {
    expect(prochainEcran("situation", "reprendre-plus-tard")).toBe("situation");
  });
});
