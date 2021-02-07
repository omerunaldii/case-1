import React from "react";
import { UserInfoActionTypes } from "../../store/actions";
import { withApplicationState } from "../../providers";
import { ApplicationState } from "../../store";
import Button from "../Button";
import { useTranslation } from "react-i18next";

interface DropdownMenuProps {
  state: ApplicationState;
  dispatch: ({ type }: { type: string; payload?: any; }) => void;
}

const DropdownMenu = (props: DropdownMenuProps) => {
  const { t } = useTranslation();

  const handleLogout = () => {
    props.dispatch({ type: UserInfoActionTypes.LOGOUT })
  }

  return (
    <div className="dropdown">
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="dropdown-email">{props.state.userInfo.email}</div>
        <Button activeClass="logout--btn" label={`${t('LOGOUT')}`} onClick={handleLogout}/>
      </div>
    </div>
  );
}

export default withApplicationState(DropdownMenu);
