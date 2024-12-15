'use client'
import React, { Suspense  } from "react"
import Carousel from 'react-material-ui-carousel';
import { Item} from "./components/carousel"

var items = [
    {
        header: "Elevating\n Women's Style",
        description: "Discover a world of fashion where quality, style, and affordability converge. Explore our curated collection of women's clothing, designed to empower you to express your unique sense of self.",
        bg: ['#DDDDDD', '#B24592','#F15F79'],
        imgUrl: "/in/images/hero1"
    },
    {
        header: "Elevating\n Women's Style",
        description: "Discover a world of fashion where quality, style, and affordability converge. Explore our curated collection of women's clothing, designed to empower you to express your unique sense of self.",
        bg: ['#DDDDDD'],
        imgUrl: "/in/images/hero2"
    },
    {
        header: "Bigg Billion\n Days",
        description: "Discover a world of fashion where quality, style, and affordability converge. Explore our curated collection of women's clothing, designed to empower you to express your unique sense of self.",
        bg: ['#DDDDDD'],
        imgUrl: "/in/images/hero3"
    },
]

const Hero = () => {

    return (
        <div className="h-[90vh] w-full relative bg-ui-bg-subtle">
            <Suspense fallback={<div>Loading...</div>}>
                <Carousel
                    animation="slide"
                    duration={400}
                    interval={3000}
                    stopAutoPlayOnHover={true}
                    swipe={true}
                    indicators={true}
                    cycleNavigation={true}
                    fullHeightHover={false}
                    className="absolute min-h-[90vh] inset-0 z-10 flex flex-col justify-center items-center text-center"
                >
                    {items.map((item, i) => <Item key={i} item={item} />)}
                </Carousel>
            </Suspense>
        </div>
    )
}

export default Hero
