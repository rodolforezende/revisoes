import React, { Component } from 'react';
import Question from '../components/Question';
import './Home.css';

export default class Home extends Component {
  constructor() {
    super();

    this.state = {
      user: '',
      question: '',
      allQuestions: [],
      order: 'container-question',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleAllQuestions = this.handleAllQuestions.bind(this);
  }

  componentDidMount() {
    this.handleAllQuestions();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick() {
    // event.preventDefault();
    const objeto = {};
    const { user, question } = this.state;
    if (user === '') {
      objeto.user = 'Anônimo';
    } else {
      objeto.user = user;
    }
    if (question === '') {
      console.log('Pergunta vazia');
    } else {
      objeto.question = question;
      if (!localStorage.allQuestions) {
        objeto.id = 1;
        localStorage.setItem('allQuestions', JSON.stringify([objeto])); // Stringify transforma objeto em JSON.
      } else {
        const received = JSON.parse(localStorage.getItem('allQuestions')); // Parse transforma o JSON em objeto.
        objeto.id = received.length + 1;
        localStorage.setItem('allQuestions', JSON.stringify([...received, objeto]));
      }
      // this.handleAllQuestions();
    }
  }

  handleAllQuestions() {
    if (localStorage.allQuestions) {
      this.setState({
        allQuestions: JSON.parse(localStorage.getItem('allQuestions')),
      });
    }
  }

  render() {
    const { user, question, allQuestions, order } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="user">
            <input
              name="user"
              type="text"
              placeholder="Digite seu nome"
              value={ user }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="question">
            <textarea
              name="question"
              type="text"
              placeholder="Digite sua pergunta"
              value={ question }
              onChange={ this.handleChange }
            />
          </label>
          <button type="submit" onClick={ this.handleClick }>Enviar</button>
        </form>
        <button
          type="button"
          onClick={ () => this.setState({ order: 'container-question' }) }
        >
          Popular
        </button>
        <button
          type="button"
          onClick={ () => this.setState({ order: '' }) }
        >
          Recentes
        </button>
        <div className={ order }>
          { allQuestions.map(
            (value, index) => (
              <Question
                object={ value }
                key={ index }
              />),
          )}
        </div>
      </div>
    );
  }
}
