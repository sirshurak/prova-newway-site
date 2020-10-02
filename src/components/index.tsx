import React, { Component } from 'react';
import { connect, useSelector } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux'
import { ApplicationState } from '../store'
import * as props from './interfaces/props/';
import * as actions from '../store/ducks/payload/actions';
import Content from './layout/content';
import Header from './layout/header';
import Footer from './layout/footer';

type Props = props.StateProps & props.OwnProps & props.DispatchProps

class AppComponent extends Component<Props> {
    componentDidMount(){
          
    }
    render() {        
        return <><Header/><Content/><Footer/></>

        //return <><ul>{payloads.map(repository => <li key={repository.id}>{repository.name}</li>)}</ul><button onClick={this.props.loadRequest}>Call API</button></>;
    }

    AppName: string = "";
}

const mapStateProps = (state: ApplicationState) => ({ 
});

const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch)

export default connect(mapStateProps, mapDispatchProps)(AppComponent);