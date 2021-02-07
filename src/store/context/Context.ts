import { ApplicationState } from "../interfaces";

interface IStateContext {
  state: ApplicationState;
  dispatch: ({type}:{type:string}) => void;
}

export default IStateContext;