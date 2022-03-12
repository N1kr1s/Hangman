import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import { ENGLISH_WORDS } from "./words";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";

class Hangman extends Component {
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: this.randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.handleRestart = this.handleRestart.bind(this);
  }

  guessedWord() {
    return this.state.answer
      .split("")
      .map((ltr) => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState((st) => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1),
    }));
  }

  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map((ltr) => (
      <button
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
        key={uuidv4()}
      >
        {ltr}
      </button>
    ));
  }

  winLooseDetermine() {
    let result;
    if (this.state.nWrong === this.props.maxWrong) {
      result = <h1>You Lost</h1>;
    } else if (this.guessedWord().join("") === this.state.answer) {
      result = <h1>You Win!</h1>;
    } else {
      result = <p className="Hangman-btns">{this.generateButtons()}</p>;
    }
    return result;
  }

  randomWord() {
    return ENGLISH_WORDS[Math.floor(Math.random() * ENGLISH_WORDS.length)];
  }

  handleRestart() {
    this.setState({ nWrong: 0, guessed: new Set(), answer: this.randomWord() });
  }

  render() {
    return (
      <div className="Hangman">
        <h1>Hangman</h1>

        <img
          src={this.props.images[this.state.nWrong]}
          alt={`${this.state.nWrong}/6`}
        />
        <p>{`Wrong letters : ${this.state.nWrong}/6`}</p>
        <p className="Hangman-word">
          {this.state.nWrong === this.props.maxWrong
            ? this.state.answer
            : this.guessedWord()}
        </p>
        {this.winLooseDetermine()}
        <button style={{ width: "70px" }} onClick={this.handleRestart}>
          Restart
        </button>
      </div>
    );
  }
}

export default Hangman;
