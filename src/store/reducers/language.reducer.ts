import { LanguageActionTypes } from '../actions';
import { StateAction } from '../interfaces';

function LanguageReducer(state: any, action: StateAction): string {
  switch (action.type) {
    case LanguageActionTypes.EN: {
      return 'en';
    }
    case LanguageActionTypes.TR: {
      return 'tr';
    }
    default:
      return state;
  }
}

export default LanguageReducer;