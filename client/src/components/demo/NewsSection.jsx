import { NewsCard } from "./NewsCard";
import { useState, useEffect } from "react";

export function NewsSection() {
  const getActualDates = () => {
    const today = new Date();
    const lastWeek = new Date();
    lastWeek.setDate(today.getDate() - 7); 

    const formatDate = (date) => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0"); 
      const day = String(date.getDate()).padStart(2, "0");

      return `${year}-${month}-${day}`;
    };

    return {
      today: formatDate(today),
      lastWeek: formatDate(lastWeek),
    };
  };

  const [news, setNews] = useState([]);

  const getNews = () => {
    const { today, lastWeek } = getActualDates();

    fetch(
      `https://newsapi.org/v2/everything?q=Traffic&from=${lastWeek}&to=${today}&language=en&sortBy=publishedAt&apiKey=c3ccaecb001a45e0864b03adcc94ca9c`
    )
      .then((res) => res.json())
      .then((json) => {
        const filteredNews = json.articles
          .filter(
            (article) =>
              article.author &&
              article.title &&
              article.description &&
              article.url &&
              article.urlToImage
          )
          .slice(0, 3);

        console.log(filteredNews);
        setNews(filteredNews);
      });
  };

  useEffect(() => {
    getNews();
  }, []);

  return (
    <>
      <div id="NewsSection" className="flex flex-col gap-8 mx-2 mb-2 mt-6">
        <h2 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
          Fuel Your Curiosity with{" "}
          <span className="text-blue-600 dark:text-blue-500">Fresh Reads</span>
        </h2>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {news.map((article, index) => (
            <NewsCard key={index} article={article} />
          ))}
        </div>
      </div>
    </>
  );
}