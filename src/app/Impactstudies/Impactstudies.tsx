"use client";

import React, { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { sanityClient2 } from "../../../lib/sanity";

interface BlogPost {
  _id: string;
  title: string;
  publishedAt: string;
  slug: {
    current: string;
  };
  mainImage: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  description?: string;
}

const BlogCard = ({ post }: { post: BlogPost }) => {
  const titleWords = post.title.split(' ');

  return (
    <div className="bg-white h-full border-blue-900 duration-300 ease-linear hover:border-gray-800 p-0.5 flex flex-col group">
      <Link href={`/impact-details/${post.slug.current}`}>
        <Image 
          alt={post.mainImage.alt || post.title} 
          className="w-full aspect-video object-cover relative" 
          src={post.mainImage.asset.url} 
          width={1263} 
          height={1291} 
        />
      </Link>
      <div className="px-4 lg:px-6 py-5 lg:py-8">
        <Link 
          href={`/impact-details/${post.slug.current}`}
          className="text-gray-900 font-semibold text-2xl lg:text-3xl inline-block" 
        >
          <div className="flex flex-wrap gap-x-2">
            {titleWords.map((word, index) => (
              <span 
                key={index} 
                className="relative inline-block group-hover:text-blue-600 transition-colors duration-300"
              >
                {word}
                <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
              </span>
            ))}
          </div>
        </Link>
        <div className="pt-3 text-gray-500">
          {new Date(post.publishedAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  )
}

const BlogPosts = () => {
  const [posts, setPosts] = React.useState<BlogPost[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    async function fetchPosts() {
      try {
        const query = `*[_type == "post"] | order(publishedAt desc) {
          _id,
          title,
          publishedAt,
          description,
          slug,
          mainImage{
            asset->{
              url
            },
            alt
          }
        }`;

        const fetchedPosts = await sanityClient2.fetch(query);
        setPosts(fetchedPosts);
      } catch (err: unknown) {
        console.error("Error fetching blog posts:", err);
        setError(err instanceof Error ? err : new Error('An unknown error occurred'));
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 rounded-t-lg">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="bg-white h-full p-0.5 flex flex-col animate-pulse">
            <div className="w-full aspect-video bg-gray-200"></div>
            <div className="px-4 lg:px-6 py-5 lg:py-8 space-y-3">
              <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
              <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-10">
        Error loading impact studies. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 rounded-t-lg">
      {posts.map(post => (
        <BlogCard key={post._id} post={post} />
      ))}
    </div>
  );
}

const BlogSection = () => {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-14">
        <h1 className="text-4xl font-bold text-center">Impact Studies</h1>
        <Suspense fallback={
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 rounded-t-lg">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white h-full p-0.5 flex flex-col animate-pulse">
                <div className="w-full aspect-video bg-gray-200"></div>
                <div className="px-4 lg:px-6 py-5 lg:py-8 space-y-3">
                  <div className="h-8 w-3/4 bg-gray-200 rounded"></div>
                  <div className="h-6 w-1/2 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        }>
          <BlogPosts />
        </Suspense>
      </div>
    </section>
  )
}

export default BlogSection;