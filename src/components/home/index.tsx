import React, { Component } from 'react';
import { connect, useSelector, useDispatch } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux'
import { ApplicationState } from '../../store'
import * as props from '../interfaces/props';
import * as PayloadActions from '../../store/ducks/payload/actions';

type Props = props.StateProps & props.DispatchProps & props.OwnProps

class HomeComponent extends Component<Props> {
    componentDidMount(){
    }
    render() {         
        return <div id="home"><p>Home</p></div>
    }
}

const mapStateProps = (state: ApplicationState) => ({
});

const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators(PayloadActions, dispatch)

export default connect(mapStateProps, mapDispatchProps)(HomeComponent);