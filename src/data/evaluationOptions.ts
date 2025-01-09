import { EvaluationOptions } from '@/features/calculator/types/types';

/** Configuration file for calculation models used in calculators
 * 
 */

export const evaluationOptionsMatriculation: EvaluationOptions = {
  ArvosanaValikkoID: 1,
  tyyppi: 'yo',
  oppiaineet: [
    {
      oppiaine: 'ai',
      oppiaineTeksti: 'Äidinkieli',
    },
    {
      oppiaine: 's2',
      oppiaineTeksti: 'Suomi toisena kielenä',
    },
    {
      oppiaine: 'r2',
      oppiaineTeksti: 'Ruotsi toisena kielenä',
    },
    {
      oppiaine: 'ena',
      oppiaineTeksti: 'Englanti, pitkä',
    },
    {
      oppiaine: 'enb',
      oppiaineTeksti: 'Englanti, lyhyt',
    },
    {
      oppiaine: 'rua',
      oppiaineTeksti: 'Toinen kotimainen kieli, pitkä',
    },
    {
      oppiaine: 'rub',
      oppiaineTeksti: 'Toinen kotimainen kieli, keskipitkä',
    },
    {
      oppiaine: 'maa',
      oppiaineTeksti: 'Matematiikka, pitkä',
    },
    {
      oppiaine: 'mab',
      oppiaineTeksti: 'Matematiikka, lyhyt',
    },
    {
      oppiaine: 'te',
      oppiaineTeksti: 'Terveystieto',
    },
    {
      oppiaine: 'ps',
      oppiaineTeksti: 'Psykologia',
    },
    {
      oppiaine: 'fy',
      oppiaineTeksti: 'Fysiikka',
    },
    {
      oppiaine: 'ke',
      oppiaineTeksti: 'Kemia',
    },
    {
      oppiaine: 'bi',
      oppiaineTeksti: 'Biologia',
    },
    {
      oppiaine: 'ge',
      oppiaineTeksti: 'Maantiede',
    },
    {
      oppiaine: 'hi',
      oppiaineTeksti: 'Historia',
    },
    {
      oppiaine: 'yh',
      oppiaineTeksti: 'Yhteiskuntaoppi',
    },
    {
      oppiaine: 'ue',
      oppiaineTeksti: 'Ev.lut uskonto',
    },
    {
      oppiaine: 'et',
      oppiaineTeksti: 'Elämänkatsomustieto',
    },
    {
      oppiaine: 'uo',
      oppiaineTeksti: 'Ortodoksiuskonto',
    },
    {
      oppiaine: 'fi',
      oppiaineTeksti: 'Filosofia',
    },
    {
      oppiaine: 'vea',
      oppiaineTeksti: 'Venäjä, pitkä',
    },
    {
      oppiaine: 'veb',
      oppiaineTeksti: 'Venäjä, lyhyt',
    },
    {
      oppiaine: 'raa',
      oppiaineTeksti: 'Ranska, pitkä',
    },
    {
      oppiaine: 'rab',
      oppiaineTeksti: 'Ranska, lyhyt',
    },
    {
      oppiaine: 'esa',
      oppiaineTeksti: 'Espanja, pitkä',
    },
    {
      oppiaine: 'esb',
      oppiaineTeksti: 'Espanja, lyhyt',
    },
    {
      oppiaine: 'saa',
      oppiaineTeksti: 'Saksa, pitkä',
    },
    {
      oppiaine: 'sab',
      oppiaineTeksti: 'Saksa, lyhyt',
    },
    {
      oppiaine: 'saame',
      oppiaineTeksti: 'Saame, lyhyt',
    },
    {
      oppiaine: 'iab',
      oppiaineTeksti: 'Italia, lyhyt',
    },
    {
      oppiaine: 'pob',
      oppiaineTeksti: 'Portugali, lyhyt',
    },
    {
      oppiaine: 'lab',
      oppiaineTeksti: 'Latina, lyhyt',
    },
  ],
  arvosanat: [
    {
      arvosana: 'l',
      arvosanaTeksti: 'L',
    },
    {
      arvosana: 'e',
      arvosanaTeksti: 'E',
    },
    {
      arvosana: 'm',
      arvosanaTeksti: 'M',
    },
    {
      arvosana: 'c',
      arvosanaTeksti: 'C',
    },
    {
      arvosana: 'b',
      arvosanaTeksti: 'B',
    },
    {
      arvosana: 'a',
      arvosanaTeksti: 'A',
    },
    {
      arvosana: 'i',
      arvosanaTeksti: 'I',
    },
  ],
};

const vocationalGrades5 = [
  {
    arvosana: 'l',
    arvosanaTeksti: '5',
  },
  {
    arvosana: 'e',
    arvosanaTeksti: '4',
  },
  {
    arvosana: 'm',
    arvosanaTeksti: '3',
  },
  {
    arvosana: 'c',
    arvosanaTeksti: '2',
  },
  {
    arvosana: 'b',
    arvosanaTeksti: '1',
  },
  {
    arvosana: 'a',
    arvosanaTeksti: '0',
  },
];

const vocationalGrades3 = [
  {
    arvosana: 'l',
    arvosanaTeksti: '3',
  },
  {
    arvosana: 'e',
    arvosanaTeksti: '2',
  },
  {
    arvosana: 'm',
    arvosanaTeksti: '1',
  },
];

export const evaluationOptionsVocational5Vivu: EvaluationOptions = {
  ArvosanaValikkoID: 2,
  tyyppi: 'ammVivu1-5',
  oppiaineet: [
    {
      oppiaine: 'vivu1-5',
      oppiaineTeksti: 'Viestintä- ja vuorovaikutusosaaminen',
    },
  ],
  arvosanat: vocationalGrades5,
};

export const evaluationOptionsVocational5Malu: EvaluationOptions = {
  ArvosanaValikkoID: 3,
  tyyppi: 'ammMalu1-5',
  oppiaineet: [
    {
      oppiaine: 'malu1-5',
      oppiaineTeksti: 'Matemaattis-luonnontieteellinen osaaminen',
    },
  ],
  arvosanat: vocationalGrades5,
};

export const evaluationOptionsVocational5Yhty: EvaluationOptions = {
  ArvosanaValikkoID: 4,
  tyyppi: 'ammYhty1-5',
  oppiaineet: [
    {
      oppiaine: 'yhty1-5',
      oppiaineTeksti: 'Yhteiskunta- ja työelämäosaaminen',
    },
  ],
  arvosanat: vocationalGrades5,
};

export const evaluationOptionsVocational5Ka: EvaluationOptions = {
  ArvosanaValikkoID: 5,
  tyyppi: 'ammKa1-5',
  oppiaineet: [
    {
      oppiaine: 'ka1-5',
      oppiaineTeksti: 'Tutkinnon painotettu keskiarvo',
    },
  ],
  arvosanat: [
    {
      arvosana: '5.00',
      arvosanaTeksti: '5,00',
    },
    {
      arvosana: '4.97',
      arvosanaTeksti: '4,97',
    },
    {
      arvosana: '4.94',
      arvosanaTeksti: '4,94',
    },
    {
      arvosana: '4.91',
      arvosanaTeksti: '4,91',
    },
    {
      arvosana: '4.88',
      arvosanaTeksti: '4,88',
    },
    {
      arvosana: '4.85',
      arvosanaTeksti: '4,85',
    },
    {
      arvosana: '4.82',
      arvosanaTeksti: '4,82',
    },
    {
      arvosana: '4.79',
      arvosanaTeksti: '4,79',
    },
    {
      arvosana: '4.76',
      arvosanaTeksti: '4,76',
    },
    {
      arvosana: '4.73',
      arvosanaTeksti: '4,73',
    },
    {
      arvosana: '4.70',
      arvosanaTeksti: '4,70',
    },
    {
      arvosana: '4.67',
      arvosanaTeksti: '4,67',
    },
    {
      arvosana: '4.64',
      arvosanaTeksti: '4,64',
    },
    {
      arvosana: '4.61',
      arvosanaTeksti: '4,61',
    },
    {
      arvosana: '4.58',
      arvosanaTeksti: '4,58',
    },
    {
      arvosana: '4.55',
      arvosanaTeksti: '4,55',
    },
    {
      arvosana: '4.52',
      arvosanaTeksti: '4,52',
    },
    {
      arvosana: '4.49',
      arvosanaTeksti: '4,49',
    },
    {
      arvosana: '4.46',
      arvosanaTeksti: '4,46',
    },
    {
      arvosana: '4.42',
      arvosanaTeksti: '4,42',
    },
    {
      arvosana: '4.39',
      arvosanaTeksti: '4,39',
    },
    {
      arvosana: '4.35',
      arvosanaTeksti: '4,35',
    },
    {
      arvosana: '4.31',
      arvosanaTeksti: '4,31',
    },
    {
      arvosana: '4.28',
      arvosanaTeksti: '4,28',
    },
    {
      arvosana: '4.24',
      arvosanaTeksti: '4,24',
    },
    {
      arvosana: '4.20',
      arvosanaTeksti: '4,20',
    },
    {
      arvosana: '4.16',
      arvosanaTeksti: '4,16',
    },
    {
      arvosana: '4.13',
      arvosanaTeksti: '4,13',
    },
    {
      arvosana: '4.09',
      arvosanaTeksti: '4,09',
    },
    {
      arvosana: '4.05',
      arvosanaTeksti: '4,05',
    },
    {
      arvosana: '4.02',
      arvosanaTeksti: '4,02',
    },
    {
      arvosana: '3.98',
      arvosanaTeksti: '3,98',
    },
    {
      arvosana: '3.94',
      arvosanaTeksti: '3,94',
    },
    {
      arvosana: '3.91',
      arvosanaTeksti: '3,91',
    },
    {
      arvosana: '3.87',
      arvosanaTeksti: '3,87',
    },
    {
      arvosana: '3.83',
      arvosanaTeksti: '3,83',
    },
    {
      arvosana: '3.79',
      arvosanaTeksti: '3,79',
    },
    {
      arvosana: '3.76',
      arvosanaTeksti: '3,76',
    },
    {
      arvosana: '3.72',
      arvosanaTeksti: '3,72',
    },
    {
      arvosana: '3.68',
      arvosanaTeksti: '3,68',
    },
    {
      arvosana: '3.65',
      arvosanaTeksti: '3,65',
    },
    {
      arvosana: '3.61',
      arvosanaTeksti: '3,61',
    },
    {
      arvosana: '3.57',
      arvosanaTeksti: '3,57',
    },
    {
      arvosana: '3.54',
      arvosanaTeksti: '3,54',
    },
    {
      arvosana: '3.50',
      arvosanaTeksti: '3,50',
    },
    {
      arvosana: '3.46',
      arvosanaTeksti: '3,46',
    },
    {
      arvosana: '3.42',
      arvosanaTeksti: '3,42',
    },
    {
      arvosana: '3.37',
      arvosanaTeksti: '3,37',
    },
    {
      arvosana: '3.33',
      arvosanaTeksti: '3,33',
    },
    {
      arvosana: '3.29',
      arvosanaTeksti: '3,29',
    },
    {
      arvosana: '3.24',
      arvosanaTeksti: '3,24',
    },
    {
      arvosana: '3.20',
      arvosanaTeksti: '3,20',
    },
    {
      arvosana: '3.15',
      arvosanaTeksti: '3,15',
    },
    {
      arvosana: '3.11',
      arvosanaTeksti: '3,11',
    },
    {
      arvosana: '3.07',
      arvosanaTeksti: '3,07',
    },
    {
      arvosana: '3.02',
      arvosanaTeksti: '3,02',
    },
    {
      arvosana: '2.98',
      arvosanaTeksti: '2,98',
    },
    {
      arvosana: '2.93',
      arvosanaTeksti: '2,93',
    },
    {
      arvosana: '2.89',
      arvosanaTeksti: '2,89',
    },
    {
      arvosana: '2.85',
      arvosanaTeksti: '2,85',
    },
    {
      arvosana: '2.80',
      arvosanaTeksti: '2,80',
    },
    {
      arvosana: '2.76',
      arvosanaTeksti: '2,76',
    },
    {
      arvosana: '2.71',
      arvosanaTeksti: '2,71',
    },
    {
      arvosana: '2.67',
      arvosanaTeksti: '2,67',
    },
    {
      arvosana: '2.63',
      arvosanaTeksti: '2,63',
    },
    {
      arvosana: '2.58',
      arvosanaTeksti: '2,58',
    },
    {
      arvosana: '2.54',
      arvosanaTeksti: '2,54',
    },
    {
      arvosana: '2.49',
      arvosanaTeksti: '2,49',
    },
    {
      arvosana: '2.43',
      arvosanaTeksti: '2,43',
    },
    {
      arvosana: '2.37',
      arvosanaTeksti: '2,37',
    },
    {
      arvosana: '2.30',
      arvosanaTeksti: '2,30',
    },
    {
      arvosana: '2.24',
      arvosanaTeksti: '2,24',
    },
    {
      arvosana: '2.18',
      arvosanaTeksti: '2,18',
    },
    {
      arvosana: '2.12',
      arvosanaTeksti: '2,12',
    },
    {
      arvosana: '2.05',
      arvosanaTeksti: '2,05',
    },
    {
      arvosana: '1.99',
      arvosanaTeksti: '1,99',
    },
    {
      arvosana: '1.93',
      arvosanaTeksti: '1,93',
    },
    {
      arvosana: '1.86',
      arvosanaTeksti: '1,86',
    },
    {
      arvosana: '1.80',
      arvosanaTeksti: '1,80',
    },
    {
      arvosana: '1.74',
      arvosanaTeksti: '1,74',
    },
    {
      arvosana: '1.67',
      arvosanaTeksti: '1,67',
    },
    {
      arvosana: '1.61',
      arvosanaTeksti: '1,61',
    },
    {
      arvosana: '1.55',
      arvosanaTeksti: '1,55',
    },
    {
      arvosana: '1.49',
      arvosanaTeksti: '1,49',
    },
    {
      arvosana: '1.42',
      arvosanaTeksti: '1,42',
    },
    {
      arvosana: '1.36',
      arvosanaTeksti: '1,36',
    },
    {
      arvosana: '1.30',
      arvosanaTeksti: '1,30',
    },
    {
      arvosana: '1.23',
      arvosanaTeksti: '1,23',
    },
    {
      arvosana: '1.17',
      arvosanaTeksti: '1,17',
    },
    {
      arvosana: '1.11',
      arvosanaTeksti: '1,11',
    },
    {
      arvosana: '1.00',
      arvosanaTeksti: '1,00',
    },
  ],
};

export const evaluationOptionsVocational3Vivu: EvaluationOptions = {
  ArvosanaValikkoID: 6,
  tyyppi: 'ammVivu1-3',
  oppiaineet: [
    {
      oppiaine: 'vivu1-3',
      oppiaineTeksti: 'Viestintä- ja vuorovaikutusosaaminen',
    },
  ],
  arvosanat: vocationalGrades3,
};

export const evaluationOptionsVocational3Malu: EvaluationOptions = {
  ArvosanaValikkoID: 7,
  tyyppi: 'ammMalu1-3',
  oppiaineet: [
    {
      oppiaine: 'malu1-3',
      oppiaineTeksti: 'Matemaattis-luonnontieteellinen osaaminen',
    },
  ],
  arvosanat: vocationalGrades3,
};

export const evaluationOptionsVocational3Yhty: EvaluationOptions = {
  ArvosanaValikkoID: 8,
  tyyppi: 'ammYhty1-3',
  oppiaineet: [
    {
      oppiaine: 'yhty1-3',
      oppiaineTeksti: 'Yhteiskunta- ja työelämäosaaminen',
    },
  ],
  arvosanat: vocationalGrades3,
};

export const evaluationOptionsVocational3Ka: EvaluationOptions = {
  ArvosanaValikkoID: 9,
  tyyppi: 'ammKa1-3',
  oppiaineet: [
    {
      oppiaine: 'ka1-3',
      oppiaineTeksti: 'Tutkinnon painotettu keskiarvo',
    },
  ],
  arvosanat: [
    {
      arvosana: '3.00',
      arvosanaTeksti: '3,00',
    },
    {
      arvosana: '2.98',
      arvosanaTeksti: '2,98',
    },
    {
      arvosana: '2.96',
      arvosanaTeksti: '2,96',
    },
    {
      arvosana: '2.95',
      arvosanaTeksti: '2,95',
    },
    {
      arvosana: '2.93',
      arvosanaTeksti: '2,93',
    },
    {
      arvosana: '2.91',
      arvosanaTeksti: '2,91',
    },
    {
      arvosana: '2.89',
      arvosanaTeksti: '2,89',
    },
    {
      arvosana: '2.87',
      arvosanaTeksti: '2,87',
    },
    {
      arvosana: '2.86',
      arvosanaTeksti: '2,86',
    },
    {
      arvosana: '2.84',
      arvosanaTeksti: '2,84',
    },
    {
      arvosana: '2.82',
      arvosanaTeksti: '2,82',
    },
    {
      arvosana: '2.80',
      arvosanaTeksti: '2,80',
    },
    {
      arvosana: '2.78',
      arvosanaTeksti: '2,78',
    },
    {
      arvosana: '2.77',
      arvosanaTeksti: '2,77',
    },
    {
      arvosana: '2.75',
      arvosanaTeksti: '2,75',
    },
    {
      arvosana: '2.73',
      arvosanaTeksti: '2,73',
    },
    {
      arvosana: '2.71',
      arvosanaTeksti: '2,71',
    },
    {
      arvosana: '2.69',
      arvosanaTeksti: '2,69',
    },
    {
      arvosana: '2.67',
      arvosanaTeksti: '2,67',
    },
    {
      arvosana: '2.65',
      arvosanaTeksti: '2,65',
    },
    {
      arvosana: '2.63',
      arvosanaTeksti: '2,63',
    },
    {
      arvosana: '2.61',
      arvosanaTeksti: '2,61',
    },
    {
      arvosana: '2.59',
      arvosanaTeksti: '2,59',
    },
    {
      arvosana: '2.56',
      arvosanaTeksti: '2,56',
    },
    {
      arvosana: '2.54',
      arvosanaTeksti: '2,54',
    },
    {
      arvosana: '2.52',
      arvosanaTeksti: '2,52',
    },
    {
      arvosana: '2.50',
      arvosanaTeksti: '2,50',
    },
    {
      arvosana: '2.48',
      arvosanaTeksti: '2,48',
    },
    {
      arvosana: '2.45',
      arvosanaTeksti: '2,45',
    },
    {
      arvosana: '2.43',
      arvosanaTeksti: '2,43',
    },
    {
      arvosana: '2.41',
      arvosanaTeksti: '2,41',
    },
    {
      arvosana: '2.39',
      arvosanaTeksti: '2,39',
    },
    {
      arvosana: '2.37',
      arvosanaTeksti: '2,37',
    },
    {
      arvosana: '2.34',
      arvosanaTeksti: '2,34',
    },
    {
      arvosana: '2.32',
      arvosanaTeksti: '2,32',
    },
    {
      arvosana: '2.30',
      arvosanaTeksti: '2,30',
    },
    {
      arvosana: '2.28',
      arvosanaTeksti: '2,28',
    },
    {
      arvosana: '2.26',
      arvosanaTeksti: '2,26',
    },
    {
      arvosana: '2.23',
      arvosanaTeksti: '2,23',
    },
    {
      arvosana: '2.21',
      arvosanaTeksti: '2,21',
    },
    {
      arvosana: '2.19',
      arvosanaTeksti: '2,19',
    },
    {
      arvosana: '2.17',
      arvosanaTeksti: '2,17',
    },
    {
      arvosana: '2.15',
      arvosanaTeksti: '2,15',
    },
    {
      arvosana: '2.12',
      arvosanaTeksti: '2,12',
    },
    {
      arvosana: '2.10',
      arvosanaTeksti: '2,10',
    },
    {
      arvosana: '2.08',
      arvosanaTeksti: '2,08',
    },
    {
      arvosana: '2.05',
      arvosanaTeksti: '2,05',
    },
    {
      arvosana: '2.03',
      arvosanaTeksti: '2,03',
    },
    {
      arvosana: '2.00',
      arvosanaTeksti: '2,00',
    },
    {
      arvosana: '1.97',
      arvosanaTeksti: '1,97',
    },
    {
      arvosana: '1.95',
      arvosanaTeksti: '1,95',
    },
    {
      arvosana: '1.92',
      arvosanaTeksti: '1,92',
    },
    {
      arvosana: '1.89',
      arvosanaTeksti: '1,89',
    },
    {
      arvosana: '1.86',
      arvosanaTeksti: '1,86',
    },
    {
      arvosana: '1.84',
      arvosanaTeksti: '1,84',
    },
    {
      arvosana: '1.81',
      arvosanaTeksti: '1,81',
    },
    {
      arvosana: '1.78',
      arvosanaTeksti: '1,78',
    },
    {
      arvosana: '1.76',
      arvosanaTeksti: '1,76',
    },
    {
      arvosana: '1.73',
      arvosanaTeksti: '1,73',
    },
    {
      arvosana: '1.70',
      arvosanaTeksti: '1,70',
    },
    {
      arvosana: '1.68',
      arvosanaTeksti: '1,68',
    },
    {
      arvosana: '1.65',
      arvosanaTeksti: '1,65',
    },
    {
      arvosana: '1.62',
      arvosanaTeksti: '1,62',
    },
    {
      arvosana: '1.59',
      arvosanaTeksti: '1,59',
    },
    {
      arvosana: '1.57',
      arvosanaTeksti: '1,57',
    },
    {
      arvosana: '1.54',
      arvosanaTeksti: '1,54',
    },
    {
      arvosana: '1.51',
      arvosanaTeksti: '1,51',
    },
    {
      arvosana: '1.49',
      arvosanaTeksti: '1,49',
    },
    {
      arvosana: '1.47',
      arvosanaTeksti: '1,47',
    },
    {
      arvosana: '1.44',
      arvosanaTeksti: '1,44',
    },
    {
      arvosana: '1.42',
      arvosanaTeksti: '1,42',
    },
    {
      arvosana: '1.40',
      arvosanaTeksti: '1,40',
    },
    {
      arvosana: '1.38',
      arvosanaTeksti: '1,38',
    },
    {
      arvosana: '1.36',
      arvosanaTeksti: '1,36',
    },
    {
      arvosana: '1.34',
      arvosanaTeksti: '1,34',
    },
    {
      arvosana: '1.32',
      arvosanaTeksti: '1,32',
    },
    {
      arvosana: '1.30',
      arvosanaTeksti: '1,30',
    },
    {
      arvosana: '1.28',
      arvosanaTeksti: '1,28',
    },
    {
      arvosana: '1.26',
      arvosanaTeksti: '1,26',
    },
    {
      arvosana: '1.23',
      arvosanaTeksti: '1,23',
    },
    {
      arvosana: '1.21',
      arvosanaTeksti: '1,21',
    },
    {
      arvosana: '1.19',
      arvosanaTeksti: '1,19',
    },
    {
      arvosana: '1.17',
      arvosanaTeksti: '1,17',
    },
    {
      arvosana: '1.15',
      arvosanaTeksti: '1,15',
    },
    {
      arvosana: '1.13',
      arvosanaTeksti: '1,13',
    },
    {
      arvosana: '1.11',
      arvosanaTeksti: '1,11',
    },
    {
      arvosana: '1.09',
      arvosanaTeksti: '1,09',
    },
    {
      arvosana: '1.07',
      arvosanaTeksti: '1,07',
    },
    {
      arvosana: '1.05',
      arvosanaTeksti: '1,05',
    },
    {
      arvosana: '1.02',
      arvosanaTeksti: '1,02',
    },
    {
      arvosana: '1.00',
      arvosanaTeksti: '1,00',
    },
  ],
};
