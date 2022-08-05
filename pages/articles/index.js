import React from "react";
import Layout from "../../components/Layout";
import { getArticles } from "../../lib/article";
import Link from "next/link";
import styles from "./article.module.scss";

export async function getStaticProps() {
  const allArticles = await getArticles(0, 5);
  const genDate = new Date().toString();

  return {
    props: {
      allArticles,
      genDate,
    },
  };
}

const MAX_TITLE_LENGTH = 15;

export default function index({ allArticles, genDate }) {
  return (
    <Layout>
      <div className={styles.articleListContainer}>
        <div>
          Liste des articles :
          {allArticles.map((article) => (
            <Link href={`/articles/${article.id}`}>
              <a className={styles.navlink}>
                {article.title.length > MAX_TITLE_LENGTH
                  ? article.title
                      .split(" ")
                      .reduce(
                        (acc, val) =>
                          acc.length < MAX_TITLE_LENGTH ? acc + val + " " : acc,
                        ""
                      )
                  : article.title}
              </a>
            </Link>
          ))}
        </div>
        <span className={styles.gendate}>
          This page was last updated on {genDate}
        </span>
      </div>
    </Layout>
  );
}
