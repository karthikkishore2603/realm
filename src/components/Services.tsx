
import { FaBullhorn, FaSearch, FaChartLine, FaChartBar, FaDatabase, FaCommentDots } from "react-icons/fa";

 
interface ServiceCardProps {
    title: string;
    description: string;
    icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, icon }) => {
return (
    <div className="flex flex-col lg:flex-row gap-4 lg:gap-6 p-5 xl:p-7 hover:cursor-default rounded-lg bg-gray-100   group transition duration-300 z-20 hover:z-30 shadow-md shadow-transparent hover:shadow-gray-100/40  border border-transparent hover:border-gray-200  hover:-translate-y-2 overflow-hidden relative">
        <div className="absolute w-40 h-10 rounded-full border-8 border-sky-600/20  blur-md -z-10 -top-1 right-5 rotate-45" />
        <div className="flex min-w-max items-start">
            <div className="p-1.5 rounded-full  shadow-sm relative bg-gradient-to-br from-gray-100 to-neutral-300 ">
                <div className=" bg-gray-100 rounded-full p-3 flex">
                    {icon}
                </div>
            </div>
        </div>
        <div className="space-y-5 flex flex-col md:flex-1 relative">
            <h2 className="text-xl font-semibold text-gray-900 ">
                {title}
            </h2>
            <p className="text-gray-700  text-justify line-clamp-3">
                {description}
            </p>
            {/* <Link href="#" className="text-sky-700  flex items-center gap-x-3 w-max">
                Get a quota
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                    <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd" />
                </svg>
            </Link> */}
        </div>
    </div>
)
}
const services = [
{
    id: 1,
    icon: <FaCommentDots className="text-black text-3xl" />,
    title: "Social Media Management",
    description: "Expand your reach and drive engagement with tailored content strategies.",
},
{
    id: 2,
    icon: <FaChartBar className="text-black text-3xl" />,
    title: "Website Development",
    description: "Create high-performing, visually stunning websites that convert visitors into customers.",
},
{
    id: 3,
    icon: <FaBullhorn className="text-black text-3xl" />,
    title: "Marketing Automation",
    description: "Save time and increase efficiency with automated marketing workflows.",
},
{
    id: 4,
    icon: <FaDatabase className="text-black text-3xl" />,
    title: "Analytics & Data Driven Marketing",
    description: "Leverage analytics and insights to optimize your marketing strategies.",
},
{
    id: 5,
    icon: <FaSearch className="text-black text-3xl" />,
    title: "Search Engine Optimization",
    description: "Boost your search rankings and attract organic traffic with proven SEO tactics.",
},
{
    id: 6,
    icon: <FaChartLine className="text-black text-3xl" />,
    title: "Search Engine Marketing",
    description: "Maximize visibility and generate quality leads through targeted ad campaigns.",
}
]
 
const Features = () => {
return (
    <section className="py-20">
      <div className="flex flex-col justify-center items-center gap-5 mb-10">
          <h2 className="text-4xl font-bold text-gray-900 flex justify-center">Our Services</h2>
          {/* <p className="text-gray-700 ">Lorem ipsum dolor sit amet consectetur adipisicing
              elit.</p> */}
      </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 flex flex-col items-start gap-10 xl:gap-14">
            
            <div className="grid sm:grid-cols-2 gap-6 md:gap-10">
                {
                    services.map(service => (
                        <ServiceCard key={service.id} {...service} />
                    ))
                }
            </div>
        </div>
    </section>
 
)
}
 
export default Features;