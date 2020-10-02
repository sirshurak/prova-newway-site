import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux'
import { ApplicationState } from '../../../store'
import * as props from '../../interfaces/props';
import * as PayloadActions from '../../../store/ducks/payload/actions';
import Routes from '../../../routes';

type Props = props.StateProps & props.OwnProps & props.DispatchProps

class ContentComponent extends Component<Props> {
    componentDidMount(){}
    render() {        
        return <div id="content"><Routes/></div>
    }
}

const mapStateProps = (state: ApplicationState) => ({   
});

const mapDispatchProps = (dispatch: Dispatch) => bindActionCreators(PayloadActions, dispatch)

export default connect(mapStateProps, mapDispatchProps)(ContentComponent);