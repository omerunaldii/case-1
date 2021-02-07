import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Button from '../Button';
import { Logo, Hamburger, Cross} from '../../assets';
import Modal from '../Modal';
import { LoginForm } from '../../forms';
import { ApplicationState } from '../../store';
import { withApplicationState } from '../../providers';
import { DropdownMenu } from '../DropdownMenu';
import NavItem from '../NavbarItem';
import Select from '../Select';
import { LanguageActionTypes, UserInfoActionTypes } from '../../store/actions';
import { useTranslation } from "react-i18next";
import i18next from "i18next";

interface NavbarPorps {
  state: ApplicationState;
  dispatch: ({ type }: { type: string; payload?: any; }) => void
}

const Navbar = (props: NavbarPorps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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

  const handleOnClickToMenuButton = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const [showLoginModal, setLoginModal] = useState(false);

  const handleShowLoginModal = () => {
    setLoginModal(!showLoginModal);
  }

  const getCurrunRouteName = () => {
    const location = useLocation();

    switch (location.pathname) {
      case '/contact-us':
        return 'CONTACT_US';
      default:
        return 'HOME';
    }
  }

  const renderNavbarViaUserInfo = () => {
    return !props.state.userInfo.name.length 
      ? <li><Button label={`${t('LOGIN')}`} onClick={handleShowLoginModal} /></li>
      : <NavItem label={props.state.userInfo.name}><DropdownMenu /></NavItem> 
  }

  const handleOnSelectChange = (e: string) => {
    e === 'tr' ? props.dispatch({ type: LanguageActionTypes.TR }) : props.dispatch({ type: LanguageActionTypes.EN })
    i18next.changeLanguage(e);
  }

  const handleLogout = () => {
    props.dispatch({ type: UserInfoActionTypes.LOGOUT })
  }

  return (
    <>
      <nav className="navbar__wrapper container">
        <div className="navbar__wrapper--left-side">
          <div className="logo__wrapper">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="page-title">{t(getCurrunRouteName())}</div>
        </div>
        <div className="navbar__wrapper--right-side">
          <ul className="links__wrapper">
            <li>
              <Select data={selectData} selectDefaultFromGlobal={true} onSelectionChange={handleOnSelectChange}/>
            </li>
            <li>
              <Link to="/contact-us">{t('CONTACT_US')}</Link>
            </li>
            {renderNavbarViaUserInfo()}
          </ul>
          <Button child={<Hamburger />} activeClass="hamburger" onClick={handleOnClickToMenuButton}/>
        </div>
      </nav>

      <div className={`mobile-menu__wrapper ${isMenuOpen ? 'active' : ''}`}>
        <div className="menu">
          <div className="menu__item end">
            <Button child={<Cross />} activeClass="cross" onClick={handleOnClickToMenuButton}/>
          </div>
          <div className="menu__item">
            <Select data={selectData} selectDefaultFromGlobal={true} onSelectionChange={handleOnSelectChange}/>
          </div>
          <div className="menu__item">
            <Link to="/" onClick={(e) => { setIsMenuOpen(false); }}>{t('HOME')}</Link>
          </div>
          <div className="menu__item">
            <Link to="/contact-us" onClick={(e) => { setIsMenuOpen(false); }}>{t('CONTACT_US')}</Link>
          </div>
          {
            !props.state.userInfo.name.length ? 
              <div className="menu__item">
                <Button activeClass="mobile_login-btn" label={`${t('LOGIN')}`} onClick={handleShowLoginModal} />
              </div>
            :
            <div className="menu__item column">
              <div>{props.state.userInfo.email}</div>
              <Button activeClass="mobile_logout-btn" label={`${t('LOGOUT')}`} onClick={handleLogout} />
            </div>
          }

        </div>
      </div>
      
      <Modal 
        title={`${t('LOGIN')}`}
        isOpened={showLoginModal}
        onClose={handleShowLoginModal}
        body={<LoginForm />}
      />
    </>
  )
}

export default withApplicationState(Navbar);
