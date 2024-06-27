import S1 from "../components/S1/S1"
import S2 from "../components/S2/S2"
import Slide3 from "../components/S3/Slide3"
import S4 from "../components/S4/S4"
import S5 from "../components/S5/S5"
import Slide6 from "../components/S6/Slide6"
import Slide7 from "../components/S7/Slide7"
import S8 from "../components/S8/S8"
import S9 from "../components/S9/S9"
import S10 from "../components/S10/S10"
import S11 from "../components/S11/S11"
import S12 from "../components/S12/S12"
import S13 from "../components/S13/S13"
import S15 from "../components/S15/S15"
import Navbar from "../components/Navigate/Navigate"
import ScrollToTopButton from "../components/ScrollToTopButton/ScrollToTopButton"
import WhatsAppButton from '../components//WhatsAppButton/WhatsAppButton';
import Footer from "../components/Footer/Footer"
import { useEffect } from "react"
import { useAppSelector } from "../redux/hooks"
import { RootState } from "@reduxjs/toolkit/query"



function initializeCart() {
    console.log('>>> initialisation');
    if (!localStorage.getItem('cart')) {
        localStorage.setItem('cart', JSON.stringify([]));
    }
  }

export default function Home() {

    useEffect(() => {
          initializeCart();
      }, []);
    
    return (
        <>  
       
        <Navbar />
        <WhatsAppButton />
        <ScrollToTopButton />
        <S1/>
        <S2/>
        <Slide3/>
        <S4/>
        <S5/>
        <Slide6/>
        <Slide7/>
        <S8/>
        <S9/>
        <S10/>
        <S11/>
        <S12/>
        <S13/>
        <S15/>  
        < Footer/> 
       
        </>
    )
  }