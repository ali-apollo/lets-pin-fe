import React, { Component } from 'react';
import Loadable from 'react-loadable'
import Loading from '../common/Loading/index'

const LoadableComponent = Loadable({
  loader: () => import('./signuppage'),
  loading: Loading
})

class SignuppageLoadable extends Component {
  render() {
    return <LoadableComponent />
  }
}

export default SignuppageLoadable
