import React from 'react';
import { useTranslation } from "react-i18next";
import { ContactUsForm } from '../../forms';

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <div className="content__wrapper contactus_page">
      <div className="title">{t('CONTACT_US')}</div>
      <div className="contactus_page-form__wrapper">
        <ContactUsForm />
      </div>
    </div>
  )
}

export default ContactUs;
