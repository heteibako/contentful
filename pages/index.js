import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

export default function Home({ posts }) {
  return (
    <div className={styles.container}>
      {posts.map(({ fields: { title, content, author }, sys: { id } }) => (
        <div key={id}>
          <h1>{title}</h1>
          <div>{documentToReactComponents(content)}</div>
          <h2>{author}</h2>
        </div>
      ))}
    </div>
  );
}

let client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: 'blog',
  });

  return {
    props: { posts: data.items },
  };
}
