import React from 'react';
import { useTranslation } from "react-i18next";

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="content__wrapper home-page">
      <div className="title">{t('HOME')}</div>
      <div className="content">{t('LOREM')}</div>
    </div>
  )
}

export default Home;
