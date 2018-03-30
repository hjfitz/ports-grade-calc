import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions';

/**
 * TO FUCKING DO
 * dispatch changeUnit onBlur for grade/credits
 * dispatch a new action for *purely* calculating the grade
 *   which not reflow, meaning no focus lost
 */

const mapStoreToProps = state => ({ years: state.years });

const mapDispatchToProps = dispatch => ({
  removeUnit: (name, year) => dispatch(actions.removeUnit(name, year)),
  addUnit: year => dispatch(actions.addUnit(year)),
  changeUnit: (index, name, year, changes) =>
    dispatch(actions.changeUnit(index, name, year, changes)),
});

const yearMap = { year2: 'Second Year', year3: 'Third Year' };

class ConnectedGradeInputs extends React.Component {
  removeUnit(year, index) {
    this.props.removeUnit(year, index);
  }

  changeUnit(index, year, cName) {
    // hack
    const elems = document.querySelectorAll(`.${cName}`);
    const [name, grade, credits] = [...elems].map(elem => elem.value);
    this.props.changeUnit(index, name, year, { grade, credits });
  }

  render() {
    const { years } = this.props;
    const yearInputs = Object.keys(years).map(year => {
    // generate table
      const mappedUnits = years[year].units.map((unit, idx) => {
        const { name, credits, grade } = unit;
        const className = `${year}${idx}${name}`;
        const callback = () => this.changeUnit(idx, year, className);
        return (
          <div key={year + name + (grade * idx)} className="row unit">
            <div className="col col-md-6">
              <input
                type="text"
                className={`form-control name ${className}`}
                defaultValue={name}
                onBlur={callback}
              />
            </div>
            <div className="col col-md-3">
              <input
                type="text"
                className={`form-control grade ${className}`}
                defaultValue={grade}
                onBlur={callback}
              />
            </div>
            <div className="col col-md-2">
              <input
                type="text"
                className={`form-control credits ${className}`}
                defaultValue={credits}
                onBlur={callback}
              />
            </div>
            <button
              type="button"
              className="btn btn-danger col col-md-1"
              onClick={() => this.props.removeUnit(year, idx)}
            >X
            </button>
          </div>
        );
      });

      // generate table containers
      return (
        <div key={year} className="col col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="card-title">{yearMap[year]}</div>
              {mappedUnits}
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => this.props.addUnit(year)}
              >Add a Unit
              </button>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div className="row">
        {yearInputs}
      </div>
    );
  }
}

const GradeInputs = connect(mapStoreToProps, mapDispatchToProps)(ConnectedGradeInputs);

export default GradeInputs;

