'use client';
import { CardsListSection } from "../components/CardsListSection/CardsListSection";
import { endpoints } from "../api/config";
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader";

export default function TDS() {
    const tdsGames = useGetDataByCategory(endpoints.games, "TDS");
    return (
        <main className={"main-inner"}>
            {tdsGames ? (
            <CardsListSection id="TDS" title="TDS" data={tdsGames}/>
            ) : (
                <Preloader/>
            )}
        </main>
    )
}