import Head from 'next/head';
import Article from './Article';
import TopArticle from './TopArticle';
import styles from '../styles/Home.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useFetchArticles } from '../lib/hooks';

function Home() {

  const favori = useSelector((state) => state.bookmarks.value)

  const {
    topArticle, articlesData
  } = useFetchArticles();

  const articles = articlesData.map((data, i) => {
    const isBookmarked = favori.some((bookmark) => bookmark.title === data.title)
    return <Article key={i} {...data} isBookmarked={isBookmarked}/>;
  });

  let topArticleisBookmarked;

  if(favori.some((bookmark) => bookmark.title === topArticle.title)) {
    topArticleisBookmarked = <TopArticle {...topArticle} isBookmarked/>
  }else{
    topArticleisBookmarked = <TopArticle {...topArticle} isBookmarked={false}/>
  }

  return (
    <div>
      <Head>
        <title>Morning News - Home</title>
      </Head>

      {topArticleisBookmarked}

      <div className={styles.articlesContainer}>
        {articles}
      </div>
    </div>
  );
}

export default Home;
