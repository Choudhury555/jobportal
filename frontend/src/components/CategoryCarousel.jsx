import React from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'

const categoty = ["Frontend Developer", "Backend Developer", "Data Science", "FullStack Developer"]

const CategoryCarousel = () => {
    return (
        <div>
            <Carousel className="w-full max-w-xl mx-auto my-20">
                <CarouselContent>
                    {
                        categoty.map((item, index) => (
                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3"><Button variant="outline" className="rounded-full">{item}</Button></CarouselItem>
                        ))
                    }
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    )
}

export default CategoryCarousel