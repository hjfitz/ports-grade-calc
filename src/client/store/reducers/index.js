import * as actions from '../constants/action-types';

const initialState = {
  year2: {
    units: [
      { name: 'DSALG', credits: 20, grade: 100 },
      { name: 'MATHFUN', credits: 20, grade: 100 },
      { name: 'ADPROC', credits: 20, grade: 100 },
      { name: 'INSE', credits: 20, grade: 100 },
      { name: 'COSINE', credits: 20, grade: 100 },
      { name: 'WEBSCRP', credits: 20, grade: 100 },
    ],
  },
  year3: {
    units: [
      { name: 'PJE', credits: 40, grade: 100 },
      { name: 'THEOCS', credits: 20, grade: 100 },
      { name: 'DISPARP', credits: 20, grade: 100 },
      { name: 'SECRYPT', credits: 20, grade: 100 },
      { name: 'WEBRES', credits: 20, grade: 100 },
    ],
  },
};

/**
 * @param {object} state new state
 * @param {string} action action to do
 */
const rootReducer = (state = initialState, action) => {
  const { type, payload } = action;
  console.log(action);

  if (!payload || !payload.year) return state;

  console.log(state);

  // clone the state to avoid any unwanted mutations
  const clonedState = Object.assign({}, state);
  const curYear = clonedState[payload.year];
  console.log(curYear);
  switch (type) {
    case actions.CHANGE_UNIT: {
      const { credits, grade, name } = payload;
      const [unit] = curYear.units.reduce(year => year.name === name);
      Object.assign(unit, { credits, grade });
      return state;
    }
    case actions.ADD_UNIT: {
      curYear.units.push({ name: 'Placeholder', credits: 20, grade: 100 });
      return state;
    }

    case actions.REMOVE_UNIT: {
      const { name } = payload;
      const unit = curYear.units.filter(year => year.name === name);
      const index = curYear.units.indexOf(unit);
      if (index > -1) {
        curYear.splice(index, 1);
      }
      return state;
    }

    default: {
      return state;
    }
  }
};
export default rootReducer;
