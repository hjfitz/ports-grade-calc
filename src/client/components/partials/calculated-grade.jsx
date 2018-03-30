import React, { Component } from 'react';
import { connect } from 'react-redux';

const mapStoreToProps = state => ({ calculated: state.calculated });
