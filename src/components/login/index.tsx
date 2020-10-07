import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Form, Button, FormFeedback } from 'reactstrap'
import * as myprops from '../interfaces/auth';
import * as actions from '../../store/modules/auth/actions';
import { AuthState } from "../../store/modules/auth/types";
import {KeyValuePair} from '../../store/modules/payload/types';
import { INITIAL_USER } from "../../store/modules/auth";
import FormControl from '../commons/FormControl';
import { bindActionCreators, Dispatch } from 'redux';
import history from '../../store/history';
import {CheckAuth, CheckAuthSync} from '../../contexts/auth';
import config from '../../config';
import { callbackLogin } from '../../pages/layout/header/callback';

type Props = myprops.AuthProps & myprops.AuthDispatchProps
type State = AuthState

/**
 * Componente de Login.
 * 
 * @param {boolean} isLogged indica se usuário está logado
 * @param {User} user dados do usuário
 */
class LoginComponent extends Component<any,AuthState> {
    constructor(props:any){
        super(props);
        
        const data = CheckAuthSync();
        this.state = {
            ...props,
            user: data.user ?? INITIAL_USER,
            isLogged: data.user?.id !== undefined,
            userToken: data.token
        }
    }

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
            .then(data => {
                if (this.props.errors?.message === undefined) {                
                    const isLogged = data.user?.id !== undefined;
                    const user = data.user !== undefined && isLogged ? data.user : this.state.user;
                    
                    this.setState({
                        isLogged,
                        userToken: data.token ?? "",
                        user: {
                            ...user,
                            password: ""
                        }
                    });
                    if (this.props.useCallback !== undefined) {
                        this.props.useCallback(isLogged, data.token, user)
                    }                    
                    if (this.props.redirectTo)
                        history.push(this.props.redirectTo);
                }
            }
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
            this.CheckAuthAsync(500);
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
            this.CheckNewRandomUserAsync(500);
        }
    }

    render() {        
        const { isLogged } = this.state;
        callbackLogin(!isLogged ? "Login" : `Bem vindo, ${this.state.user.name}`);
        if (!isLogged)
            return (
                <div id="login-form">
                    <Form onSubmit={this.handleLoginSubmit} className={"login-form-send"}>
                        <FormControl
                            label="Email"
                            type="email"
                            value={this.state.user.email}
                            handleChange={this.handleChange}
                            placeholder="Email"
                        />

                        <FormControl
                            label="Password"
                            type="password"
                            value={this.state.user.password}
                            handleChange={this.handleChange}
                            placeholder="senha"
                        />
                        {
                            Object.keys(this.props.errors??"").length > 0 
                            ? Object.keys(this.props.errors).map(key => 
                                this.props.errors[key] !== ""
                                ?   <div key={key}>
                                        <br/>
                                        <FormFeedback>{this.props.errors[key]}</FormFeedback>
                                    </div>
                                : <></>
                                ) 
                            : <></>
                        }
                        {
                            Object.keys(this.state.errors??"").length > 0 
                            ? Object.keys(this.state.errors??"").map(key => {
                                const keyValue = (this.state.errors??new KeyValuePair());
                                if (keyValue[key] !== "")                                    
                                    return (
                                        <div key={key}>
                                            <br/>
                                            <FormFeedback>{keyValue[key]}</FormFeedback>
                                        </div>
                                    )
                                return <></>
                                }) 
                            : <></>
                        }
                        <Button color="primary">Login</Button>
                        <Button color="secondary" onClick={this.handleNewRandomUserClick}>Novo usuário aleatório</Button>
                    </Form>
                    {this.props.children}
                </div>
            )
        else
            return (
                <div id={`user-${this.state.user.id}`} className="info-usuario">
                    <p>Olá <b>{this.state.user.name}</b>, você está logado.</p>
                    <span>Email: <b>{this.state.user.email}</b></span>
                    <span>Última visita em: <b>{new Date(this.state.user.lastVisit??"").toLocaleString()}</b></span>
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