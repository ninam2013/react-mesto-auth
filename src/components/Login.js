import React from 'react';
import { withRouter } from 'react-router-dom';


class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const name = target.name;

    this.setState({
      [name]: target.value,
    })
  }

  handleSubmit(event) {
    event.preventDefault();

    if (!this.state.email || !this.state.password) {
      return;
    }
    this.props.onLogin(this.state.email, this.state.password);
  }

  render() {
    return (
      <div className='container'>
        <h1 className='container__title'>Вход</h1>
        <form className='form' name="form" onSubmit={this.handleSubmit}>
          <input id="e-input" className="form__input" type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleInputChange} required />
          <input id="p-input" className="form__input" type="password" name="password" placeholder="Пароль" value={this.state.password} onChange={this.handleInputChange} required />
          <button type="submit" className="form__button" onSubmit={this.handleSubmit}>Войти</button>
        </form>

      </div>
    )
  }
}

export default withRouter(Login);