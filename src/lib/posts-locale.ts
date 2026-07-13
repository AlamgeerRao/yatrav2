import type { Locale } from "./i18n";
import { posts as postsEn, findPost as findPostEn } from "./posts";
import { postsFr, findPostFr } from "./posts.fr";

export function getPosts(locale: Locale) {
  return locale === "fr" ? postsFr : postsEn;
}

export function getPost(locale: Locale, slug: string) {
  return locale === "fr" ? findPostFr(slug) : findPostEn(slug);
}
