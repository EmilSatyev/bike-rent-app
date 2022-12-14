import React from "react";
import Helmet from "../../components/Helmet/Helmet";
import Hero from "../../components/Hero/Hero";
import SearchResult from "../../components/SearchResult/SearchResult";

const Home = () => {
  return (
    <Helmet title="Главная">
      <Hero />
      <SearchResult />
    </Helmet>
  );
};

export default Home;
