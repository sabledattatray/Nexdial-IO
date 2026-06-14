import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Calendar, User, ArrowLeft, Clock, CheckCircle } from "lucide-react";
import { BlogClient } from "@/components/blog/BlogClient";

export function generateStaticParams() {
  return Object.keys(ARTICLES).map((slug) => ({
    slug: slug,
  }));
}

import { ARTICLES } from "@/lib/blog-content";

// Generate static routes metadata for SEO crawler
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const article = ARTICLES[resolvedParams.slug];
  if (!article) return {};

  return {
    title: `${article.title} | NexDial Blog`,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: `/blog/${resolvedParams.slug}`,
    },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.description,
      publishedTime: new Date(article.date).toISOString(),
      authors: [article.author],
      images: [{ url: article.schemaImage }],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const article = ARTICLES[resolvedParams.slug];

  if (!article) {
    notFound();
  }

  // Get next and prev posts
  const allSlugs = Object.keys(ARTICLES);
  const currentIndex = allSlugs.indexOf(resolvedParams.slug);
  
  const prevSlug = currentIndex > 0 ? allSlugs[currentIndex - 1] : null;
  const nextSlug = currentIndex < allSlugs.length - 1 ? allSlugs[currentIndex + 1] : null;

  const prevPost = prevSlug ? { slug: prevSlug, title: ARTICLES[prevSlug].title } : null;
  const nextPost = nextSlug ? { slug: nextSlug, title: ARTICLES[nextSlug].title } : null;

  // Get 3 related posts deterministically (e.g. next 3 in the array, wrapping around)
  const relatedSlugs = [];
  for (let i = 1; i <= 3; i++) {
    const relatedIndex = (currentIndex + i) % allSlugs.length;
    if (allSlugs[relatedIndex] !== resolvedParams.slug) {
      relatedSlugs.push(allSlugs[relatedIndex]);
    }
  }

  const relatedPosts = relatedSlugs.map(slug => ({
    slug,
    title: ARTICLES[slug].title,
    excerpt: ARTICLES[slug].excerpt,
    date: ARTICLES[slug].date,
    category: ARTICLES[slug].category,
    author: ARTICLES[slug].author,
  }));

  // Schema.org structured JSON-LD data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": article.title,
    "image": article.schemaImage,
    "datePublished": new Date(article.date).toISOString(),
    "dateModified": new Date(article.date).toISOString(),
    "author": {
      "@type": "Person",
      "name": article.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "NexDial",
      "logo": {
        "@type": "ImageObject",
        "url": "https://nexdial.io/icon",
      },
    },
    "description": article.description,
  };

  return (
    <>
      {/* JSON-LD Schema injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogClient 
        article={article} 
        sections={article.sections}
        prevPost={prevPost}
        nextPost={nextPost}
        relatedPosts={relatedPosts}
      >
        {article.content}
      </BlogClient>
    </>
  );
}
