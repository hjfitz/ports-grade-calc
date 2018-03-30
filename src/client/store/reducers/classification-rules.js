import { cloneDeep } from 'lodash/lang';
import { flatten, uniq, chunk } from 'lodash/array';

/**
 * sort a year by grade, highest to lowest
 * @param {object} u1 First unit
 * @param {object} u2 Second unit
 */
const sortByGrade = (u1, u2) => {
  if (u1.grade > u2.grade) {
    return 1;
  } else if (u1.grade < u2.grade) {
    return -1;
  }
  return 0;
};

const discountWorstCredits = year => {
  const sorted = year.sort(sortByGrade);
  sorted.splice(0, 4); // remove the worst 20 creds
  return sorted;
};

const avgYear = year => {
  const total = year
    .map(gr => parseInt(gr.grade, 10))
    .reduce((acc, cur) => acc + cur);
  const mean = total / year.length;
  return mean;
};

/**
 * Standardises the year
 * splits units in groups of 5 credits for easier parsing
 * @param {object[]} year A year worth of credits
 */
const splitCredits = year => {
  const normalised = year.map(unit => {
    const { grade, credits, name } = unit;
    const toPush = credits / 5;
    if (credits % 5 !== 0) throw new Error('Invalid credits');
    const normalisedUnit = [];
    for (let i = 0; i < toPush; i += 1) {
      normalisedUnit.push({
        name,
        grade,
        credits: 5,
        originalCredits: credits,
      });
    }
    return normalisedUnit;
  });
  return flatten(normalised);
};


const calculateGrades = units => {
  // make sure to not fuck with the current state
  const clonedUnits = cloneDeep(units);
  const normaly2 = splitCredits(clonedUnits.year2.units);
  const normaly3 = splitCredits(clonedUnits.year3.units);

  const y2disc = discountWorstCredits(normaly2);
  const y3disc = discountWorstCredits(normaly3);

  const avgY2 = avgYear(y2disc);
  const avgY3 = avgYear(y3disc);

  const ret = {};

  /**
   * the  classification  of  the  weighted  mean  of  all  relevant  credits
   * at  Level  5  and  all relevant credits at Level 6 in the ratio of 40:60 respectively
   * after first discounting the marks in the worst 20 credits both at Level 5 and at Level 6
   */

  ret.rule1 = ((avgY2 * 0.4) + (avgY3 * 0.6)).toFixed(3);
  /**
   * the  classification  of  the  weighted  mean  of  all  relevant  credits  at  Level  6
   * after  first discounting the marks in the worst 20 credits at Level 6
   */

  ret.rule2 = avgY3.toFixed(3);

  /**
   * the minimum classification in which more than 50% of the combined relevant
   * credits at Level 5 and Level 6 were attained after first discounting the marks in the
   * worst 20 credits both at Level 5 and at Level 6
   */

  // dismiss the worst 20 credits per year (done)
  // join both years
  const yearsJoined = y2disc.concat(y3disc);
  // put units back together and sort by grade
  const rejoined = yearsJoined
    .map(unit => {
      const { originalCredits, name, grade } = unit;
      return { name, grade, credits: originalCredits };
    })
    .map(JSON.stringify);

  const sorted = uniq(rejoined).map(JSON.parse).sort(sortByGrade);

  // split again
  // this process means that we don't get units with the same grade mixed up
  const [lowerBound] = chunk(splitCredits(sorted), 22);
  const { grade } = lowerBound[lowerBound.length - 1];
  ret.rule3 = grade.toFixed(3);


  // remove the top 140 credits
  // unitsSplit.splice(0, 28);
  return ret;
};

export default calculateGrades;
