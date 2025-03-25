import Nav from '@/components/Nav';
import Impactstudies from './Impactstudies'
import Breadcrumb from './breadcrumb';
import Footer from '@/components/Footer';

export default function Page() {
  return (
    <>
    <Nav />
  
    <Breadcrumb/>

   
    <Impactstudies />
    <Footer />
    </>
  );
}