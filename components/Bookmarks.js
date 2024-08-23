import Head from 'next/head';
import { useSelector } from 'react-redux';
import styles from "../styles/Bookmarks.module.css"
import Article from './Article';


function Bookmarks() {
	const favori = useSelector((state) => state.bookmarks.value)

	let BookmarksArticles = <p>No Bookmarks</p>

	if (favori.length > 0) {
		BookmarksArticles = favori.map((data, i) => {
			console.log(data);
			return <Article key={data.title} {...data} isBookmarked/>;
		});
	}

	return (
		<div>
			<Head>
				<title>Morning News - Bookmarks</title>
			</Head>
			<div className={styles.container}>
				<h2>Bookmarks</h2>
				<div className={styles.article}>{BookmarksArticles}</div>
			</div>
		</div>

	);
}

export default Bookmarks;
