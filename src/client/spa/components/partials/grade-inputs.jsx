import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions';

const mapStoreToProps = state => ({ years: state });

const mapDispatchToProps = dispatch => ({
  removeUnit: (name, year) => dispatch(actions.removeUnit(name, year)),
  addUnit: year => dispatch(actions.addUnit(year)),
});

const yearMap = {
  year2: 'Second Year',
  year3: 'Third Year',
};

class ConnectedGradeInputs extends React.Component {
  constructor(props) {
    super(props);
    this.removeUnit = this.removeUnit.bind(this);
  }

  removeUnit(name, year) {
    console.log(name, year);
    this.props.removeUnit(name, year);
  }

  render() {
    const { years } = this.props;
    const yearInputs = Object.keys(years).map(year => {
    // generate table
      const mappedUnits = years[year].units.map(unit => {
        const { name, credits, grade } = unit;
        return (
          <div className="row">
            <div className="col col-md-6">
              <input type="text" className="form-control" placeholder={name} />
            </div>
            <div className="col col-md-3">
              <input type="text" className="form-control" placeholder={grade} />
            </div>
            <div className="col col-md-2">
              <input type="text" className="form-control" placeholder={credits} />
            </div>
            <button type="button" className="btn btn-danger col col-md-1" onClick={() => { this.removeUnit(name, year); }}>X</button>
          </div>
        );
      });

      // generate table containers
      return (
        <div className="col col-md-6">
          <div className="card">
            <div className="card-body">
              <div className="card-title">{yearMap[year]}</div>
              {mappedUnits}
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

