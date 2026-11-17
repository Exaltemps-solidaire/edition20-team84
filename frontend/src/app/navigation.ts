export type Ecran = "situation" | "rapport";
export type Evenement = "choisir-action" | "reprendre-plus-tard";

export function prochainEcran(ecranActuel: Ecran, evenement: Evenement): Ecran {
  if (ecranActuel === "situation" && evenement === "choisir-action") return "rapport";
  if (ecranActuel === "rapport" && evenement === "reprendre-plus-tard") return "situation";
  return ecranActuel;
}
