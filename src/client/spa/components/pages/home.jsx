import React, { Component } from 'react';
import { GradeInputs } from '../Partials';

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { children: [] };
  }

  render() {
    return (
      <div className="container">
        <h1>Portsmouth Grade Calculator</h1>
        <div className="row">
          <GradeInputs />
        </div>
      </div>
    );
  }
}
