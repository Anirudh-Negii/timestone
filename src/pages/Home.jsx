import React from 'react'
import BannerHome from '../components/BannerHome'
import CategoriesHome from '../components/CategoriesHome'
import ComingSoonWatch from '../components/ComingSoonWatch'
import LimitedTime from '../components/LimitedTime'
import Testimonials from '../components/Testimonials'

const Home = () => {
  return (
    <div>
        <BannerHome />
        <CategoriesHome />
        <ComingSoonWatch />
        <LimitedTime />
        <Testimonials />
    </div>
  )
}

export default Home
