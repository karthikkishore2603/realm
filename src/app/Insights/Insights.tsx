"use client";

import React, { useEffect, useState, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import Categories from "./insights-categories";
import { sanityClient2 } from "../../../lib/sanity";
import { useSearchParams } from "next/navigation";

interface Category {
  _id: string;
  title: string;
  slug?: {
    current: string;
  };
}

interface BlogPost {
  _id: string;
  title: string;
  publishedAt: string;
  slug?: {
    current: string;
  };
  mainImage?: {
    asset?: {
      url: string;
    };
    alt?: string;
  };
  categories?: Category[];
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  const [formattedDate, setFormattedDate] = useState("");
  const [isDateLoading, setIsDateLoading] = useState(true);

  useEffect(() => {
    setFormattedDate(
      new Date(post.publishedAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    );
    setIsDateLoading(false);
  }, [post.publishedAt]);

  if (!post.slug?.current) return null;

  return (
    <div className="flex flex-col space-y-3 group">
      <Link
        href={`/insights-details/${post.slug.current}`}
        className="relative overflow-hidden rounded"
      >
        {post.mainImage?.asset?.url && (
          <Image
            src={post.mainImage.asset.url}
            alt={post.mainImage.alt || post.title || "Blog post image"}
            width={1300}
            height={900}
            className="w-full rounded aspect-[5/3] object-cover bg-gray-100 dark:bg-gray-900 transition-transform duration-300 group-hover:scale-105"
            priority={false}
          />
        )}
      </Link>

      {post.categories && post.categories.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {post.categories.map((category) =>
            category.slug?.current ? (
              <Link
                key={category._id}
                href={`/category/${category.slug.current}`}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900  hover:bg-blue-200  transition-colors"
              >
                {category.title}
              </Link>
            ) : (
              <span
                key={category._id}
                className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
              >
                {category.title}
              </span>
            )
          )}
        </div>
      )}

      <Link
        href={`/insights-details/${post.slug.current}`}
        className="text-lg font-semibold text-gray-900  hover:text-blue-600 transition-colors"
      >
        {post.title}
      </Link>

      {isDateLoading ? (
        <div className="pt-3 h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      ) : (
        <div className="pt-3 text-gray-500 dark:text-gray-400">
          {formattedDate}
        </div>
      )}
    </div>
  );
};

const BlogList = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");

  useEffect(() => {
    async function fetchPosts() {
      try {
        let query = `*[_type == "post"`;

        if (currentCategory && currentCategory !== "All") {
          query += ` && references(*[_type == "category" && title == "${currentCategory}"]._id)`;
        }

        query += `] | order(publishedAt desc)[0..2] {
          _id,
          title,
          publishedAt,
          slug,
          mainImage{
            asset->{
              url
            },
            alt
          },
          categories[]->{
            _id,
            title,
            slug
          }
        }`;

        const fetchedPosts = await sanityClient2.fetch(query);
        const validPosts: BlogPost[] = fetchedPosts.filter(
          (post: BlogPost) =>
            post.slug?.current &&
            (!currentCategory ||
              currentCategory === "All" ||
              post.categories?.some((cat: Category) => cat.title === currentCategory))
        );

        setPosts(validPosts);
      } catch (err: unknown) {
        console.error("Error fetching blog posts:", err);
        setError(
          err instanceof Error ? err : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [currentCategory]);

  if (loading) {
    return (
      <div className="grid sm:grid-cols-2 gap-6 md:gap-10 lg:grid-cols-3 lg:gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="flex flex-col space-y-3 animate-pulse">
            <div className="w-full rounded aspect-[5/3] bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex gap-2">
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
              <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
            </div>
            <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        Error loading blog posts. Please try again later.
      </div>
    );
  }

  return (
    <>
      {posts.length > 0 ? (
        <div className="grid sm:grid-cols-2 gap-6 md:gap-10 lg:grid-cols-3 lg:gap-8">
          {posts.map((post) => (
            <BlogCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          No posts found for this category.
        </div>
      )}
    </>
  );
};

const BlogSection = () => {
  return (
    <section className="pt-10 pb-50">
      <div className="pb-4">
        <Suspense fallback={<div className="h-10 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>}>
          <Categories />
        </Suspense>
      </div>
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-10">
        <Suspense fallback={
          <div className="grid sm:grid-cols-2 gap-6 md:gap-10 lg:grid-cols-3 lg:gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3 animate-pulse">
                <div className="w-full rounded aspect-[5/3] bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex gap-2">
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-6 w-16 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                <div className="h-5 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        }>
          <BlogList />
        </Suspense>
      </div>
    </section>
  );
};

export default BlogSection;