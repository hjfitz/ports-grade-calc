import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

const mapStoreToProps = state => ({ years: state });

const mapDispatchToProps = dispatch => ({
  removeUnit: (name, year) => dispatch(actions.removeUnit(name, year)),
  addUnit: year => dispatch(actions.addUnit(year)),
  changeUnit: (index, name, year, changes) =>
    dispatch(actions.changeUnit(index, name, year, changes)),
});

const yearMap = {
  year2: 'Second Year',
  year3: 'Third Year',
};

class ConnectedGradeInputs extends React.Component {
  constructor(props) {
    super(props);
    this.removeUnit = this.removeUnit.bind(this);
    this.changeCredits = this.changeCredits.bind(this);
    this.changeGrade = this.changeGrade.bind(this);
    this.changeName = this.changeName.bind(this);
  }

  removeUnit(year, event) {
    const { index } = event.target.parentElement.dataset;
    console.log(event.target);
    this.props.removeUnit(year, index);
  }

  changeGrade(year, index, event, name) {
    const { value: grade } = event.target;
    this.props.changeUnit(index, name, year, { grade });
  }

  changeCredits(year, index, event, name) {
    const { value: credits } = event.target;
    this.props.changeUnit(index, name, year, { credits });
  }

  changeName(year, index, event) {
    const { value: name } = event.target;
    this.props.changeUnit(index, name, year);
  }

  render() {
    const { years } = this.props;
    const yearInputs = Object.keys(years).map(year => {
    // generate table
      const mappedUnits = years[year].units.map((unit, idx) => {
        const { name, credits, grade } = unit;
        return (
          <div key={year + idx + name} className="row" data-index={idx}>
            <div className="col col-md-6">
              <input type="text" className="form-control name" defaultValue={name} onKeyUp={e => this.changeName(year, idx, e)} />
            </div>
            <div className="col col-md-3">
              <input type="text" className="form-control grade" defaultValue={grade} onKeyUp={e => this.changeGrade(year, idx, e, name)} />
            </div>
            <div className="col col-md-2">
              <input type="text" className="form-control credits" defaultValue={credits} onKeyUp={e => this.changeCredits(year, idx, e, name)} />
            </div>
            <button type="button" className="btn btn-danger col col-md-1" onClick={e => { this.removeUnit(year, e); }}>X</button>
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
              <button type="button" className="btn btn-primary" onClick={() => this.props.addUnit(year)}>Add a Unit</button>
            </div>
          </div>
        </div>
      );
    });
    return yearInputs;
  }
}

const GradeInputs = connect(mapStoreToProps, mapDispatchToProps)(ConnectedGradeInputs);

export default GradeInputs;

