"use client";

import { useState } from "react";
import styles from "./page.module.css";
import { prochainEcran, type Ecran } from "./navigation";

const ACTIONS = [
  "Capturer ce que j'entends",
  "Rédiger le rapport d'intervention",
  "Envoyer au magistrat",
];

const TEXTE_RAPPORT =
  "Lors de la visite du 18 juin 2025, Léa était présente avec son père. L'enfant s'exprime " +
  "librement et paraît sereine à domicile. Le père rapporte une amélioration de la situation " +
  "scolaire. Aucun élément de préoccupation immédiate n'a été relevé. Une prochaine visite est " +
  "envisagée avant la rentrée.";

export default function Home() {
  const [ecran, setEcran] = useState<Ecran>("situation");
  const [envoye, setEnvoye] = useState(false);

  if (ecran === "rapport") {
    return (
      <div className={styles.page}>
        <div className={styles.shell}>
          <header className={styles.header}>
            <div className={styles.labelService}>Rapport d&apos;intervention</div>
            <h1>Famille Martin</h1>
            <div className={styles.subtitle}>Visite du 18 juin 2025 · 14 h 30</div>
          </header>

          <div className={styles.feedbackBanner}>
            Cet écran est en cours de réflexion – son contenu reste à préciser.
          </div>

          <div className={styles.placeholder}>
            ✦ Notes capturées : 3 points clés repérés pendant l&apos;échange
          </div>

          <div className={styles.rapportBloc}>
            <span className={styles.tagIa}>Rédigé par l&apos;assistant</span>
            <p>{TEXTE_RAPPORT}</p>
          </div>

          <button
            type="button"
            className={styles.btnPrimary}
            onClick={() => setEnvoye(true)}
          >
            Envoyer au magistrat
          </button>
          <button
            type="button"
            className={styles.btnSecondary}
            onClick={() => {
              setEnvoye(false);
              setEcran(prochainEcran(ecran, "reprendre-plus-tard"));
            }}
          >
            Reprendre plus tard
          </button>

          {envoye && (
            <div className={styles.placeholder}>Rapport envoyé au magistrat.</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.header}>
          <div className={styles.labelService}>Intervention en cours</div>
          <h1>Famille Martin</h1>
          <div className={styles.subtitle}>Mesure AEMO · depuis le 14 mars 2025</div>
        </header>

        <div className={styles.relationsArea}>
          <div className={styles.areaLabel}>Acteurs de la situation</div>
          <div className={styles.relationsDiagram}>
            <div className={styles.actorBubble}>
              Enfant
              <br />
              <span>Léa, 9 ans</span>
            </div>
            <div className={styles.actorBubble}>
              Juge
              <br />
              <span>Mme Perrin</span>
            </div>
            <div className={styles.actorBubbleCentral}>
              Assistant social
              <br />
              <span>Moi</span>
            </div>
          </div>
          <div className={styles.versParent}>→ Parent · M. Martin</div>
        </div>

        <div className={styles.sectionTitle}>Que faire maintenant ?</div>
        <div className={styles.actionList}>
          {ACTIONS.map((action) => (
            <button
              key={action}
              type="button"
              className={styles.actionItem}
              onClick={() => setEcran(prochainEcran(ecran, "choisir-action"))}
            >
              <span>{action}</span>
              <span className={styles.actionItemArrow}>›</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
