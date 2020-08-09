import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import calculate from '../utils/utils'
import '../css/bmiCalculator.css';

export default class bmiCalculator extends Component {
  constructor(props){
    super(props);
    this.state={
      show : false,
      isMetric : true,
      BMI : 0,
      ft : 0,
      in : 0,
      kg : 0,
      cm : 0,
      lbs : 0
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange = (evt,handler) => this.setState({[handler] : evt.target.value})

  render() {
  return (
    <div className="boarder">
      <div className="box">
        <RadioGroup aria-label="gender" name="gender1" value={this.state.isMetric} onChange={()=>this.setState({isMetric : !this.state.isMetric})}>
          <div className="container">
            <FormControlLabel value={true} control={<Radio />} label="Metric" />
            <FormControlLabel value={false} control={<Radio />} label="Standard" />
          </div>
        </RadioGroup>
        {!this.state.isMetric && <div>
          <div className="standardContainer">
              <TextField className="textBox" variant="outlined" placeholder="feet" onChange={(evt) => this.handleChange(evt,"ft")}/>
              <TextField className="textBox" variant="outlined" placeholder="inches" onChange={(evt) => this.handleChange(evt,"in")}/>
          </div>
          <div className="standardContainer">
            <TextField className="textBox" variant="outlined" placeholder="Pounds" onChange={(evt) => this.handleChange(evt,"lbs")}/>
          </div>
        </div>}
        {this.state.isMetric &&
          <div className="container">
            <TextField style={{paddingBottom : '10px'}}className="textBox" variant="outlined" placeholder="centimeters" onChange={(evt) => this.handleChange(evt,"cm")}/>
            <TextField className="textBox" variant="outlined" placeholder="Kilograms" onChange={(evt) => this.handleChange(evt,"kg")}/>
          </div>
        }
        <Button variant="contained" color="primary" onClick={() => {
            let kg = this.state.kg;
            let height = this.state.cm;
          if (!this.state.isMetric){
            kg = calculate.lbsToKg(this.state.lbs)
            height = calculate.inToCm(parseInt(this.state.ft * 12) + parseInt(this.state.in));
          }
          this.setState({
            show : true,
            BMI : calculate.getBMI(kg, height)})
        }}>
          Calculate
        </Button>
        {this.state.show && <p>{`Your BMI: ${this.state.BMI.toFixed(2)}`}</p>}
      </div>
    </div>
  );
  }
}
