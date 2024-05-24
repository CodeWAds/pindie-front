"use client";

import { useGetDataByCategory } from "./api/api-hooks";
import { Banner } from "./components/Banner/Banner";
import { CardsListSection } from "./components/CardsListSection/CardsListSection";
import { Promo } from "./components/Promo/Promo";
import { endpoints } from "./api/config";
import { Preloader } from "./components/Preloader/Preloader";


export default function Home() {

  const popularGames = useGetDataByCategory(endpoints.games, "popular");
  const newGames = useGetDataByCategory(endpoints.games, "new");

  return (
    <main className="main">
      <Banner />
      {popularGames ? (<CardsListSection type="slider" id="popular" title="Популярные" data={popularGames} />) :
      <Preloader/> }
      {newGames ? (<CardsListSection type="slider" id="new" title="Новинки" data={newGames} />) : 
      <Preloader />}
      <Promo />
    </main>
  )
}