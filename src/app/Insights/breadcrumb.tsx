"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Breadcrumb() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "New Impact", href: "/newimpact" },
  ];

  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        padding: "1rem 0",
        backgroundColor: "#f8fafc",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      {/* <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 1rem',
      }}>
        <ol style={{
          display: 'flex',
          alignItems: 'center',
          listStyle: 'none',
          padding: 0,
          margin: 0,
          gap: '0.5rem',
        }}>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.href}>
              <li style={{
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.2s ease',
              }}>
                <Link
                  href={item.href}
                  style={{
                    color: index === breadcrumbItems.length - 1 ? '#1e293b' : '#64748b',
                    fontWeight: index === breadcrumbItems.length - 1 ? '600' : '400',
                    textDecoration: 'none',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '4px',
                    transition: 'all 0.2s ease',
                    position: 'relative',
                    fontSize: '0.875rem',
                    ':hover': {
                      color: '#3b82f6',
                      backgroundColor: '#e2e8f0',
                    },
                  }}
                >
                  {item.label}
                  {index === breadcrumbItems.length - 1 && (
                    <span style={{
                      position: 'absolute',
                      bottom: '-2px',
                      left: '0.5rem',
                      right: '0.5rem',
                      height: '2px',
                      backgroundColor: '#3b82f6',
                      borderRadius: '2px',
                    }} />
                  )}
                </Link>
              </li>
              {index < breadcrumbItems.length - 1 && (
                <li style={{
                  color: '#cbd5e1',
                  display: 'flex',
                  alignItems: 'center',
                }}>
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                    style={{
                      verticalAlign: 'middle',
                    }}
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </li>
              )}
            </React.Fragment>
          ))}
        </ol>
      </div> */}
      <div
        className="page-section light-content"
        style={{
          backgroundImage: "url(/section-bg-1.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          padding: "80px 0",
        }}
        id="home"
      >
        {" "}
        <div className="container position-relative pt-20 pt-sm-40">
          <h1 className="hs-title-2 font-alt uppercase mb-0">
            <span
              style={{
                display: "inline-block",
                fontSize: "100px",
                paddingLeft: "20px",
              }}
              className="impact-title"
            >
              REALM INSIGHTS
            </span>
            <span
              className="section-title-image"
              style={{ display: "inline-block", marginLeft: "10px" }}
            >
              <Image
                src="/shape-2.svg"
                alt=""
                width={35}
                height={35}
              />
            </span>
          </h1>

          <style jsx>{`
            @media (max-width: 768px) {
              .impact-title {
                font-size: 30px !important;
              }
            }
          `}</style>
        </div>
      </div>
    </nav>
  );
}
