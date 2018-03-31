import React from 'react';
import { GradeInputs, CalculatedGrades, Rules } from '../Partials';

const Calculator = () => (
  <div className="container">
    <h1>Portsmouth Grade Calculator</h1>
    <div className="row">
      <CalculatedGrades />
      <GradeInputs />
      <Rules />
    </div>
  </div>
);

export default Calculator;
