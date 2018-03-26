import * as actions from '../constants/action-types';

// change the unit properties
export const changeUnit = (name, year, changeProps) => {
  const defaultUnit = {
    name,
    year,
    credits: 20,
    grade: 100,
  };
  const payload = Object.assign(changeProps, defaultUnit);
  return { type: actions.CHANGE_UNIT, payload };
};

// add a unit
export const addUnit = year => ({
  type: actions.ADD_UNIT,
  payload: { year },
});

// remove a unit
export const removeUnit = (name, year) => ({
  type: actions.REMOVE_UNIT,
  payload: { name, year },
});
