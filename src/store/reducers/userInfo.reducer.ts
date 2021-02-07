import { UserInfoActionTypes } from '../actions';
import { StateAction, User } from '../interfaces';


function UserInfoReducer(state: any, action: StateAction): User {
  switch (action.type) {
    case UserInfoActionTypes.LOGIN: {
      return {
       name: action.payload.name,
       email: action.payload.email
      };
    }
    case UserInfoActionTypes.LOGOUT: {
      return {
        name: '',
        email: ''
      };
    }
    default:
      return state;
  }
}

export default UserInfoReducer;
