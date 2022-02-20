import React, { Component } from "react";

class Die extends Component {
  static defaultProps = {
    numberWords: ['one', 'two', 'three', 'four', 'five', 'six']
  }
  
  render() {
    const { numberWords, val, locked, idx ,handleClick, disabled, rolling} = this.props;
    let classes= `Die fas fa-5x fa-dice-${numberWords[val-1]} `
    if (locked) classes += `Die-locked ` 
    if (rolling) classes += `Die-rolling` 
    return (
      <i className={classes}
        onClick={()=>handleClick(idx)}
        disabled={disabled}>
        </i>
    );
  }
}

export default Die;
