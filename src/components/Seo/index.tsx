import Head from 'next/head';

interface SeoProps {
  title: string;
  description: string;
  thumnail: string;
  url: string;
}

function Seo(props: SeoProps) {
  const { title, description, thumnail, url } = props;

  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <link rel="canonical" href={url} />
      <link rel="shortlink" href={url} />
      <meta name="news_keywords" content={title} />
      <link rel="image_src" href={thumnail} />
      <meta name="title" content={title} />
      <meta name="description" content={description} />

      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={thumnail} />
      <meta property="og:image:width" content="875" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={title} />
      <meta property="og:image:url" content={thumnail} />
      <meta property="og:image:height" content="476" />
      <meta property="og:image:type" content="website" />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={thumnail} />
      <meta property="twitter:image:width" content="875" />
      <meta property="twitter:image:height" content="476" />

      <meta property="og:video:width" content="875" />
      <meta property="article:tag" content={title} />
      <meta property="book:tag" content={title} />
      <meta name="Generator" content="Drupal 9 (https://www.drupal.org)" />
      <meta name="MobileOptimized" content="width" />
      <meta name="HandheldFriendly" content="true" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=0" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0"
      />
    </Head>
  );
}

export default Seo;
