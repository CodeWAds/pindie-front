'use client';
import { CardsListSection } from "../components/CardsListSection/CardsListSection"; 
import { useGetDataByCategory } from "../api/api-hooks";
import { Preloader } from "../components/Preloader/Preloader"; 
import { endpoints } from "../api/config";

export default function New() {
    const newGames = useGetDataByCategory(endpoints.games, "new");
    return (
      <main className="main-inner">
        {newGames ? (
          <CardsListSection id="new" title="Новинки" data={newGames} />
        ) : (
          <Preloader />
        )}
      </main>
    );
  }