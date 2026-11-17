import { expect, test } from "@playwright/test";

// Démo du cas passant, de bout en bout. Chaque itération ajoute ses étapes (test.step).
test("Démo : le cas passant", async ({ page }) => {
  await test.step("J'ouvre l'application", async () => {
    await page.goto("/");
    await expect(page.locator("body")).toBeVisible();
  });

  await test.step("Je vois la situation de la famille Martin", async () => {
    await expect(page.getByRole("heading", { name: "Famille Martin" })).toBeVisible();
    await expect(page.getByText("Assistant social")).toBeVisible();
  });

  await test.step("Je choisis une action", async () => {
    await page.getByRole("button", { name: "Capturer ce que j'entends" }).click();
    await expect(page.getByText("Rédigé par l'assistant")).toBeVisible();
  });

  await test.step("J'envoie le rapport au magistrat", async () => {
    await page.getByRole("button", { name: "Envoyer au magistrat" }).click();
    await expect(page.getByText("Rapport envoyé au magistrat.")).toBeVisible();
  });

  await test.step("Je reprends plus tard", async () => {
    await page.getByRole("button", { name: "Reprendre plus tard" }).click();
    await expect(page.getByRole("heading", { name: "Famille Martin" })).toBeVisible();
    await expect(page.getByText("Assistant social")).toBeVisible();
  });
});
