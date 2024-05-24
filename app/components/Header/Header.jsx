'use client';

import Styles from './Header.module.css'
import { Overlay } from '../Overlay/Overlay';
import { AuthForm } from '../Forms/AuthForm';
import { RegisterForm } from '../Forms/RegisterForm'
import { Popup } from '../Popup/Popup';
import Link from "next/link"
import { usePathname } from 'next/navigation';

import { useStore } from '@/app/store/app-store';


export const Header = () => {

  const store = useStore();

  const pathname = usePathname();

  const handleLogout = () => {
    store.logout();
  }

  const openAuthForm = () => {
    store.openPopup('auth');
  };

  const openRegisterForm = () => {
    store.openPopup('register')
  }


  return (
    <header className={Styles.header}>
      {
        pathname === "/" ?
          <div className={Styles.logo}>
            <img
              className={Styles.logo__image}
              src="../images/logo.svg"
              alt="Логотип Pindie"
            />
          </div> :
          <Link href="/" className={Styles.logo}>
            <img
              className={Styles.logo__image}
              src="../images/logo.svg"
              alt="Логотип Pindie"
            />
          </Link>
      }
      <nav className={Styles.menu}>
        <ul className={Styles.menu__list}>
          <li className={Styles.menu__item}>
            <Link href="/new"
              className={`${Styles.menu__link} ${pathname === "/new" ? Styles.menu__link_active : ""
                }`}>
              Новинки
            </Link>
          </li>
          <li className={Styles.menu__item}>
            <Link href="/popular"
              className={`${Styles.menu__link} ${pathname === "/popular" ? Styles.menu__link_active : ""
                }`}>
              Популярные
            </Link>
          </li>
          <li className={Styles.menu__item}>
            <Link href="/shooters"
              className={`${Styles.menu__link} ${pathname === "/shooters" ? Styles.menu__link_active : ""
                }`}>
              Шутеры
            </Link>
          </li>
          <li className={Styles.menu__item}>
            <Link href="/runners"
              className={`${Styles.menu__link} ${pathname === "/runners" ? Styles.menu__link_active : ""
                }`}>
              Ранеры
            </Link>
          </li>
          <li className={Styles.menu__item}>
            <Link href="/pixel-games"
              className={`${Styles.menu__link} ${pathname === "/pixel-games" ? Styles.menu__link_active : ""
                }`}>
              Пиксельные
            </Link>
          </li>
          <li className={Styles.menu__item}>
            <Link href="/tds"
              className={`${Styles.menu__link} ${pathname === "/tds" ? Styles.menu__link_active : ""
                }`}>
              TDS
            </Link>
          </li>
        </ul>
        <div className={Styles.auth}>
          {store.isAuth ? (
            <>
              <Link href="/profile" className={Styles.auth__button}>
                Профиль
              </Link>
              <Link href="/" className={Styles.auth__button} onClick={handleLogout}>
                Выйти
              </Link>
            </>
          ) : (
            <>
              <button className={Styles.auth__button} onClick={openAuthForm}>
                Войти
              </button>
              <button className={Styles.register__button} onClick={openRegisterForm}>
                Зарегистрироваться
              </button>
            </>
          )}
        </div>
      </nav>
      <Overlay isOpened={store.popupIsOpened} closePopup={store.closePopup} />
      <Popup isOpened={store.popupIsOpened} closePopup={store.closePopup}>
        {store.typeForm === "auth" ?
          <AuthForm /> : <RegisterForm />
        }
      </Popup>
    </header>
  )
}
