import React, { useState } from 'react'
import { useTranslation } from "react-i18next";
import { withApplicationState } from '../../providers';
import { ApplicationState } from '../../store';
import { FormInput } from '../components';
import VALIDATION_STATUS from '../../enums/validationstatus';
import { Button } from '../../components';
import Select from 'react-select';

interface ContactUsFormProps {
  state: ApplicationState;
  dispatch: ({ type }: { type: string; payload?: any; }) => void
}

const ContactUsForm = (props: ContactUsFormProps) => {
  const [isNameValid, setIsNameValid] = useState(VALIDATION_STATUS.DEFAULT);
  const [isEmailValid, setIsEmailValid] = useState(VALIDATION_STATUS.DEFAULT);
  const [isPhoneValid, setIsPhoneValid] = useState(VALIDATION_STATUS.DEFAULT);

  const [data, setData] = useState({ 
    name: props.state.userInfo.name ? props.state.userInfo.name : '',
    email: props.state.userInfo.email ? props.state.userInfo.email : '',
    phone: '',
    country: '',
    text: ''
  });

  const { t } = useTranslation();

  const countryList = [
    { value: "TR", label: t('TURKEY') },
    { value: "US", label: t('USA') },
    { value: "GB", label: t('UK') },
    { value: "DE", label: t('GERMANY') },
    { value: "SE", label: t('SWEDAN') },
    { value: "KE", label: t('KENYA') },
    { value: "BR", label: t('BRAZIL') },
    { value: "ZW", label: t('ZIMBABWE') }
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
      setData({
        ...data,
        name: ''
      })
    }
    if (val.length != 0 && isValid) {
      setData({
        ...data,
        name: val
      });

      if (isEmailValid != VALIDATION_STATUS.VALID) {
        setIsNameValid(VALIDATION_STATUS.VALID);
      }
    }
    if (val.length != 0 && !isValid) {
      setData({
        ...data,
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
      setData({
        ...data,
        email: ''
      });
    }
    if (val.length != 0 && isValid) {
      setData({
        ...data,
        email: val
      });

      if (isEmailValid != VALIDATION_STATUS.VALID) {
        setIsEmailValid(VALIDATION_STATUS.VALID);
      }
    }
    if (val.length != 0 && !isValid) {
      setData({
        ...data,
        email: ''
      });

      if (isEmailValid != VALIDATION_STATUS.INVALID) {
        setIsEmailValid(VALIDATION_STATUS.INVALID);
      }
    }
  }

  const phoneValidator = (val: string) => {
    const phoneRegex = new RegExp('^0(\\d{3}[- .]?){2}\\d{4}$');
    const isValid = phoneRegex.test(val);

    if (!val.length) {
      setIsPhoneValid(VALIDATION_STATUS.DEFAULT);
      setData({
        ...data,
        phone: ''
      });
    }
    if (val.length != 0 && isValid) {
      const phoneNumber = val.replaceAll(' ', '');

      setData({
        ...data,
        phone: phoneNumber
      });

      if (isPhoneValid != VALIDATION_STATUS.VALID) {
        setIsPhoneValid(VALIDATION_STATUS.VALID);
      }
    }
    if (val.length != 0 && !isValid) {
      setData({
        ...data,
        phone: ''
      });

      if (isPhoneValid != VALIDATION_STATUS.INVALID) {
        setIsPhoneValid(VALIDATION_STATUS.INVALID);
      }
    }
  }

  const handleOnSelectChange = (e: string) => {
    setData({ ...data, country: e });
  }

  const handleLoginSubmit = () => {
    let hasError = false;
    
    if (!emptyValidation(data.name)) {
      setIsNameValid(VALIDATION_STATUS.INVALID);
      hasError = true;
    }
    if (!emptyValidation(data.email)) {
      setIsEmailValid(VALIDATION_STATUS.INVALID);
      hasError = true;
    }
    if (!emptyValidation(data.phone)) {
      setIsPhoneValid(VALIDATION_STATUS.INVALID);
      hasError = true;
    }

    if (!hasError) {
      console.log('data: ', data);
    }
  }
  
  return (
    <form className="contactus_form" onSubmit={e => {
      e.preventDefault();
      e.stopPropagation();
    }}>
      <FormInput defaultValue={props.state.userInfo.name} name="username" label={`${t('FULL_NAME')}`} type="text" status={isNameValid} validator={nameValidator} error={`${t('FULL_NAME_ERROR_1')}`}/>
      <FormInput defaultValue={props.state.userInfo.email} name="email" label={`${t('EMAIL')}`} type="text" status={isEmailValid} validator={emailValidator} error={`${t('EMAIL_ERROR_1')}`}/>
      <FormInput name="phone" type="tel" label={`${t('PHONE')}`} placeholder="05XX XXX XXXX" status={isPhoneValid} validator={phoneValidator} error={`${t('PHONE_ERROR_1')}`}/>
      <div className="form-item__wrapper">
        <div className="label">{t('COUNTRY')}</div>
        <Select className="custom__select" placeholder={`${t('SELECT')}`} options={countryList} onChange={e => { handleOnSelectChange(e ? e.value : '') }} />
      </div>
      <div className="form-item__wrapper">
        <div className="label">{t('MESSAGE')}</div>
        <textarea value={data.text} onChange={(e) => { setData({ ...data, text: e.target.value }) }}></textarea>
      </div>
      <Button label={`${t('SEND')}`} activeClass="login--btn ml-auto" onClick={handleLoginSubmit} />
    </form>
  )
}

export default withApplicationState(ContactUsForm);
