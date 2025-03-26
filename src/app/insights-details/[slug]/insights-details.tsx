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
              <div className="container position-relative pt-30 pt-sm-50">
                <div className="text-center">
                  <div className="row">
                    <div className="col-md-8 offset-md-2 p-5">
                      <h1 className="hs-title-1 mb-20 text-4xl md:text-6xl lg:text-7xl tracking-tight">
                        {post.title}
                      </h1>
                      
                      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-6">
                        {post.publishedAt && (
                          <div className="text-white text-lg">
                            Published: {new Date(post.publishedAt).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </div>
                        )}
                        
                        {post.author?.name && (
                          <div className="flex items-center gap-2 text-white">
                            {post.author?.image?.asset?.url && (
                              <Image
                                src={post.author.image.asset.url}
                                alt={post.author.name}
                                width={32}
                                height={32}
                                className="rounded-full"
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
          <section className="py-16">
            <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5">
              <div className="flex justify-start mb-8">
                <Link 
                  href="/Insights" 
                  className="flex items-center text-blue-600 hover:text-blue-800 transition"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Realm Insights
                </Link>
              </div>
              
              <div className="flex flex-col md:flex-row gap-16">
                {/* Image Column */}
                {post.mainImage?.asset?.url && (
                  <div className="md:w-1/2 lg:w-[46%] sticky top-24 h-[calc(100vh-6rem)]">
                    <Image
                      src={post.mainImage.asset.url}
                      alt={post.mainImage.alt || post.title || "Impact study image"}
                      width={1300}
                      height={900}
                      className="w-full h-auto object-cover rounded-lg"
                      priority
                    />
                  </div>
                )}

                {/* Content Column */}
                <div className={`${post.mainImage?.asset?.url ? 'md:w-1/2 lg:w-[54%]' : 'w-full'} text-gray-700`}>
                  {post.description && (
                    <p className="text-xl text-gray-600 mb-8 leading-relaxed text-bold text-justify" style={{color:"black"}}>
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
                              <h1 className="text-3xl font-bold mb-6 mt-8">{children}</h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="text-2xl font-semibold mb-5 mt-7">{children}</h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="text-xl font-medium mb-4 mt-6">{children}</h3>
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
                              <div className="my-6">
                                {value?.asset?.url && (
                                  <Image
                                    src={value.asset.url}
                                    alt={value.alt || ""}
                                    width={800}
                                    height={600}
                                    className="rounded-lg"
                                  />
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