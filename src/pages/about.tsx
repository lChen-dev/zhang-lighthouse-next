import React from 'react';

import { Footer, Header } from '@components/shared';
import About from '@components/about/About';

import '../../public/static/assets/css/style.css';

const AboutPage: React.FC = () => (
  <>
    <Header />
    <About />
    <Footer />
  </>
);

export default AboutPage;
