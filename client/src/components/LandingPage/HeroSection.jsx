import React from 'react'
import Navbar from './Navbar'
import hero from '../../Assets/hero.PNG'

const HeroSection = () => {
    return (
        <>
            <div className="w-full h-[80%] bg-[#FEF4E6] md:px-48 px-2 py-4 md:py-12">
                <Navbar />


                <div className="flex flex-wrap flex-col-reverse md:flex-row items-center px-3">
                    <div className="md:w-1/2 w-full flex flex-col ">
                        <h1 className="font-black text-gray-600 md:text-5xl text-3xl leading-12 py-4">
                            Easy and intuitive <br /> online testing
                        </h1>

                        <h1 className="font-medium text-gray-700 md:text-xl text-lg py-4">
                            Evaluo is a cloud-testing platform that supports <br />
                            online creation and delivery of features-rich tests
                        </h1>


                        <div className="py-4 flex gap-5">
                            <button className="rounded text-white md:text-lg text-md font-semibold bg-[#F89820] md:px-8 px-5 py-3">Get Started</button>
                            <button className="rounded text-black text-lg font-medium bg-white md:px-8 px-5 py-3">Request a demo</button>
                        </div>
                    </div>
                    <div className="md:w-1/2 w-full flex justify-center">
                        <img src={hero} alt="" />
                    </div>
                </div>

            </div>
        </>
    )
}

export default HeroSection
