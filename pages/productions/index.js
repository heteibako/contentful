// import { redirect } from 'next/dist/next-server/server/api-utils';
import React from 'react';
import Link from 'next/link';
const Productions = ({ shows }) => {
  console.log(shows);
  return (
    <div>
      {shows.map(({ fields: { title, description, image, id } }) => (
        <div key={id}>
          <h1>{title}</h1>
          <img src={`${image.fields.file.url}`} alt={image.fields.title} />
          <p>{description}</p>
          <Link href={`/productions/${id}`}>
            <a>Read more</a>
          </Link>
        </div>
      ))}
    </div>
  );
};

let client = require('contentful').createClient({
  space: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
  accessToken: process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN,
});

export async function getStaticProps() {
  let data = await client.getEntries({
    content_type: 'shows',
  });

  return {
    props: { shows: data.items },
  };
}

export default Productions;
