import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Row, Col, Button, FormFeedback } from 'reactstrap'

import * as myprops from '../interfaces/auth';
import * as actions from '../../store/modules/auth/actions';
import { AuthState } from "../../store/modules/auth/types";
import { INITIAL_STATE, INITIAL_USER } from "../../store/modules/auth";
import FormControl from '../commons/FormControl';
import { bindActionCreators, Dispatch } from 'redux';
import history from '../../store/history';
import {CheckAuth} from '../../contexts/auth';
import config from '../../config';

type Props = myprops.AuthProps & myprops.AuthDispatchProps
type State = AuthState

class LoginComponent extends Component<any,AuthState> {

    state = INITIAL_STATE;

    componentDidMount(){
    }

    validate = () => {
        const { user } = this.state;
        const errors: {[key: string]: string} = {};

        if (user.email === '') errors.email = 'Email não pode ser vazio.'
        if (user.password === '') errors.password = 'Senha não pode ser vazio.'

        return errors
    }

    async CheckAuthAsync(wait: number) {
        new Promise(resolve => 
            setTimeout(resolve, wait) //vamos aguardar o prop change para chamar o callback
        )
        .then(()=> 
            CheckAuth()
            .then(data => 
                this.props.errors?.message === undefined 
                ?
                    this.props.useCallback !== undefined
                    ? this.props.useCallback(!(data.user?.id === null), data)
                    : history.push(this.props.redirectTo ?? '/')
                : this.setState({
                    errors: this.props.errors
                })
            )
        ); 
    }

    async CheckNewRandomUserAsync(wait: number) {
        new Promise(resolve => 
            setTimeout(resolve, wait)
        )
        .then(()=> {
            if (this.props.errors?.message === undefined)
            {
                this.setState({
                    ...this.state,
                    user: {
                        ...this.props.newUser,
                        password: config.PASSWORD_FACTORY
                    }
                });
                this.handleLoginSubmit(null);
            }
        }); 
    }

    handleLoginSubmit = (e: any) => {
        e?.preventDefault()
        const { user } = this.state
        const errors = this.validate()

        if (Object.keys(errors).length === 0) {
            this.props.login(user.email ?? "", user.password ?? "");
            
            if (this.props.errors?.message === undefined)
            {
                this.CheckAuthAsync(500);
            }  
            else
                this.setState({
                    errors: this.props.errors
                });
        } else {
            this.setState({
                errors
            })
        }
    }

    handleChange = (e: any) => {
        this.setState({
            user: {
                ...this.state.user,
                [e.target.id]: e.target.value
            },
            errors: {
                ...this.state.errors,
                [e.target.id]: ''
            }
        })
    }

    handleLogoutClick = (e: any) => {
        this.props.logout();
        this.CheckAuthAsync(500);            
    };

    handleNewRandomUserClick = (e: any) => {
        if (!this.props.isLogged) {
            this.props.createNewRandomUser();
            if (this.props.errors?.message === undefined)
                this.CheckNewRandomUserAsync(500);
        }
    }

    render() {
        const { isLogged } = this.props;
        if (!isLogged)
            return (
                <div id="login-form">
                    <Form onSubmit={this.handleLoginSubmit} className={"login-form-send"}>
                        <FormControl
                            label="Email"
                            type="email"
                            value={this.state.user.email}
                            handleChange={this.handleChange}
                            error={this.state.errors?.username}
                            placeholder="Email"
                        />

                        <FormControl
                            label="Password"
                            type="password"
                            value={this.state.user.password}
                            handleChange={this.handleChange}
                            error={this.state.errors?.password}
                            placeholder="senha"
                        />
                        <><br/><FormFeedback>{this.props.errors?.message}</FormFeedback></>
                        <Button color="primary">Login</Button>
                        <Button color="secondary" onClick={this.handleNewRandomUserClick}>Novo usuário aleatório</Button>
                    </Form>
                    {this.props.children}
                </div>
            )
        else
            return (
                <div id={`user-${this.props.user.id}`} className="info-usuario">
                    <p>Olá <b>{this.props.user.name}</b>, você já está logado.</p>
                    <span>Última visita em: <b>{new Date(this.props.user.lastVisit).toLocaleString()}</b></span>
                    <Button onClick={this.handleLogoutClick} color="primary">Sair</Button> 
                </div>
            )
    }
}

const mapStateProps = (state: any) => ({ 
    newUser: state.auth.user,
    errors: state.auth.errors,
    loading: state.auth.loading
});

const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(mapStateProps, mapDispatchProps)(LoginComponent)