import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Question extends Component {
  constructor() {
    super();
    this.state = {
      vote: 0,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target }) {
    // console.log(target.parentNode);
    this.setState((previousState) => ({
      vote: previousState.vote + 1,
    }), () => {
      const { vote } = this.state;
      target.parentNode.style.order = `${-vote}`;
    });
  }

  render() {
    const { object: { user, question } } = this.props;
    const { vote } = this.state;
    return (
      <div>
        <p>{ user }</p>
        <p>{ question }</p>
        <p>{ vote }</p>
        <button
          type="button"
          onClick={ this.handleClick }
        >
          Vote!
        </button>
      </div>
    );
  }
}

Question.propTypes = {
  object: PropTypes.shape({
    user: PropTypes.string,
    question: PropTypes.string,
  }),
}.isRequired;
