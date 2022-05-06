import React from 'react';
import { Link, withRouter } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    this.handleInputChange = this.handleInputChange.bind(this);       //жестко привязываем this
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value,        //описываем что добавляется в state каждого input
    })
  }

  handleSubmit(event) {
    // описываем что должно произойти при сабмите
    event.preventDefault();

    if (this.state.password) {
      const { email, password } = this.state;
      this.props.onRegister(email, password);
    }
  }

  render() {
    return (
      <div className='container'>
        <h1 className='container__title'>Регистрация</h1>
        <form className='form' name="form" onSubmit={this.handleSubmit}>
          <input id="e-input" className="form__input" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} required />
          <input id="p-input" className="form__input" type="password" name="password" placeholder="Пароль" value={this.state.password} onChange={this.handleInputChange} required />
          <button type="submit" className="form__button" onSubmit={this.handleSubmit} >Зарегистрироваться</button>
        </form>
        <Link to="/" className="link"><p className='text'> Уже зарегистрированы? Войти </p></Link>
      </div>
    )
  }
}

export default withRouter(Register);


