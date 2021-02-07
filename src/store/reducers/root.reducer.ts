import { ApplicationState, StateAction } from '../interfaces';

import UserInfoReducer from './userInfo.reducer';
import LanguageReducer from './language.reducer';

function RootReducer(state: ApplicationState, action: StateAction): ApplicationState {
  const { userInfo, language } = state;

  return {
    userInfo: UserInfoReducer(userInfo, action),
    language: LanguageReducer(language, action),
  }
}


export default RootReducer;