# Déploiement

Application pour **La Sauvegarde du Nord**, qui aide les travailleurs sociaux en protection de
l'enfance à passer moins de temps à écrire leurs rapports (AEMO/MJIE) et plus de temps auprès
des familles. À ce stade, elle montre l'écran de situation d'une intervention (données en dur) ;
la rédaction assistée n'est pas encore branchée.

## Services

- `frontend/` — Next.js en export statique, servi par nginx. **Service exposé au public**, port
  80 du conteneur (8080 sur la VM de déploiement).
- `api/` — Node (TypeScript exécuté directement), port 8081. Sert `/health` et `/sante` ; aucune
  route métier pour l'instant, le front n'appelle pas encore l'API.

## Services externes appelés

Aucun pour l'instant. Rien ne casse si un service externe tombe : aucun appel sortant n'est
encore fait.

## Ce qui est connu comme fragile ou inachevé

- Toutes les données affichées (fiche famille, acteurs, actions) sont en dur dans le code du
  front : rien n'est encore saisi ni persisté.
- Les 3 actions de l'écran affichent un simple message « écran à venir » : aucune ne déclenche
  encore un comportement réel.
- L'écran de rédaction du rapport (deuxième écran du prototype) n'est pas construit.

## Contact

- **Côté équipe** : Équipe 84 (squad `MARIONINENGLAND`, code `G9QV8W`).
- **Côté association** : à préciser — non communiqué dans le dossier de passation.
