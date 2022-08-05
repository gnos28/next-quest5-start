import React from "react";
import Layout from "../../components/Layout";
import { getArticles, getSingleArticle } from "../../lib/article";
import styles from "./article.module.scss";
import Image from "next/image";
import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export async function getStaticProps({ params }) {
  const postData = await getSingleArticle(params.id);
  const genDate = new Date().toString();

  console.log("genDate", genDate);

  return {
    props: {
      postData,
      genDate,
    },
  };
}

export async function getStaticPaths() {
  const paths = (await getArticles(0, 3)).map((article) => ({
    params: { id: article.id.toString() },
  }));

  console.log("paths", paths);

  return {
    paths,
    fallback: true,
  };
}

export default function Article({ postData, genDate }) {
  console.log("genDate", genDate);
  console.log("postData", postData);

  return (
    <Layout>
      <div className={styles.divContainer}>
        <h1>{postData?.title || <Skeleton />}</h1>

        {postData?.pictureUrl ? (
          <div className={styles.imageContainer}>
            <Image
              src={postData.pictureUrl}
              blurDataURL={postData.pictureUrl}
              height="300"
              width="200"
              layout="fill"
              draggable={false}
              placeholder="blur"
              objectFit="cover"
              objectPosition="center"
            />
          </div>
        ) : (
          <Skeleton height={300} />
        )}
        {postData?.body ? (
          postData.body.split("\n").map((line) => <p key={line}>{line}</p>)
        ) : (
          <Skeleton count={5} />
        )}

        <Link href={`/articles/`}>
          <a className={styles.navlink}>back to articles list</a>
        </Link>

        <span className={styles.gendate}>
          This page was last updated on {genDate}
        </span>
      </div>
    </Layout>
  );
}
