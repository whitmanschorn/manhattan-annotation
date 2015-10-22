import React from 'react';
// import './styles.css';
var NumberEditor = require('react-number-editor');
var _ = require('underscore')

export class Slider extends React.Component {
    propTypes: {
        label: React.PropTypes.string.isRequired,
        min: React.PropTypes.number.isRequired,
        max: React.PropTypes.number.isRequired,
        value: React.PropTypes.number.isRequired,
        step: React.PropTypes.number.isRequired,
        onValueChange: React.PropTypes.func.isRequired,
    }

    render () {
        return (
         <span style={{paddingLeft: 20}}>
            <b>{this.props.label}</b>
             <NumberEditor min={this.props.min} max={this.props.max} step={this.props.step} decimals={2} value={this.props.value} onValueChange={this.props.onValueChange} />
         </span>
         )
    }
}
