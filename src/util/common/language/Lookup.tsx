import { LANGUAGE } from "./Const";

export type LgLookup = {
  en_US: string,
  de_DE: string,
  fr_FR: string
}

export type LgLookup1 = {
  en_US: (a:string) => string,
  de_DE: (a:string) => string,
  fr_FR: (a:string) => string
}

export type LgLookup2 = {
  en_US: (a:string,b:string) => string,
  de_DE: (a:string,b:string) => string,
  fr_FR: (a:string,b:string) => string
}

export function lgLookup(lg: LANGUAGE, table: Map<string, LgLookup>, key: string) {
  if (! table) { console.info("Unknown table for key " + key); }
  const f = table.get(key);
  if (f) {
    return f[lg];
  }
  return "unknown lg-key: " + key;
}

export function lgLookup1(lg: LANGUAGE, table: Map<string, LgLookup1>, key: string, arg: string) {
  const f = table.get(key);
  if (f) {
    return f[lg](arg);
  }
}

export function lgLookup2(lg: LANGUAGE, table: Map<string, LgLookup2>, key: string, arg1: string, arg2: string) {
  const f = table.get(key);
  if (f) {
    return f[lg](arg1, arg2);
  }
}

/*
const lookup = new Map<string, LgL>([
]);

*/

/*
const _lookup = new Map<string, LgLookup>(
  [
    [
      'PERFORMANCES', {en_US: 'Performances', de_DE: "Auftritte", fr_FR: "Performances"}
    ],
    [
      'VIEW PERFORMANCE', {en_US: 'View Performance', de_DE: "Auftritt ansehen", fr_FR: "Voir la performance"}
    ],
    [
      'VIEW ON VIDEO', {en_US: 'View on video', de_DE: "Auf Video ansehen", fr_FR: "Voir en vidéo"}
    ],
    [
      'COMPARE PERFORMANCES', {en_US: 'Compare Performances', de_DE: "Auftritte vergleichen", fr_FR: "comparer les performances"}
    ],
    [
      'GALLERY', {en_US: 'Gallery', de_DE: 'Galerie', fr_FR: 'Galerie'}
    ],
    [
      'MORE_INFORMATION', {en_US: 'More Information', de_DE: 'Mehr erfahren', fr_FR: 'Plus d\'inormations'}
    ],
    [
      'MORE_NEWS', {en_US: 'More News', de_DE: 'Weitere News', fr_FR: 'Autres nouvelles'}
    ],
    [
      'TRY_THE_QUIZ', {en_US: 'Try this quiz', de_DE: 'Versuchen Sie das Quiz', fr_FR: 'Essayez ce quiz'}
    ],
    [
      'START_THE_QUIZ', {en_US: 'Start the quiz', de_DE: 'Starten Sie das Quiz', fr_FR: 'Commencez le quiz'}
    ],
    [
      'PROGRAM', {en_US: 'Program', de_DE: 'Programm', fr_FR: 'Programme'}
    ],
    [
      'PROCEED', {en_US: 'Proceed', de_DE: 'Weiter', fr_FR: 'Continuez'}
    ],
    [
      'FINISH_THE_QUIZ', {en_US: 'Finish the quiz', de_DE: 'Beenden Sie das Quiz', fr_FR: 'Terminez le quiz'}
    ],
    [
      'LEAVE_THE_QUIZ', {en_US: 'Leave the quiz', de_DE: 'Verlassen Sie das Quiz', fr_FR: 'Laissez le quiz'}
    ],
    [
      "CORRECT_ANSWER", {en_US: "Your answer is correct", de_DE: "Ihre Antwort ist korrekt", fr_FR: "Votre réponse est correcte"}
    ],
    [
      "WRONG_ANSWER", {en_US: "Your answer is wrong", de_DE: "Ihre Antwort ist falsch", fr_FR: "Votre réponse est fausse"}
    ],
        [
      'ABOUT_GEZA_ANDA', {en_US: 'Get to know Géza Anda', de_DE: 'Lernen Sie Géza Anda kennen', fr_FR: 'Découvrez Géza Anda'}
    ],
    [
      "VISIT_PREVIOUS_CONCOURS", {en_US: "Previous Concours", de_DE: "Frühere Concours", fr_FR: "Concours précédents"}
    ],
    ["ABOUT_US", {en_US: "About us", de_DE: "Über uns", fr_FR: "À propos de nous"}],
    ["BOARD", {en_US: "The board", de_DE: "Stiftungsrat", fr_FR: "Le conseil d\u2019administration"}],
    ["OFFICE", {en_US: "Office", de_DE: "Geschäftsstelle", fr_FR: "Secrétariat"}],

    ["LANGUAGE", {en_US: "Language", de_DE: "Sprache", fr_FR: "Langue"}],
    ["MANAGEMENT", {en_US: "Management", de_DE: "Management", fr_FR: "Management"}],
    ["PAST_PROJECTS", {en_US: "Projects", de_DE: "Projekte", fr_FR: "Projets"}],
    ["PRIZE_WINNER", {en_US: "Prize Winner", de_DE: "Preisträger", fr_FR: "Lauréats"}],
    ["CONDUCTORS", {en_US: "Conductors", de_DE: "Dirigenten", fr_FR: "Chefs d'orchestre"}],
    ["PRIZE_WINNER", {en_US: "Prize Winner", de_DE: "Preisträger", fr_FR: "Lauréats"}],
    ["JURY_PRESIDENT", {en_US: "Chairman", de_DE: "Vorsitzender", fr_FR: "Président du Jury"}],
    ["SCREENING_JURY", {en_US: "Screening Jury", de_DE: "Screening Jury", fr_FR: "Jury de pré-sélection"}],
    ["SCREENING_JURY", {en_US: "Screening Jury", de_DE: "Screening Jury", fr_FR: "Jury de pré-sélection"}],

  ]
)
const OneArgTable = new Map<string, LgLookup1>([
  ]
)
const TwoArgsTable = new Map<string, LgLookup2>(
  [
    [
      'CONCLUSION',
      {
        en_US: (nbCorrectAnswers, nbQuestions) => `You achieved ${nbCorrectAnswers} correct answers out of ${nbQuestions}`,
        de_DE: (nbCorrectAnswers, nbQuestions) => `Sie haben ${nbCorrectAnswers} von ${nbQuestions} Fragen korrekt beantwortet`,
        fr_FR: (nbCorrectAnswers, nbQuestions) => `You achieved ${nbCorrectAnswers} correct answers out of ${nbQuestions}`
      }
    ],
    [
      'SELECT_IN_RANGE',
      {
        en_US: (start, end) => `Select a number between ${start} and ${end}`,
        de_DE: (start, end) => `Wählen Sie eine Zahl zwischen ${start} und ${end}`,
        fr_FR: (start, end) => `Sélectionnez un nombre entre ${start} et ${end}`
      }
    ],
  ]
);
*/