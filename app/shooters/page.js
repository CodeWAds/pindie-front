'use client';
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { endpoints } from "../api/config";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";

export default function Shooter() {
    const shootersGames = useGetDataByCategory(endpoints.games,"shooter");

    return (
        <main className={"main-inner"}>
            {shootersGames ? (
            <CardsListSection id="shooters" title="Шутеры" data={shootersGames}/>
            ) :(
                <Preloader/>
            )}
        </main>
    )
}