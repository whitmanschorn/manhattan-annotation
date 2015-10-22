import React, { Component } from 'react';
import { Slider } from './slider'
var ColorPicker = require('react-color');
var Draggable = require('react-draggable');
var _ = require('underscore')
var CANVAS_HEIGHT = 500
var CANVAS_WIDTH = 500

export class App extends Component {

    constructor(props) {

        super(props);
        var sliders = {
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
                max: 5,
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

        var color = '#111111'

        this.state = {sliders: sliders, color: color}
    }


    generateSliderCallback (slider){
        return _.bind(function (evt) {
            var newSliders = this.state.sliders
            newSliders[slider.label].value = evt
            this.setState({sliders: newSliders})
            // this.forceUpdate()
        }, this)
    }


    render() {
        var sliders = _.map(this.state.sliders, function (slider) {
            slider.onValueChange = this.generateSliderCallback(slider).bind(this)
            return (
                <Slider key={slider.label} {...slider}/>
                )

        }, this);

        var onChangeColor = function (evt) {
            this.setState({color: evt.hex})
        }

        var handleDrag = function(evt) {
            var newSliders = this.state.sliders
            newSliders.x.value += evt.movementX
            newSliders.y.value += evt.movementY
            this.setState({sliders: newSliders})     
        }

        var translateString = 'translate(' + this.state.sliders.x.value + 'px,' + this.state.sliders.y.value + 'px)'
        var scaleString = 'scale(' + this.state.sliders.z.value + ',' + this.state.sliders.z.value + ')'
        var rotationString = 'rotate(' + this.state.sliders.rot.value + 'deg)'
        var sliderStyles = {width: 300, height: 300, transform: translateString + scaleString + rotationString }
        var fillColor = '#' + this.state.color
        var island = (
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style={sliderStyles} viewBox="0 0 300 300">
            <polygon
            style = {{fill: fillColor}}
            points = '279.1,160.8 195.2,193.3 174.4,280.8   117.6,211.1 27.9,218.3 76.7,142.7 42.1,59.6 129.1,82.7 197.4,24.1 202.3,114 '/>
            </svg>)

        return (
            <div>            
            <div className="controls" style={{position: 'fixed'}}>
            {sliders}
            <span style={{right:'30px', position: 'fixed'}}><ColorPicker type="compact" onChangeComplete={onChangeColor.bind(this)} /></span>
            </div>
            <div style={{position: 'absolute'}}>
            <Draggable onDrag={handleDrag.bind(this)}>
                {island}
            </Draggable>
            </div>
            </div>
            );
    }
}