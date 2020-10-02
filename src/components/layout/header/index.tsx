import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux'
import { ApplicationState } from '../../../store'
import * as props from '../../interfaces/props';
import * as PayloadActions from '../../../store/ducks/payload/actions';

type Props = props.StateProps & props.OwnProps & props.DispatchProps

class HeaderComponent extends Component<Props> {
    componentDidMount(){}
    render() {        
        return <header></header>
    }
}

const mapStateProps = (state: ApplicationState) => ({
});

const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators(PayloadActions, dispatch)

export default connect(mapStateProps, mapDispatchProps)(HeaderComponent);