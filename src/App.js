import React, { Component } from 'react';
import './App.css';
import data from './data.json';

import Formulario from './components/Formulario';
import Argentina from './images/png/001-argentina.png';

// Utilidades para bandera dinámica según país
const slugify = (s) =>
  (s || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // quita acentos
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

// Alias frecuentes (ES -> EN) para mapear al nombre de archivo
const COUNTRY_ALIASES = {
  'estados-unidos': 'united states of america',
  'eeuu': 'united states of america',
  'reino-unido': 'united kingdom',
  'inglaterra': 'england',
  'paises-bajos': 'netherlands',
  'paisos-bajos': 'netherlands',
  'corea-del-sur': 'south korea',
  'rusia': 'russia',
  'alemania': 'germany',
  'francia': 'france',
  'españa': 'spain',
  'brasil': 'brazil',
  'suiza': 'switzerland',
  'suecia': 'sweden',
  'ucrania': 'ukraine',
  'japon': 'japan',
  'hong-kong': 'hong kong',
  'costa-rica': 'costa rica',
  'nueva-zelanda': 'new zealand'
};

// Carga perezosa de imágenes disponibles en ./images/png (Webpack)
const flagsCtx = require.context('./images/png', true, /\.(png|jpe?g|svg)$/);

const getFlagSrc = (country) => {
  const slug = slugify(country);
  const alias = COUNTRY_ALIASES[slug];

  // Genera variantes para coincidir con archivos que usan espacios en lugar de guiones
  const asSpaces = (s) => (s || '').replace(/-/g, ' ');

  const candidates = [
    slug,
    asSpaces(slug),
    alias ? slugify(alias) : null,
    alias ? asSpaces(alias) : null
  ].filter(Boolean);

  try {
    const key = flagsCtx.keys().find((k) =>
      candidates.some((c) => k.toLowerCase().includes(c))
    );
    if (key) return flagsCtx(key);
  } catch (e) {
    // noop: si no existe, caemos al fallback
  }
  return Argentina; // Fallback
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      // "data.json" exporta por defecto un objeto; tomamos su arreglo "todos"
      todos: data.todos
    };
  }

  handleAddTodo = (todo) => {
    this.setState(prev => ({
      todos: [...prev.todos, todo]
    }));
  }

  removeTodo = (index) => {
    this.setState(prev => ({
      todos: prev.todos.filter((_, i) => i !== index)
    }));
  }

  render () {
    const cards = this.state.todos.map((todo, i) => (
      <div className="col-md-4" key={i}>
        <div className="card mt-4">
          <div className="card-header">
            <h3>{todo.nombre}</h3>
          </div>
          <div className="card-body pt-4">
            <p><b>País: {todo.pais}</b></p>
            <img src={getFlagSrc(todo.pais)} className="img-fluid" alt={`Bandera de ${todo.pais}`} />

            <p>Club: {todo.club}</p>
            <p>Edad: {todo.edad}</p>

            {todo.deporte && (
              <p className="badge badge-pill badge-danger p-2">{todo.deporte}</p>
            )}
          </div>
          <div className="card-footer">
            <button
              className="btn btn-danger"
              onClick={() => this.removeTodo(i)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    ));

    return (
      <div className="App">
        <nav className="navbar navbar-dark bg-dark">
          <span className="text-white">
            TOTAL DE JUGADORES: <span className="badge badge-pill badge-light ml-2">
              { this.state.todos.length }
            </span>
          </span>
        </nav>

        <div className="container">
          <Formulario onAddTodo={this.handleAddTodo} />
          <div className="row mt-4 ">
            { cards }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
