import { useEffect, useLayoutEffect } from "react";
import {
  BEACON_SITE_NAME,
  DEFAULT_SOCIAL_IMAGE,
  getAbsoluteAssetUrl,
  getCanonicalUrl,
  getDocumentTitle,
  getRouteMetadata,
  type RouteMetadata,
} from "@shared/routeMetadata";

export interface PageMetaOptions {
  /** Title without the Beacon Momentum suffix. */
  title: string;
  description: string;
  /** Relative or absolute social image URL. */
  image?: string;
  /** Relative canonical path for this page. Defaults to the current pathname. */
  url?: string;
  /** og:type — defaults to website. */
  type?: "website" | "article";
  /** Optional crawler directive for post-enrollment or operations routes. */
  robots?: string;
}

function setMeta(property: string, content: string, attr: "name" | "property" = "property") {
  let element = document.querySelector(`meta[${attr}="${property}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, property);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

function toPath(url?: string): string {
  if (!url) return window.location.pathname;
  try {
    return new URL(url, window.location.origin).pathname;
  } catch {
    return window.location.pathname;
  }
}

function applyDocumentMetadata({ title, description, image, url, type = "website", robots }: PageMetaOptions) {
  const path = toPath(url);
  const fullTitle = getDocumentTitle(title);
  const canonicalUrl = getCanonicalUrl(path);
  const socialImage = getAbsoluteAssetUrl(image || DEFAULT_SOCIAL_IMAGE);
  const fallbackRobots = getRouteMetadata(path).robots || "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1";

  document.title = fullTitle;
  setMeta("description", description, "name");
  setMeta("robots", robots || fallbackRobots, "name");

  setMeta("og:site_name", BEACON_SITE_NAME);
  setMeta("og:type", type);
  setMeta("og:title", fullTitle);
  setMeta("og:description", description);
  setMeta("og:image", socialImage);
  setMeta("og:image:width", "1200");
  setMeta("og:image:height", "630");
  setMeta("og:image:alt", fullTitle);
  setMeta("og:url", canonicalUrl);

  setMeta("twitter:card", "summary_large_image", "name");
  setMeta("twitter:site", "@BeaconMomentum", "name");
  setMeta("twitter:title", fullTitle, "name");
  setMeta("twitter:description", description, "name");
  setMeta("twitter:image", socialImage, "name");

  let canonical = document.querySelector("link[rel='canonical']") as HTMLLinkElement | null;
  if (!canonical) {
    canonical = document.createElement("link");
    canonical.rel = "canonical";
    document.head.appendChild(canonical);
  }
  canonical.href = canonicalUrl;
}

function routeOptions(pathname: string, metadata: RouteMetadata): PageMetaOptions {
  return {
    title: metadata.title,
    description: metadata.description,
    image: metadata.image,
    url: pathname,
    type: metadata.type,
    robots: metadata.robots,
  };
}

/** Applies registry metadata whenever a client-side route changes. */
export function useRouteMetadata(pathname: string) {
  useLayoutEffect(() => {
    applyDocumentMetadata(routeOptions(pathname, getRouteMetadata(pathname)));
  }, [pathname]);
}

/**
 * Lets dynamic or bespoke pages refine the route registry after navigation.
 * The server registry still controls the initial HTML seen by non-JavaScript crawlers.
 */
export function usePageMeta(options: PageMetaOptions) {
  useEffect(() => {
    applyDocumentMetadata(options);
  }, [options.title, options.description, options.image, options.url, options.type, options.robots]);
}
