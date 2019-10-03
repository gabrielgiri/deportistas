import React, { Component } from 'react';

class Formulario extends Component {
    constructor() {
        super();
        this.state = {
            nombre: '',
            pais: '',
            edad:'',
            club:'',
            deporte:''
        };
        this.handleInput=this.handleInput.bind(this);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleInput (e) {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        })
    }

    handleSubmit (e) {
        e.preventDefault();
        this.props.onAddTodo(this.state);
    }

    render () {
        return (
            
            <div className="card">
                <form className="card-body" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                    
                        <input
                        type="text"
                        name="nombre"
                        className="form-control"
                        onChange={this.handleInput}
                        placeholder="Nombre del Jugador" />
                    </div>

                    <div className="form-group">
                        <input
                        type="text"
                        name="pais"
                        className="form-control"
                        onChange={this.handleInput}
                        placeholder="Pais del Jugador" />
                    </div>

                    <div className="form-group">
                        <input
                        type="text"
                        name="club"
                        className="form-control"
                        onChange={this.handleInput}
                        placeholder="Club del Jugador" />
                    </div>

                    <div className="form-group">
                        <input
                        type="text"
                        name="edad"
                        className="form-control"
                        onChange={this.handleInput}
                        placeholder="Edad" />
                    </div>

                    <div className="form-group">
                        <select
                        type="text"
                        name="deporte"
                        className="form-control"
                        onChange={this.handleInput}
                        placeholder="Deporte">
                            <option>Futbol</option>
                            <option>Tenis</option>
                            <option>Basket</option>
                            <option>Automivilismo</option>
                            <option>Atletismo</option>
                            <option>Boxeo</option>
                            </select>
                    
                    </div>
                    <input type="submit" value="Submit" class="btn btn-primary"/>
                </form>
            </div>
        )
    }
}

export default Formulario;