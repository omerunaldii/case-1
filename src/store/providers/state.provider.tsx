import * as React from 'react';
import GlobalStore from '../global';
import { ApplicationState } from '../interfaces';
import { RootReducer }  from '../reducers';
import { InitialState } from '../state';

interface StateProviderProps {
  children: any;
}

const asyncer = (dispatch: any, state: ApplicationState) => (action: any) =>
  typeof action === 'function' ? action(dispatch, state) : dispatch(action);

function StateProvider(props: StateProviderProps) {
  const [state, dispatchBase] = React.useReducer(RootReducer, InitialState);

  const dispatch = React.useCallback(asyncer(dispatchBase, state), [])

  return (
    <GlobalStore.Provider value={{ state, dispatch }}>
      { props.children }
    </GlobalStore.Provider>
  )
}

export default StateProvider;
