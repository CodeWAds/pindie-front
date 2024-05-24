'use client';
import { CardsListSection } from "../components/CardsListSection/CardsListSection"; 
import { endpoints } from "../api/config";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";

export default function Popular() {
    const popularGames = useGetDataByCategory(endpoints.games, "popular");

    return (
        <main className={"main-inner"}>
            {popularGames ? (
            <CardsListSection id="popular" title="Популярные" data={popularGames}/>
            ) : (
                <Preloader/>
            )}
        </main>
    );
}