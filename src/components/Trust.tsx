import Image from "next/image"
 
interface LogoItemProps {
    logo: string;
    name: string;
}

const LogoItem = ({ logo, name }: LogoItemProps) => {
return (
    <div className="p-4 sm:p-7 rounded-lg border border-gray-100  group">
        <Image src={logo} width={150} height={80} alt={name} className="h-7 sm:h-14 w-auto ease-linear duration-300 grayscale group-hover:!grayscale-0 group-hover:scale-105" />
    </div>
)
}
const logos = [
{
    id: 1,
    logo:"/t4.png",
    name:"Spotify"
},
{
    id: 2,
    logo:"/t3.png",
    name:"Paypal Logo"
},
{
    id: 3,
    logo:"/t.png",
    name:"Spotify"
},
{
    id: 4,
    logo:"/t1.png",
    name:"Spotify"
},
{
    id: 5,
    logo:"/t5.webp",
    name:"Spotify"
},
{
    id: 6,
    logo:"/t6.png",
    name:"Spotify"
}
]
const LogoCloudSection = () => {
return (
    <section className="py-20">
        <div className="max-w-7xl mx-auto px-5 sm:px-10 md:px-12 lg:px-5 space-y-10">
            <div className="text-center space-y-6 max-w-2xl mx-auto">
                <h1 className="text-4xl  font-bold text-gray-900  capitalize">Trusted By</h1>
            </div>
            <div className="flex justify-center flex-wrap gap-4">
                {
                    logos.map(
                        logo=>(
                            <LogoItem key={logo.id} {...logo}/>
                        )
                    )
                }
            </div>
        </div>
    </section>
)
}
export default LogoCloudSection

// "use client";

// import Image from "next/image";

// const brands = [
//   { src: "/t4.png", alt: "Coventry Road Dental Care" },
//   { src: "/t3.png", alt: "Capital Engineering Consultancy" },
//   { src: "/t2.png", alt: "InstaPR" },
//   { src: "/t1.png", alt: "The Greenhouse Barbecue" },
// ];

// export default function TrustedBy() {
//   return (
//     <div className="py-6 mt-20">
//       <div className="container mx-auto flex flex-col md:flex-row flex-wrap justify-center items-center gap-6 md:gap-8">
//         <h2 className="text-4xl font-semibold text-gray-900 mb-4 md:mb-0">Trusted By</h2>
//         <div className="flex flex-col md:flex-row gap-6 md:gap-10 items-center">
//           {brands.map((brand, index) => (
//             <div key={index} className="relative w-60 h-24">
//               <Image
//                 src={brand.src}
//                 alt={brand.alt}
//                 layout="fill"
//                 objectFit="contain"
//                 className="transition duration-300"
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
