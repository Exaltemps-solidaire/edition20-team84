"use client";

import { useState } from "react";
import styles from "./page.module.css";

const ACTIONS = [
  "Capturer ce que j'entends",
  "Rédiger le rapport d'intervention",
  "Envoyer au magistrat",
];

export default function Home() {
  const [actionChoisie, setActionChoisie] = useState<string | null>(null);

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
              onClick={() => setActionChoisie(action)}
            >
              <span>{action}</span>
              <span className={styles.actionItemArrow}>›</span>
            </button>
          ))}
        </div>

        {actionChoisie && (
          <div className={styles.placeholder}>
            « {actionChoisie} » — écran à venir dans une prochaine itération.
          </div>
        )}
      </div>
    </div>
  );
}
