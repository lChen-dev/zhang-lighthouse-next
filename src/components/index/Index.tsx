import React from 'react';

import Hero from '@components/index/Hero/Hero';
import { Header, Footer } from '@components/shared';

import Outro from '@components/shared/Outro/Outro';
import TrustPilot from '@components/shared/TrustPilot/TrustPilot';
import Process from './Process/Process';
import Renting from './Renting/Renting';
import Cashback from './Cashback/Cashback';
import CitySlider from './CitySlider/CitySlider';
import BulletPoints from './BulletPoints/BulletPoints';

import './css/style.css';
import 'react-alice-carousel/lib/alice-carousel.css';

const IndexPage: React.FC = () => (
  <>
    <link href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css" rel="stylesheet" />
    <Header />
    <Hero />
    <Process />
    <Renting />
    <Cashback />
    <TrustPilot />
    {/* <CitySlider /> */}
    <BulletPoints />
    <Outro />
    <Footer />
  </>
);

export default IndexPage;
