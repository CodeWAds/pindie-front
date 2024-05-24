'use client';
import Styles from './Forms.module.css';
import { useState, useEffect } from 'react';
import { authentication, isResponseOk } from '@/app/api/api-utils';
import { endpoints } from '@/app/api/config';

import { useStore } from '@/app/store/app-store';

export const RegisterForm = () => {
  const store = useStore();

  const [registerData, setRegisterData] = useState({ username: "", email: "", password: "" });

  const [message, setMessage] = useState({ status: null, text: null });
  const handleInput = (e) => {
    setRegisterData({ ...registerData, [e.target.name]: e.target.value });
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await authentication(endpoints.register, registerData, store.typeForm);
    if (isResponseOk(userData)) {

      store.login({...userData, id: userData._id}, userData.jwt);

      setMessage({ status: "success", text: "Вы зарегистрировались!" });
    } else {
      setMessage({ status: "error", text: "Ошибка при регистрации" });
    }
  };
  useEffect(() => {
    let timer;
    if (store.user) {
      timer = setTimeout(() => {
        store.closePopup();
        setMessage({ status: null, text: null });
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [store.user]);
  return (
    <form onSubmit={handleSubmit} className={Styles.form}>
      <h2 className={Styles.form__title}>Регистрация</h2>
      <div className={Styles.form__fields}>
        <label className={Styles.form__field}>
          <span className={Styles["form__field-title"]}>Ваш ник</span>
          <input className={Styles["form__field-input"]} onInput={handleInput} name="username" type="text" placeholder="Иван" />
        </label>
        <label className={Styles.form__field}>
          <span className={Styles["form__field-title"]}>Email</span>
          <input className={Styles["form__field-input"]} onInput={handleInput} name="email" type="email" placeholder="hello@world.com" />
        </label>
        <label className={Styles.form__field}>
          <span className={Styles["form__field-title"]}>Пароль</span>
          <input className={Styles["form__field-input"]} onInput={handleInput} name="password" type="password" placeholder='***********' />
        </label>
      </div>
      {message.status && (
        <p className={Styles.form__message}>{message.text}</p>
      )}
      <div className={Styles.form__actions}>
        <button className={Styles.form__reset} type="reset">Очистить</button>
        <button className={Styles.form__submit} type="submit">Зарегистрироваться</button>
      </div>
    </form>
  )
};
