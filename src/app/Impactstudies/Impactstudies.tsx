import Image from "next/image"
import Link from "next/link"
 
interface BlogCardProps {
    cover: string;
    title: string;
    tags: string[];
}

const BlogCard = ({ cover, title, tags }: BlogCardProps) => {
return (
    <Link href="/Impactstudies-content">
    <div className="bg-white h-full dark:bg-gray-950 border border-gray-100 dark:border-gray-900 duration-300 ease-linear hover:border-gray-200 dark:hover:border-gray-800 p-0.5 flex flex-col group">
        <Image alt="banner image" className="w-full aspect-video object-cover relative" src={cover} width={1263} height={1291} />
        <div className="px-4 lg:px-6 py-5 lg:py-8">
            <Link  className="text-gray-900 dark:text-white font-semibold text-2xl lg:text-3xl" href="#">{title}</Link>
            <div className="flex flex-wrap gap-x-2 w-full gap-y-3 pt-5">
                {
                    tags.map((tag, index)=>(
                        <span key={`tag${index}`} className="bg-gray-100 dark:bg-gray-900 text-blue-600 dark:text-gray-200 px-2">
                            {tag}
                        </span>
                    ))
                }
            </div>
        </div>
    </div>
    </Link>
)
}
const posts = [
{
    id: 1,
    cover: "/images/working-on-housing-project.jpg",
    title: "How to Sructure your reactJs Application like a Legend ",
    tags:[
        "ReactJs","WebDesign", "Web Development"
    ]
},
{
    id: 2,
    cover: "/images/working-on-housing-project.jpg",
    title: "How to Sructure your reactJs Application like a Legend ",
    tags:[
        "ReactJs","WebDesign", "Web Development"
    ]
},
{
    id: 3,
    cover: "/images/working-on-housing-project.jpg",
    title: "How to Sructure your reactJs Application like a Legend ",
    tags:[
        "ReactJs","WebDesign", "Web Development"
    ]
},
{
    id: 4,
    cover: "/images/working-on-housing-project.jpg",
    title: "How to Sructure your reactJs Application like a Legend ",
    tags:[
        "ReactJs","WebDesign", "Web Development"
    ]
},
]
const BlogSection = () => {
return (
    <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-14">
            <div className="flex md:justify-between">
                <div className="text-center space-y-6 max-w-2xl mx-auto md:mx-0 md:text-left">
                    <div className="text-center md:text-left md:max-w-lg space-y-5">
                        <h2 className="text-3xl font-semibold text-black md:text-4xl xl:text-5xl leading-tight">Impact Studies</h2>
                    </div>
                </div>
                
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 lg:gap-12 rounded-t-lg">
                {
                    posts.map(post=>(
                        <BlogCard key={post.id} {...post}/>
                    ))
                }
            </div>
        </div>
    </section>
)
}
export default BlogSection