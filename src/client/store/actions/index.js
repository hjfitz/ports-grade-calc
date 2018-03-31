import * as actions from '../constants/action-types';

const log = (...msgs) => console.log('[ACTION]', ...msgs);

// change the unit properties
export const changeUnit = (index, name, year, changeProps = {}) => {
  log(`changeUnit@${year}`, JSON.stringify(changeProps));
  const defaultUnit = {
    index,
    year,
    name,
  };
  const payload = Object.assign(defaultUnit, changeProps);
  return { type: actions.CHANGE_UNIT, payload };
};

// add a unit
export const addUnit = year => ({
  type: actions.ADD_UNIT,
  payload: { year },
});

// remove a unit
export const removeUnit = (year, index) => ({
  type: actions.REMOVE_UNIT,
  payload: { year, index },
});

export const changeGrade = (index, grade, credits, year) => ({
  type: actions.CHANGE_GRADE,
  payload: {
    index,
    grade,
    credits,
    year,
  },
});
