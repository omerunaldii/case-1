import { userInfo } from "os";

import User from './user.interface';

interface ApplicationState {
  userInfo: User,
  language: string
}

export default ApplicationState;
