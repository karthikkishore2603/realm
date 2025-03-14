export default function EditorsPick() {
  const articles = [
    {
      title: "How Porsche’s Mixed Reality Workshop Turns Tech Demos Into Sci-Fi Spectacles",
      image: "/Rook3.png",
    },
    {
      title: "How Porsche’s Mixed Reality Workshop Turns Tech Demos Into Sci-Fi Spectacles",
      image: "/Rook3.png",
    },
    {
      title: "How Porsche’s Mixed Reality Workshop Turns Tech Demos Into Sci-Fi Spectacles",
      image: "/Rook3.png",
    },
  ];

  return (
    <section className="py-10 mt-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl text-black font-bold text-center mb-6">Editors Pick</h2>
        <div className="flex flex-wrap justify-center gap-25">
          {articles.map((article, index) => (
            <div key={index} className="relative max-w-md h-90 rounded-xl shadow-lg overflow-hidden group">
              {/* Image */}
              <img
                src={article.image}
                alt="Article"
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end p-4">
                <p className="text-white text-sm font-semibold">{article.title}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
