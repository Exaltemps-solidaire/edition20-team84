# Plan d'itérations — La Sauvegarde du Nord

**Plan validé le 2026-11-17.**

- **Source du plan** : proposé par l'agent (aucun plan d'itérations trouvé dans la passation : ni `cadrage/*iteration*`, ni clé `iterations` dans `passation.json`).
- **Temps restant annoncé** : 120 minutes, annoncé le 2026-11-17 à 21:14 ; reconfirmé à ~110-115 minutes au début de l'itération 1.
- **Durée du tour de test de l'équipe** : 10 minutes (valeur par défaut, le développeur ne savait pas).
- **Capacité estimée** : ~25 min/itération (10 min codage + ~5 min publication + 10 min test), sauf l'itération 1 qui absorbe aussi le démarrage de la plateforme et le premier déploiement (estimée ~35 min). Soit environ **4 itérations** dans le temps restant, avec peu de marge.

## Ce qui sort du périmètre (✂️)

- La famille d'idées « Idées dont le sens reste à préciser » (un jeu / un jumeau / un ballon, 1 point, sens non tranché par la squad — cf. `2-idees-priorisees.md`) : non construite, trop floue, trop peu priorisée.
- La génération réelle du rapport par un modèle de langage (`llm.internal`) : les hypothèses de l'équipe sont vides (`5-hypotheses.md` : « Pas encore produit »), donc aucun critère d'acceptation métier n'encadre ce choix pour l'instant. Elle est planifiée en itération 3+ (« à venir »), pas avant.
- Toute persistance réelle (base `team84`) des rapports : à introduire seulement quand l'écran 2 sera stabilisé.

## ⚠️ Points incertains

- Les hypothèses de version, le plan de livraison et le PRD de la squad sont tous les trois « Pas encore produit ». Les critères d'acceptation ci-dessous sont donc proposés par l'agent à partir du prototype retenu et de la problématique, **pas** issus d'une hypothèse validée par les cadreurs — à faire confirmer par eux au prochain tour de test.
- L'écran 2 du prototype est explicitement marqué par la squad « en cours de réflexion — son contenu reste à préciser ». L'itération 2 le reproduit tel quel (texte en dur), en attendant une clarification.
- Le budget de 35 min pour l'itération 1 suppose que la plateforme core (Postgres, registre, etc.) est déjà en cours de démarrage en arrière-plan pendant le codage ; si elle n'a pas encore été lancée, ajouter le temps de démarrage.

---

## Itération 1 : Le squelette est en ligne et montre l'écran « Vue de la situation »

- **Dans le périmètre** :
  - Démarrer la plateforme core en arrière-plan, créer la base `team84`.
  - Reproduire fidèlement l'écran 1 du prototype retenu (fiche « Famille Martin », schéma des acteurs Enfant/Juge/Assistant → Parent, liste des 3 actions) avec des données en dur dans le frontend.
  - Poser `.env.example` et `DEPLOIEMENT.md` (le reste du gabarit `api/`/`frontend/` existe déjà).
  - Écrire `app/podman-compose.yml`, construire/publier les images, déployer sur 8080/8081.
- **Hors périmètre** : l'écran 2 (rédaction), toute génération IA, toute action réelle des boutons au-delà d'une navigation visuelle.
- **Critères d'acceptation** :
  - Étant donné l'URL publique ouverte dans un navigateur, quand la page d'accueil se charge, alors on voit la fiche « Famille Martin » avec le schéma des 3 acteurs et les 3 actions, conforme au prototype.
  - Étant donné `/health` (8081) et `/sante` (8080) interrogés, quand on les appelle, alors chacun répond 200 avec un corps non vide.
  - Étant donné un clic sur une des 3 actions, quand il est déclenché, alors l'application navigue sans erreur JavaScript visible.
- **Hypothèse de l'équipe couverte** : aucune (hypothèses vides) — couvre la famille d'idées n°1 du vote, « Capturer ce qui est dit ou vécu pendant l'intervention » (10 points, la plus priorisée).
- **Codage estimé** : 10 minutes
- **Fichiers prévus** : `frontend/src/app/page.tsx`, un composant d'affichage de la fiche/schéma, `.env.example`, `DEPLOIEMENT.md`, `app/podman-compose.yml` (~5 fichiers, hors tests)
- **Tests unitaires prévus** : aucune règle métier dans cette itération (affichage de données statiques) → 0 test, conforme à la DoD qui exclut les tests sur du balisage pur. Si une règle apparaît (ex. calcul d'ancienneté de la mesure), elle sera testée.
- **Étapes ajoutées à la démo** (`e2e/demo.spec.ts`) : ouvrir la page, vérifier la présence de « Famille Martin » et des 3 actions.
- **Bilan** :
  - Durée de codage réelle : 2 minutes (pas de dépassement).
  - Critères satisfaits : les 3. Page accessible, `/health` et `/sante` répondent 200 sur les deux services (vérifié par curl), clic sur une action affiche un message « écran à venir » sans erreur.
  - Reporté : rien.
  - Harnais : `./scripts/verifier-deployabilite.sh` → aucune borne ni alarme. `npm test` → 2 tests existants passent (aucun test métier nouveau : cette itération n'a que de l'affichage statique). `./scripts/signaler-version.sh 1` accepté du premier coup.
  - Démo (`e2e/demo.spec.ts`) étendue avec les 2 nouvelles étapes et rejouée contre `localhost:8080` (déploiement local) : passe. `URL_PUBLIQUE` non testable depuis la machine (injoignable par construction) — à vérifier par le développeur dans son navigateur.
  - **Modifications** :
    - `frontend/src/app/page.tsx` : remplace la page de démarrage Next.js par l'écran « Vue de la situation » (fiche, schéma des acteurs, 3 actions cliquables) — sert les 3 critères.
    - `frontend/src/app/page.module.css` : styles de l'écran, repris du prototype — sert les 3 critères.
    - `frontend/Dockerfile`, `api/Dockerfile` : images de base qualifiées en `docker.io/library/...` — nécessaire au build sur cette machine (recette du `/CLAUDE.md` racine).
    - `.env.example` : liste `PORT` (seule variable lue pour l'instant) — contrat de déployabilité, règle 2.
    - `DEPLOIEMENT.md` : page de déploiement du dépôt — contrat de déployabilité, règle 8.
    - `podman-compose.yml` : rejoint `core-network`, publie 8080/8081 — recette de déploiement du serveur.
    - `e2e/demo.spec.ts` : 2 étapes ajoutées (vérifier l'écran, cliquer une action) — démonstration, hors DoD.

## Itération 2 : L'écran de rédaction du rapport est visible et navigable

- **Temps restant annoncé au début** : ~90-100 minutes (le développeur ne s'est pas inquiété d'un écart important depuis l'itération 1).
- **Dans le périmètre** :
  - Reproduire l'écran 2 du prototype (notes capturées, texte « rédigé par l'assistant » en dur, bouton « Envoyer au magistrat »), tel quel — y compris le bandeau « en cours de réflexion » de la squad, pour ne pas sur-promettre une fonctionnalité non cadrée.
  - Navigation complète écran 1 ↔ écran 2.
  - Un état de confirmation simple au clic sur « Envoyer au magistrat » (pas d'envoi réel).
- **Hors périmètre** : génération IA réelle, édition persistée du texte, envoi réel à un magistrat.
- **Critères d'acceptation** :
  - Étant donné l'écran 1 affiché, quand on clique sur une action, alors on arrive sur l'écran 2 avec le texte du rapport pré-rempli, identique au prototype.
  - Étant donné l'écran 2 affiché, quand on clique sur « Envoyer au magistrat », alors un message de confirmation apparaît, sans erreur.
  - Étant donné l'écran 2 affiché, quand on clique sur « Reprendre plus tard », alors on revient sur l'écran 1.
- **Hypothèse de l'équipe couverte** : aucune (hypothèses vides) — couvre la famille d'idées n°2 du vote, « Un outil ou agent numérique pour accompagner la rédaction » (9 points).
- **Codage estimé** : 8 minutes
- **Fichiers prévus** : `frontend/src/app/page.tsx` ou nouveau composant d'écran, logique de navigation partagée, éventuel test de cette logique (~4 fichiers, hors tests)
- **Tests unitaires prévus** : 1 test sur la logique de navigation entre écrans si elle devient une fonction isolée (pas de test sur le balisage lui-même).
- **Étapes ajoutées à la démo** : cliquer une action depuis l'écran 1, vérifier l'arrivée sur l'écran 2, cliquer « Envoyer au magistrat », vérifier la confirmation.
- **Bilan** :
  - Durée de codage réelle : 1 minute (pas de dépassement).
  - Critères satisfaits : les 3. Clic sur une action → écran rapport avec texte pré-rempli ; clic « Envoyer au magistrat » → confirmation ; clic « Reprendre plus tard » → retour à l'écran 1.
  - Reporté : rien.
  - Harnais : `./scripts/verifier-deployabilite.sh` → aucune borne ni alarme. `npm test` → 5 tests passent (2 existants + 3 nouveaux sur `prochainEcran`, la logique de transition entre écrans). `./scripts/signaler-version.sh 2` accepté du premier coup.
  - Démo (`e2e/demo.spec.ts`) étendue avec 2 nouvelles étapes (envoyer, reprendre plus tard) et rejouée contre `localhost:8080` : passe. `URL_PUBLIQUE` non testable depuis la machine — à vérifier par le développeur.
  - **Modifications** :
    - `frontend/src/app/navigation.ts` : fonction pure `prochainEcran` (règle de transition entre les 2 écrans) — sert les 3 critères.
    - `frontend/src/app/navigation.test.ts` : 3 tests sur `prochainEcran` — DoD point 2.
    - `frontend/src/app/page.tsx` : ajoute l'écran « Rapport d'intervention » (notes, texte en dur, bandeau « en cours de réflexion », boutons envoyer/reprendre), branché sur `prochainEcran` — sert les 3 critères.
    - `frontend/src/app/page.module.css` : styles de l'écran rapport (bandeau, bloc rapport, boutons) — sert les 3 critères.
    - `e2e/demo.spec.ts` : 2 étapes ajoutées (envoyer, reprendre plus tard) — démonstration, hors DoD.

## Itération 3 : Les notes de l'intervention sont saisies par l'utilisateur, pas figées

- **Temps restant annoncé au début** : ~85-95 minutes.
- **⚠️ Changement d'ordre par rapport au plan initial** : l'« À venir » plaçait la génération IA du rapport (`llm.internal`) en premier. Les hypothèses de l'équipe restent vides sur ce point (`5-hypotheses.md` : « Pas encore produit ») — aucun cadrage ne l'encadre encore. Je passe donc devant la saisie de notes réelles (famille d'idées n°1, la plus priorisée, 10 points), qui ne dépend d'aucun cadrage en attente. À faire valider par les cadreurs au prochain tour de test.
- **Dans le périmètre** :
  - Remplacer les notes en dur de l'écran « Vue de la situation » par un champ de saisie libre (texte), conservé en mémoire (state React, pas de persistance).
  - L'écran « Rapport » affiche ces notes saisies à la place du texte figé (le texte du rapport lui-même reste en dur tant que la génération IA n'est pas cadrée).
- **Hors périmètre** : génération IA du texte, persistance en base, validation/format des notes.
- **Critères d'acceptation** :
  - Étant donné l'écran 1 affiché, quand je saisis du texte dans le champ de notes, alors il est conservé si je navigue vers l'écran rapport puis reviens.
  - Étant donné des notes vides, quand j'arrive sur l'écran rapport, alors un texte par défaut s'affiche (pas d'erreur).
  - Étant donné des notes saisies, quand j'arrive sur l'écran rapport, alors elles y sont visibles.
- **Hypothèse de l'équipe couverte** : aucune (hypothèses vides) — couvre la famille d'idées n°1, « Capturer ce qui est dit ou vécu pendant l'intervention ».
- **Codage estimé** : 8 minutes
- **Fichiers prévus** : `frontend/src/app/page.tsx`, `frontend/src/app/page.module.css` (~2 fichiers, hors tests)
- **Tests unitaires prévus** : aucune règle métier isolable pour l'instant (état de saisie simple) → à réévaluer si une règle de validation apparaît.
- **Étapes ajoutées à la démo** : saisir une note sur l'écran 1, vérifier sa présence sur l'écran rapport.
- **Bilan** :
  - Durée de codage réelle : 1 minute (pas de dépassement).
  - Critères satisfaits : les 3. La note saisie persiste en state React entre les deux écrans ; un texte par défaut s'affiche si aucune note n'est saisie ; une note saisie apparaît bien sur l'écran rapport.
  - Reporté : rien.
  - Harnais : `./scripts/verifier-deployabilite.sh` → aucune borne ni alarme. `npm test` → 5 tests passent (aucun test métier nouveau : simple état de saisie, pas de règle à isoler). `./scripts/signaler-version.sh 3` accepté du premier coup.
  - Démo (`e2e/demo.spec.ts`) étendue avec l'étape de saisie de note et rejouée contre `localhost:8080` : passe. `URL_PUBLIQUE` non testable depuis la machine — à vérifier par le développeur.
  - **Modifications** :
    - `frontend/src/app/page.tsx` : ajoute un `<textarea>` de notes sur l'écran « Vue de la situation » (state `notes`), et affiche ces notes (ou un texte par défaut) sur l'écran rapport à la place du placeholder figé — sert les 3 critères.
    - `frontend/src/app/page.module.css` : style `.notesInput` — sert les 3 critères.
    - `e2e/demo.spec.ts` : étape de saisie de note ajoutée, et vérification de sa présence sur l'écran rapport — démonstration, hors DoD.

## Itération 4 : La note saisie survit à un rechargement de la page

- **Temps restant annoncé au début** : ~55-65 minutes. Avec ~25 min/itération, il reste de la place pour cette itération et une dernière de stabilisation.
- **❗️ Dépendance nouvelle** : premier usage de Postgres (base `team84`, déjà créée) et d'un client DB dans `api/`. Ajoute `pg` (ou équivalent) aux dépendances de `api/`, et les variables `DB_HOST`/`DB_NAME`/`DB_USER`/`DB_PASSWORD` dans `podman-compose.yml`.
- **Dans le périmètre** :
  - L'API expose une route pour enregistrer et relire la note de la visite en cours (une seule note, pas de liste, pas d'authentification — hors périmètre de la passation).
  - Le frontend appelle cette route en chemin relatif (`/api/v1/...`) au lieu de ne garder la note qu'en state React.
  - Table minimale dans la base `team84` (une ligne suffit pour ce cas).
- **Hors périmètre** : plusieurs familles/visites, historique, authentification, édition concurrente.
- **Critères d'acceptation** :
  - Étant donné une note saisie et enregistrée, quand je recharge la page, alors elle est toujours affichée sur l'écran 1 et sur l'écran rapport.
  - Étant donné l'API relancée (redéploiement), quand je recharge la page, alors la note précédemment enregistrée est toujours là (persistée en base, pas en mémoire du processus).
  - Étant donné la base inaccessible, quand je charge la page, alors l'application ne plante pas (dégrade vers une note vide, pas d'erreur visible bloquante).
- **Hypothèse de l'équipe couverte** : aucune (hypothèses vides) — prolonge la famille d'idées n°1 en rendant la capture réelle plutôt que volatile.
- **Codage estimé** : 9 minutes
- **Fichiers prévus** : `api/src/server.ts` (ou nouveau routeur), accès à la base dans `api/`, `frontend/src/app/page.tsx` (appel fetch), `podman-compose.yml` (ajout des variables `DB_*`) (~4-5 fichiers, hors tests)
- **Tests unitaires prévus** : 1 à 2 tests sur la logique de lecture/écriture de la note côté API (pas sur le câblage HTTP lui-même).
- **Étapes ajoutées à la démo** : recharger la page après saisie d'une note, vérifier qu'elle est toujours affichée.
- **Bilan** : _à remplir en fin d'itération._

## À venir (non détaillé)

1. Brancher une vraie génération assistée du texte du rapport à partir des notes saisies (via `llm.internal`), en remplacement du texte en dur — sous réserve de cadrage des hypothèses avec l'équipe.
2. Stabilisation finale pour le pitch (dernière itération du temps imparti).
