'use client';
import { getVotedGames } from "@/app/api/api-utils";
import { useStore } from "@/app/store/app-store";
import { endpoints } from "@/app/api/config";
import { useState, useEffect } from "react";
import { Preloader } from "../Preloader/Preloader";
import Styles from "./Voted.module.css";
import Link from "next/link";
import { Card } from "../Card/Card";

export const Voted = () => {

    const store = useStore();
    const [votedGames, setVotedGames] = useState(null);

    useEffect(() => {
        const fetchVotedGames = async () => {
            if (store.user) {
                const votedGames = await getVotedGames(endpoints.games, store.user.id);
                setVotedGames(votedGames);
            }
        };

        fetchVotedGames();
    }, [store.user]);


    return (
        <section className="voted__section">
            <h2 className={Styles["list-section__title"]}>Вы проголосовали за:</h2>
            {votedGames ?
                <ul className={Styles["cards-list"]}>
                    {votedGames.map((game) => {
                        return (<li className={Styles["cards-list__game"]} key={game.id}>
                            <Link href={`/games/${game.id}`} className={Styles["card-list__link"]}>
                                <Card
                                    {...game}
                                />
                            </Link>
                        </li>
                        )
                    })}
                </ul>
                :
                <Preloader />
            }
        </section>
    )
}