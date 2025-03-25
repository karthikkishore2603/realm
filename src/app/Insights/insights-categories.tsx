"use client";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { MouseEvent } from "react";

interface Category {
  id: number;
  text: string;
}

export default function Categories() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory: string = searchParams.get("category") || "All";

  const categories: Category[] = [
    { id: 1, text: "All" },
    { id: 2, text: "Cloud" },
    { id: 3, text: "Blockchain" },
    { id: 4, text: "Consulting" },
    { id: 5, text: "Data Analytics" },
    { id: 6, text: "Enterprise Platform" },
    { id: 7, text: "Artificial Intelligence" },
    { id: 8, text: "Branding and Marketing" },
    { id: 9, text: "Corporate Domain Name" },
    { id: 10, text: "Cognitive Business Operations" },
  ];

  const handleCategoryClick = (category: string) => {
    const params = new URLSearchParams(searchParams);
    if (category === "All") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`${pathname}?${params.toString()}`);
  };

  const handleMouseEnter = (e: MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    target.style.transform = "scale(1.1)";
    target.style.boxShadow = "0 8px 12px rgba(0, 0, 0, 0.3)";
    target.style.background = "#000000";
    target.style.color = "#E5E5E5";
  };

  const handleMouseLeave = (e: MouseEvent<HTMLButtonElement>, category: string) => {
    const target = e.currentTarget;
    target.style.transform = "scale(1)";
    target.style.boxShadow =
      currentCategory === category ? "0 4px 6px rgba(0, 0, 0, 0.3)" : "0 2px 4px rgba(0, 0, 0, 0.1)";
    target.style.background = currentCategory === category ? "#000000" : "#fff";
    target.style.color = currentCategory === category ? "#E5E5E5" : "#333";
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "20px 0",
      }}
    >
      <h2
        style={{
          fontSize: "38px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#333",
          textAlign: "center",
        }}
      >
        Categories
      </h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "15px",
          maxWidth: "90%",
          textAlign: "center",
        }}
      >
        {categories.map((link) => (
          <button
            key={link.id}
            onClick={() => handleCategoryClick(link.text)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={(e) => handleMouseLeave(e, link.text)}
            style={{
              padding: "12px 24px",
              border: "2px solid #ddd",
              borderRadius: "30px",
              background: currentCategory === link.text ? "#000000" : "#fff",
              color: currentCategory === link.text ? "#E5E5E5" : "#333",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              boxShadow:
                currentCategory === link.text
                  ? "0 4px 6px rgba(0, 0, 0, 0.3)"
                  : "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {link.text}
          </button>
        ))}
      </div>
    </div>
  );
}
