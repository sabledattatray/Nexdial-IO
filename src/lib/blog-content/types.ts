import React from "react";

export interface BlogSection {
  id: string;
  label: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  excerpt: string;
  keywords: string[];
  date: string;
  author: string;
  category: string;
  readTime: string;
  schemaImage: string;
  sections: BlogSection[];
  content: React.ReactNode;
}
