import { cloneDeep } from 'lodash/lang';
import calculateGrades from './classification-rules';
import * as actions from '../constants/action-types';

const log = (...messages) => console.log('[REDUCER]', ...messages);

const initialUnits = {
  year2: {
    units: [
      { name: 'DSALG', credits: 20, grade: 91 },
      { name: 'MATHFUN', credits: 20, grade: 94 },
      { name: 'ADPROC', credits: 20, grade: 80 },
      { name: 'INSE', credits: 20, grade: 78 },
      { name: 'COSINE', credits: 20, grade: 87 },
      { name: 'WEBSCRP', credits: 20, grade: 77 },
    ],
  },
  year3: {
    units: [
      { name: 'PJE', credits: 40, grade: 70 },
      { name: 'THEOCS', credits: 20, grade: 40 },
      { name: 'DISPARP', credits: 20, grade: 40 },
      { name: 'SECRYPT', credits: 20, grade: 40 },
      { name: 'WEBRES', credits: 20, grade: 40 },
    ],
  },
};

const initialState = {
  years: {
    ...initialUnits,
  },
  calculated: calculateGrades(initialUnits),
};

const recalc = state => {
  const years = cloneDeep(state.years);
  log('recalculating grades');
  state.calculated = calculateGrades(years);
};

/**
 * @param {object} state new state
 * @param {string} action action to do
 */
const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;

  if (!payload || !payload.year) return state;
  // clone the state to avoid any unwanted mutations
  const clonedState = cloneDeep(state);
  const curYear = clonedState.years[payload.year];
  switch (type) {
    case actions.CHANGE_UNIT: {
      const {
        credits, grade, name, index,
      } = payload;
      log('changing', name);

      const unit = curYear.units[index];
      Object.assign(unit, { credits, grade, name });
      recalc(clonedState);
      return clonedState;
    }
    case actions.ADD_UNIT: {
      log('adding new unit');
      curYear.units.push({
        name: 'Placeholder',
        credits: 20,
        grade: 100,
      });
      recalc(clonedState);
      return clonedState; }

    case actions.REMOVE_UNIT: {
      const { index } = payload;
      console.log('removing', index);
      if (index > -1) {
        curYear.units.splice(index, 1);
      }
      recalc(clonedState);
      return clonedState;
    }

    case actions.CHANGE_GRADE: {
      const {
        year,
        index,
        grade,
        credits,
      } = payload;
      const clonedYears = cloneDeep(clonedState.years);
      console.log(year);
      const clonedCurYear = clonedYears[year];
      console.log(clonedCurYear);

      clonedCurYear.units[index] = {
        name: clonedCurYear.units[index].name,
        grade,
        credits,
      };
      clonedState.calculated = calculateGrades(clonedYears);
    }

    default: {
      return clonedState;
    }
  }
};
export default rootReducer;
