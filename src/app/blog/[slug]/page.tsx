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
      <BlogClient article={article} sections={article.sections}>
        {article.content}
      </BlogClient>
    </>
  );
}
