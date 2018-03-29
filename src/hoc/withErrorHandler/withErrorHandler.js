import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Auxiliary/Auxiliary';

const withErrorHandler = (WrapperdComponent, axios) => {
  return class extends Component  {
    state = {
      error: null
    }

    // use componentWillMount instead on cdm 
    // because this will be used
    // before the childs are render
    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use(req => {
        // clean any error that we have
        this.setState({error: null});
        return req;
      });

      axios.interceptors.response.use(res => res, error => {
        this.resInterceptor = this.setState({error: error});
      });
    }

    componentWillUnmount() {
      // console.log('Will unmount', this.reqInterceptor, this.resInterceptor);
      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }
    
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    }

    render() {
      return (
        <Aux>
          <Modal 
          show={this.state.error}
          modalClosed={this.errorConfirmedHandler}>
            {this.state.error ? this.state.error.message : null}

          </Modal>
          <WrapperdComponent {...this.props} />
        </Aux>
      )
    }
  } 
}

export default withErrorHandler;