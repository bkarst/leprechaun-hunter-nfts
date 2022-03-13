import React from 'react';
import SliderCarousel from '../components/SliderCarouselsingle';
import FeatureBox from '../components/FeatureBox';
import CarouselCollection from '../components/CarouselCollection';
import ColumnNew from '../components/ColumnNew';
import AuthorList from '../components/authorList';
import Footer from '../components/footer';
import { createGlobalStyle } from 'styled-components';
import Reveal from 'react-awesome-reveal';
import { keyframes } from "@emotion/react";

const fadeInUp = keyframes`
  0% {
    opacity: 0;
    -webkit-transform: translateY(40px);
    transform: translateY(40px);
  }
  100% {
    opacity: 1;
    -webkit-transform: translateY(0);
    transform: translateY(0);
  }
`;

const GlobalStyles = createGlobalStyle`
  header#myHeader.navbar.sticky.white {
    background: #212428;
    border-bottom: 0;
    box-shadow: 0 4px 20px 0 rgba(10,10,10, .8);
  }
  header#myHeader.navbar .search #quick_search{
    color: #fff;
    background: rgba(255, 255, 255, .1);
  }
  header#myHeader.navbar.white .btn, .navbar.white a, .navbar.sticky.white a{
    color: #fff;
  }
  header#myHeader .dropdown-toggle::after{
    color: #fff;
  }
  header#myHeader .logo .d-block{
    display: none !important;
  }
  header#myHeader .logo .d-none{
    display: none !important;
  }
  header#myHeader .logo .d-3{
    display: block !important;
  }
  .jumbotron.no-bg{
    background: center bottom;
    background-size: cover;
    height: 100vh;
  }
  footer.footer-light .subfooter span img.d-1{
    display: none !important;
  }
  footer.footer-light .subfooter span img.d-3{
    display: inline-block !important;
  }
  .de_countdown{
    right: 10px;
    color: #fff;
  }
  .author_list_pp{
    margin-left:0;
  }
  footer.footer-light .subfooter{
    border-top: 1px solid rgba(255,255,255,.1);
  }
`;

const homethree= () => (
  <div>
  <GlobalStyles />
      <section className="jumbotron no-bg" style={{backgroundImage: `url(${'./img/background/forest.png'})`}}>
        <div className='container'>
          <div className='row align-items-center'>
            <div className='col-lg-6'>
                <div className="spacer-single"></div>
                <Reveal className='onStep' keyframes={fadeInUp} delay={0} duration={600} triggerOnce>
                <h6 className=""><span className="text-uppercase color">Leprechaun Hunter NFTs</span></h6>
                </Reveal>
                <div className="spacer-10"></div>
                <Reveal className='onStep' keyframes={fadeInUp} delay={300} duration={600} triggerOnce>
                <h2 className="">Leprechauns chase rainbows. You collect their gold.</h2>
                </Reveal>
                <Reveal className='onStep' keyframes={fadeInUp} delay={600} duration={600} triggerOnce>
                <p className=" lead">
                  With your leprechaun hunter NFT, you will capture one leprechaun a day. You can either collect tax from him, let him go to collect more next time, or roll the dice and try to take all his gold. 
                </p>
                </Reveal>
                <div className="spacer-10"></div>
                <Reveal className='onStep' keyframes={fadeInUp} delay={800} duration={900} triggerOnce>
                <span onClick={()=> window.open("/#", "_self")} className="btn-main lead">Get My Leprechaun Hunter NFT</span>
                <div className="mb-sm-30"></div>
                </Reveal>
                <div className="spacer-double"></div>
            </div>
             <div className='col-lg-6 px-0'>
              <img src="./img/warrior.png" style={{borderRadius: 26}}className="lazy img-fluid" alt=""/>
             </div>
          </div>
        </div>
      </section>

    <Footer />

  </div>
);
export default homethree;