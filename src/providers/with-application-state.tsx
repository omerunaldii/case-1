import React from 'react';
import { GlobalStore } from '../store';

function withApplicationState(Component: any) {
  return function WrapperComponent(props: any) {
    return (
      <GlobalStore.Consumer>
        {context => <Component {...props} state={context.state} dispatch={context.dispatch} />}
      </GlobalStore.Consumer>
    );
  }
}

export default withApplicationState;
