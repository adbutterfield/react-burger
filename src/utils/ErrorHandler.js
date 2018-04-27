import React, { Component, Fragment } from 'react';
import Modal from '../components/ui/Modal/Modal';

const errorHandler = (WrappedComponent, service) => {
  return class extends Component {
    state = {
      error: null,
    };

    componentWillMount() {
      this.reqInterceptor = service.interceptors.request.use((req) => {
        this.setState({
          error: null,
        });
        return req;
      });

      this.resInterceptor = service.interceptors.response.use((res) => res, (err) => {
        this.setState({
          error: err,
        });
      });
    }

    componentWillUnmount() {
      service.interceptors.request.eject(this.reqInterceptor);
      service.interceptors.response.eject(this.resInterceptor);
    }

    toggleErrorModal = () => {
      this.setState({
        error: null,
      });
    }

    render() {
      return (
        <Fragment>
          <Modal
            shouldShow={Boolean(this.state.error)}
            clickHandler={this.toggleErrorModal}
          >
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Fragment>
      );
    }
  };
};

export default errorHandler;
