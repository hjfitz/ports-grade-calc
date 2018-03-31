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
  changeGrade: (index, grade, credits, year) =>
    dispatch(actions.changeGrade(index, grade, credits, year)),
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

  changeGrade(index, year, cName) {
    // :stophack:
    const elems = document.querySelectorAll(`.${cName}`);
    const [, grade, credits] = [...elems].map(elem => elem.value);
    this.props.changeGrade(index, grade, credits, year);
  }

  render() {
    const { years } = this.props;
    const yearInputs = Object.keys(years).map(year => {
    // generate table
      const mappedUnits = years[year].units.map((unit, idx) => {
        const { name, credits, grade } = unit;
        const className = `${year}${idx}${name.replace(/ /g, '')}`;
        const onBlur = () => this.changeUnit(idx, year, className);
        const onKeyUp = () => this.changeGrade(idx, year, className);
        /* disable eslint here because the index is not arbitrary
           and two entries could be the same */
        /* eslint-disable react/no-array-index-key */
        return (
          <div key={year + name + grade + idx} className="row unit">
            <div className="col col-md-6">
              <input
                type="text"
                className={`form-control name ${className}`}
                defaultValue={name}
                onBlur={onBlur}
              />
            </div>
            <div className="col col-md-3">
              <input
                type="text"
                className={`form-control grade ${className}`}
                defaultValue={grade}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
              />
            </div>
            <div className="col col-md-2">
              <input
                type="text"
                className={`form-control credits ${className}`}
                defaultValue={credits}
                onBlur={onBlur}
                onKeyUp={onKeyUp}
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
              <div className="row">
                <div className="col col-md-6">Unit</div>
                <div className="col col-md-3">Grade</div>
                <div className="col col-md-3">Credits</div>
              </div>
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

