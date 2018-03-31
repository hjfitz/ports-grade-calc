import React from 'react';
import { connect } from 'react-redux';

const mapStoreToProps = state => ({ calculated: state.calculated });

const ConnectedGradeBox = props => {
  const {
    rule1, rule2, rule3, err,
  } = props.calculated;
  let inner = (
    <div className="card-body">
      <h5 className="card-title">Calculated Grades: </h5>
      <h6>Rule 1: {rule1}</h6>
      <h6>Rule 2: {rule2}</h6>
      <h6>Rule 3: {rule3}</h6>
    </div>
  );
  if (err) {
    inner = (
      <div className="card-body">
        <h5 className="card-title">Error</h5>
        <h6>You must toal 120 credits per year!</h6>
      </div>
    );
  }
  return (
    <div className="row grade">
      <div className="col col-md-12">
        <div className="card" >
          {inner}
        </div>
      </div>
    </div>
  );
};

const GradeBox = connect(mapStoreToProps)(ConnectedGradeBox);

export default GradeBox;
