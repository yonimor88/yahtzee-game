import React, { Component } from 'react';

class RuleRow extends Component {
  render() {
    const {doScore, score, name , description} = this.props;
    const disabled = score !== undefined;
    return (
      <tr className={disabled ?  "RuleRow RuleRow-disabled" : "RuleRow RuleRow-active" } 
      onClick={disabled ? null : doScore }>
        <td className="RuleRow-name">{name}</td>
        <td className="RuleRow-score">{disabled ? score : description}</td>
      </tr>
    )
  }
}

export default RuleRow;