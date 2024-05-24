'use client';
import Styles from './Footer.module.css';
import Link from "next/link";
import { usePathname } from 'next/navigation';

export const Footer = () => {

  const pathName = usePathname();

  return (
    <footer className={Styles.footer}>
      {pathName === "/" ?
        <div className={Styles.footer__logo}>
          <span className={Styles["footer__logo-name"]}>pindie</span>
          <span className={Styles["footer__logo-copy"]}>, XXI век</span>
        </div> :
        <Link href="/" className={Styles.footer__logo}>
          <span className={Styles["footer__logo-name"]}>pindie</span>
          <span className={Styles["footer__logo-copy"]}>, XXI век</span>
        </Link>
      }
      <ul className={Styles["social-list"]}>
        <li className={Styles["social-list__item"]}>
          <a href="https://youtube.com" className={`button ${Styles["social-list__link"]}`}>YT</a>
        </li>
        <li className={Styles.social_list__item}>
          <a href="https://vk.com" className={`button ${Styles["social-list__link"]}`}>ВК</a>
        </li>
        <li className={Styles.social_list__item}>
          <a href="https://t.me" className={`button ${Styles["social-list__link"]}`}>TG</a>
        </li>
      </ul>
    </footer>
  )
}