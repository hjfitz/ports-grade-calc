import React from 'react';
import { GradeInputs, CalculatedGrades } from '../Partials';

const Calculator = () => (
  <div className="container">
    <h1>Portsmouth Grade Calculator</h1>
    <div className="row">
      <CalculatedGrades />
      <GradeInputs />
    </div>
  </div>
);

export default Calculator;
