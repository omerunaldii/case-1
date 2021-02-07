import React, { useState } from 'react';
import { Button, Select } from '../../components';
import { FormInput } from '../components';
import VALIDATION_STATUS from '../../enums/validationstatus';
import { ApplicationState } from '../../store';
import { withApplicationState } from '../../providers';
import { LanguageActionTypes, UserInfoActionTypes } from '../../store/actions';
import i18next from "i18next";
import { useTranslation } from "react-i18next";

interface LoginFormProps {
  state: ApplicationState;
  dispatch: ({ type }: { type: string; payload?: any; }) => void
}

const LoginForm = (props: LoginFormProps) => {

  const [isNameValid, setIsNameValid] = useState(VALIDATION_STATUS.DEFAULT);
  const [isEmailValid, setIsEmailValid] = useState(VALIDATION_STATUS.DEFAULT);
  const [isPasswordValid, setIsPasswordValid] = useState(VALIDATION_STATUS.DEFAULT);

  const [user, setUser] = useState({name: '', email: '', password: ''});

  const { t } = useTranslation();

  const selectData = [
    {
      value: 'en',
      label: t('ENGLISH')
    },
    {
      value: 'tr',
      label: t('TURKISH')
    }
  ]

  const emptyValidation = (value: string) => {
    const emptyRegex = new RegExp('[^\\s]*');

    return !value.length ? false : emptyRegex.test(value);
  }

  const nameValidator = (val: string) => {
    const userRegex = new RegExp('^[A-Za-zğüşöçıİĞÜŞÖÇ]+([\ A-Za-zğüşöçıİĞÜŞÖÇ]+){3,24}$')
    const isValid = userRegex.test(val);

    if (!val.length) {
      setIsNameValid(VALIDATION_STATUS.DEFAULT);
      setUser({
        ...user,
        name: ''
      })
    }
    if (val.length != 0 && isValid) {
      setUser({
        ...user,
        name: val
      });

      if (isEmailValid != VALIDATION_STATUS.VALID) {
        setIsNameValid(VALIDATION_STATUS.VALID);
      }
    }
    if (val.length != 0 && !isValid) {
      setUser({
        ...user,
        name: ''
      });

      if (isEmailValid != VALIDATION_STATUS.INVALID) {
        setIsNameValid(VALIDATION_STATUS.INVALID);
      }
    }
  }

  const emailValidator = (val: string) => {
    const emailRegex = new RegExp('[a-zA-Z0-9_\\.\\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\\.]+');
    const isValid = emailRegex.test(val);

    if (!val.length) {
      setIsEmailValid(VALIDATION_STATUS.DEFAULT);
      setUser({
        ...user,
        email: ''
      });
    }
    if (val.length != 0 && isValid) {
      setUser({
        ...user,
        email: val
      });

      if (isEmailValid != VALIDATION_STATUS.VALID) {
        setIsEmailValid(VALIDATION_STATUS.VALID);
      }
    }
    if (val.length != 0 && !isValid) {
      setUser({
        ...user,
        email: ''
      });

      if (isEmailValid != VALIDATION_STATUS.INVALID) {
        setIsEmailValid(VALIDATION_STATUS.INVALID);
      }
    }
  }

  const passwordValidator = (val: string) => {
    setUser({
      ...user,
      password: val
    });
  }

  const handleLoginSubmit = () => {
    let hasError = false;
    
    if (!emptyValidation(user.name)) {
      setIsNameValid(VALIDATION_STATUS.INVALID);
      hasError = true;
    }
    if (!emptyValidation(user.email)) {
      setIsEmailValid(VALIDATION_STATUS.INVALID);
      hasError = true;
    }
    if (!emptyValidation(user.password)) {
      setIsPasswordValid(VALIDATION_STATUS.INVALID);
      hasError = true;
    }
    else {
      setIsPasswordValid(VALIDATION_STATUS.VALID);
    }

    if (!hasError) {
      props.dispatch({ type: UserInfoActionTypes.LOGIN, payload: { name: user.name, email: user.email } })
    }
  }

  const handleOnSelectChange = (e: string) => {
    e === 'tr' ? props.dispatch({ type: LanguageActionTypes.TR }) : props.dispatch({ type: LanguageActionTypes.EN })
    i18next.changeLanguage(e);
  }

  return (
    <form onSubmit={e => {
      e.preventDefault();
      e.stopPropagation();
    }}>
      <FormInput name="username" label={`${t('FULL_NAME')}`} type="text" status={isNameValid} validator={nameValidator} error={`${t('FULL_NAME_ERROR_1')}`}/>
      <FormInput name="email" label={`${t('EMAIL')}`} type="text" status={isEmailValid} validator={emailValidator} error={`${t('EMAIL_ERROR_1')}`}/>
      <FormInput name="password" label={`${t('PASSWORD')}`} type="password" status={isPasswordValid} validator={passwordValidator} error={`${t('PASSWORD_ERROR_1')}`}/>
      <div className="cta__wrapper">
        <Select data={selectData} selectDefaultFromGlobal={true} onSelectionChange={handleOnSelectChange}/>
        <Button label={`${t('LOGIN')}`} activeClass="login--btn ml-auto" onClick={handleLoginSubmit} />
      </div>
    </form>
  )
}

export default withApplicationState(LoginForm);
