import React, { Component } from 'react';
import './App.css';
import { todos } from './data.json';

import Formulario from './components/Formulario';
import Argentina from './images/png/001-argentina.png';
class App extends Component {
  constructor() {
    super();
    this.state = {
     todos // es lo mismo que poner todos: todos
    };
    this.handleAddTodo = this.handleAddTodo.bind(this);
  }

  handleAddTodo(todo) {
    this.setState ({
      todos: [...this.state.todos, todo]
    })
  }

  removeTodo (index) {
    this.setState({
      todos: this.state.todos.filter((e, i) => {
        return i !== index
      })
    })
  }

  render () {
    const todos = this.state.todos.map((todo, i) => {
      return (

        <div className="col-md-4" key={i}>
          <div className="card mt-4">
            <div className="card-header">
              <h3>{todo.nombre}</h3>
            </div>
            <div className="card-body pt-4">
              <p><b>Pais: {todo.pais}</b></p>
              <img src={Argentina} class="img-fluid"/>
              
              <p>Club: {todo.club}</p>
              <p>Edad: {todo.edad}</p>
              
              <div className={ todo.deporte ? 'color: red;' : 'shown' }>
              <p className="badge badge-ìll badge-danger p-2">{todo.deporte}</p>
              </div>

              
            </div>
            <div className="card-footer">
              <button
               className="btn btn-danger"
               onClick={this.removeTodo.bind(this, i)}
               >
              Delete
              </button>
            </div>
          </div>
        </div>
      )
    })
    return (
      <div className="App">
                <nav className="navbar navbar-dark bg-dark">
        <a href="#" className="text-white">
           TOTAL DE JUGADORES: <span className="badge badge-pill badge-light ml-2">
             { this.state.todos.length }
           </span>
        </a>
    </nav>

  <div className="container">
    <Formulario onAddTodo={this.handleAddTodo} />
    <div className="row mt-4 ">
      { todos }
    </div>
  </div>
    

      </div>
    );
  }
}

export default App;
