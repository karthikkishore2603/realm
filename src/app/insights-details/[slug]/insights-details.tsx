"use client";

import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { sanityClient2 } from "../../../../lib/sanity";
import { TypedObject } from "@portabletext/types";
import React, { Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

interface Post {
  title: string;
  publishedAt: string;
  description?: string;
  paragraph: TypedObject | TypedObject[];
  mainImage?: {
    asset: {
      url: string;
    };
    alt?: string;
  };
  author?: {
    name: string;
    image?: {
      asset: {
        url: string;
      };
    };
  };
  categories?: Array<{
    title: string;
  }>;
}

const PostContent = () => {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = React.useState<Post | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  React.useEffect(() => {
    if (!params?.slug) {
      setError(new Error("No slug parameter provided"));
      setLoading(false);
      return;
    }

    async function fetchPost() {
      try {
        const query = `*[_type == "post" && slug.current == $slug][0]{
          title,
          publishedAt,
          description,
          paragraph,
          mainImage{
            asset->{
              url
            },
            alt
          },
          author->{
            name,
            image
          },
          categories[]->{
            title
          }
        }`;

        const fetchedPost = await sanityClient2.fetch(query, {
          slug: params.slug,
        });

        if (!fetchedPost) {
          router.push('/impact-studies');
          return;
        }

        setPost(fetchedPost);
      } catch (err) {
        console.error("Error fetching post:", err);
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [params?.slug, router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-24 text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
        <p className="text-gray-700 mb-6">{error.message}</p>
        <Link 
          href="/impact-studies" 
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Back to Impact Studies
        </Link>
      </div>
    );
  }

  if (!post) {
    return null;
  }

  return (
    <div className="theme-main">
      <div className="page" id="top">
        <main id="main">
          {/* Hero Section */}
          <section className="page-section pt-0 pb-0" id="home">
            <div
              className="page-section bg-gray-light-1 bg-light-alpha-90 parallax-5"
              style={{
                backgroundImage: "url(/section-bg-1.jpg)",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="container position-relative pt-20 md:pt-30 pt-sm-50">
                <div className="text-center">
                  <div className="row">
                    <div className="col-md-8 offset-md-2 p-4 md:p-5">
                      <h1 className="hs-title-1 mb-10 md:mb-20 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl tracking-tight">
                        {post.title}
                      </h1>
                      
                      <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
                        {post.publishedAt && (
                          <div className="text-white text-sm sm:text-base md:text-lg">
                            Published: {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        )}
                        
                        {post.author?.name && (
                          <div className="flex items-center gap-2 text-white text-sm sm:text-base md:text-lg">
                            {post.author?.image?.asset?.url && (
                              <Image
                                src={post.author.image.asset.url}
                                alt={post.author.name}
                                width={28}
                                height={28}
                                className="rounded-full w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
                              />
                            )}
                            <span>{post.author.name}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Content Section */}
          <section className="py-8 md:py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10">
              <div className="flex justify-start mb-6 md:mb-8">
                <Link 
                  href="/Insights" 
                  className="flex items-center text-blue-600 hover:text-blue-800 transition text-sm md:text-base"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Realm Insights
                </Link>
              </div>
              
              <div className="flex flex-col md:flex-row gap-6 md:gap-12 lg:gap-16">
                {/* Image Column */}
                {post.mainImage?.asset?.url && (
  <div className="w-full md:w-1/2 lg:w-[46%] md:sticky md:top-24 h-auto md:h-[70vh] mb-6 md:mb-0">
    <div className="relative aspect-video md:aspect-[4/3]">
      <Image
        src={post.mainImage.asset.url}
        alt={post.mainImage.alt || post.title || "Impact study image"}
        fill
        className="w-full h-full object-cover rounded-lg"
        priority
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 46vw"
      />
    </div>
  </div>
)}

                {/* Content Column */}
                <div className={`${post.mainImage?.asset?.url ? 'w-full md:w-1/2 lg:w-[54%]' : 'w-full'} text-gray-700`}>
                  {post.description && (
                    <p className="text-lg md:text-xl text-gray-600 mb-6 md:mb-8 leading-relaxed font-medium text-justify" style={{color:"black"}}>
                      {post.description}
                    </p>
                  )}

                  {post.paragraph && (
                    <div className="prose max-w-none text-justify">
                      <PortableText
                        value={post.paragraph}
                        components={{
                          block: {
                            h1: ({ children }) => (
                              <h1 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 mt-6 md:mt-8">{children}</h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-xl sm:text-2xl font-semibold mb-3 md:mb-5 mt-5 md:mt-7">{children}</h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-lg sm:text-xl font-medium mb-3 md:mb-4 mt-4 md:mt-6">{children}</h3>
                            ),
                            normal: ({ children }) => (
                              <p className="text-base leading-relaxed mb-4">{children}</p>
                            ),
                          },
                          list: {
                            bullet: ({ children }) => (
                              <ul className="list-disc ml-5 mb-4">{children}</ul>
                            ),
                            number: ({ children }) => (
                              <ol className="list-decimal ml-5 mb-4">{children}</ol>
                            ),
                          },
                          listItem: {
                            bullet: ({ children }) => (
                              <li className="mb-2">{children}</li>
                            ),
                            number: ({ children }) => (
                              <li className="mb-2">{children}</li>
                            ),
                          },
                          types: {
                            image: ({ value }) => (
                              <div className="my-4 md:my-6">
                                {value?.asset?.url && (
                                  <div className="relative aspect-video w-full">
                                    <Image
                                      src={value.asset.url}
                                      alt={value.alt || ""}
                                      fill
                                      className="rounded-lg object-cover"
                                    />
                                  </div>
                                )}
                                {value.caption && (
                                  <p className="text-center text-sm text-gray-500 mt-2">
                                    {value.caption}
                                  </p>
                                )}
                              </div>
                            ),
                          },
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

const ContentSection = () => {
  return (
    <Suspense fallback={
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    }>
      <PostContent />
    </Suspense>
  );
};

export default ContentSection;