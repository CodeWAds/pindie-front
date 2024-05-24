'use client';

import Styles from "./Profile.module.css";
import { Voted } from "../components/Voted/Voted";

import { Preloader } from "@/app/components/Preloader/Preloader";
import { useStore } from "@/app/store/app-store";

export default function ProfilePage(props) {

    const store = useStore();

    return (
        store.isAuth ?
        <div className={Styles.about__user}>
            {store.user ?
            <>
            <h2 className={Styles["list-section__title"]}>Профиль</h2>
            <div className={Styles.info__user}>
            Имя: {store.user.username}<br/>
            Email: {store.user.email}<br/>
            id: {store.user.id}
            </div>
            <Voted />
            </> : <Preloader/>}
        </div> : <h2 className={Styles.blocked__page}>Эта страница только для авторизованных пользователей</h2>
    );
};