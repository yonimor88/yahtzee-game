import React, { Component } from "react";
import Dice from "./Dice";
import ScoreTable from "./ScoreTable";

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dice: Array.from({ length: NUM_DICE }).map(d=> Math.ceil(Math.random() * 6)),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      rollAnimation : true,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      }
    };
    this.roll = this.roll.bind(this);
    this.doScore = this.doScore.bind(this);
    this.toggleLocked = this.toggleLocked.bind(this);
    this.animateRoll = this.animateRoll.bind(this);

  }

  animateRoll (){
    this.setState({rollAnimation: true },
      ()=>{
      setTimeout(this.roll, 1000);
    })
  }
  roll() {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft > 0 ? st.rollsLeft - 1 : st.rollsLeft,
      rollAnimation: false
    }));
  }
 
  componentDidMount() {
this.animateRoll()
    }
  

  toggleLocked(idx) {
    // toggle whether idx is in locked or not
    this.state.rollsLeft > 0 &&
    this.setState(st => ({
       locked: [
        ...st.locked.slice(0, idx),
        !st.locked[idx],
        ...st.locked.slice(idx + 1)
      ] 
    }));
  }

  doScore(rulename, ruleFn) {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => ({
      scores: { ...st.scores, [rulename]: ruleFn(this.state.dice) },
      rollsLeft: NUM_ROLLS,
      locked: Array(NUM_DICE).fill(false),
      dice: st.dice.map((d, i) =>
        st.locked[i] ? d : Math.ceil(Math.random() * 6)
      )
    }));
    this.animateRoll()
  }

  displayRollInfo() {
    const messages = [
      '0 Rolls left', '1 Rolls left', '2 Rolls left', 'Starting round'
    ]
    return messages[this.state.rollsLeft]
  }
  render() {
    const {dice, locked, rollsLeft, rollAnimation, scores } = this.state
    return (
      <div className='Game'>
        <header className='Game-header'>
          <h1 className='App-title'>Yahtzee!</h1>

          <section className='Game-dice-section'>
            <Dice
              dice={dice}
              locked={locked}
              handleClick={this.toggleLocked}
              disabled={rollsLeft === 0}
              rolling={rollAnimation}
            />
            <div className='Game-button-wrapper'>
              
              <button
                className='Game-reroll'
                disabled={locked.every(x => x ===true) || rollsLeft ===0 || rollAnimation}
                onClick={this.animateRoll}
              >{this.displayRollInfo()}
              </button>
            </div>
          </section>
        </header>
        <ScoreTable doScore={this.doScore} scores={scores} />
      </div>
    );
  }
}

export default Game;
