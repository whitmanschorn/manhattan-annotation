import React, { Component } from 'react';
import { Slider } from './slider'
import { Island } from './island'
var ColorPicker = require('react-color');
var _ = require('underscore')
var CANVAS_HEIGHT = 500
var CANVAS_WIDTH = 500
var DEFAULT_COLOR= '#111111'
var DEFAULT_SLIDERS = {
    x: {
        label: 'x',
        value: CANVAS_WIDTH / 2,
        min: 0,
        max: CANVAS_WIDTH,
        step: 1,
    },
    y: {
        label: 'y',
        value: CANVAS_HEIGHT / 2,
        min: 0,
        max: CANVAS_HEIGHT,
        step: 1,
    },
    z: {
        label: 'z',
        value: 1,
        min: 0.1,
        max: 10,
        step: 0.01,
    },
    rot: {
        label: 'rot',
        value: 0,
        min: -360,
        max: 360,
        step: 1,
    },
}

export class App extends Component {

    constructor(props) {
        super(props);
        this.state = {sliders: DEFAULT_SLIDERS, color: DEFAULT_COLOR}
    }

    // in a more complex app, these would be registered actions the reducer would handle.
    generateSliderCallback (slider){
        return _.bind(function (evt) {
            var newSliders = this.state.sliders
            newSliders[slider.label].value = evt
            this.setState({sliders: newSliders})
        }, this)
    }

    onChangeColor (evt) {
        this.setState({color: evt.hex})
    }

    handleDrag (evt) {
        var newSliders = this.state.sliders
        newSliders.x.value += evt.movementX
        newSliders.y.value += evt.movementY
        this.setState({sliders: newSliders})     
    }

    render() {
        var sliders = _.map(this.state.sliders, function (slider) {
            slider.onValueChange = this.generateSliderCallback(slider).bind(this)
            return (
                <Slider key={slider.label} {...slider}/>
                )

        }, this);

        var fillColor = '#' + this.state.color

        var island = (<Island {...{
                xValue: this.state.sliders.x.value,
                yValue: this.state.sliders.y.value,
                zValue: this.state.sliders.z.value,
                rotValue: this.state.sliders.rot.value,
                fillColor: fillColor,
                onDrag: this.handleDrag.bind(this)
            }}/>)

        return (<div>            
                <div className="controls" style={{position: 'fixed', zIndex: 2}}>
                {sliders}
                <span style={{right:'30px', position: 'fixed'}}><ColorPicker type="compact" onChangeComplete={this.onChangeColor.bind(this)} color={fillColor}/></span>
                </div>
                <div style={{position: 'absolute'}}>
                    {island}
                </div>
            </div>);
    }
}