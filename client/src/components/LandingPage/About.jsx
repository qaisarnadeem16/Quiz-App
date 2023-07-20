import React from 'react'
import about from '../../Assets/kalvi-about-point-system 1.png'
const About = () => {
    return (
        <>
            <div className="w-full h-1/2 md:px-24  p-5 bg-[#FAFAFA]">
                <div className="flex items-center flex-wrap">
                    <div className="md:w-1/2 w-full flex flex-col gap-4 items-center">
                        <p className="font-semibold text-4xl text-black py-5">
                            About QuizBoz
                        </p>

                        <p className="text-lg text-[#00000083] md:w-[90%] text-center">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                            <br /><br />
                            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                        </p>
                    </div>

                    <div className="md:w-1/2 w-full flex md:pt-20 justify-center items-center py-4">
                        <img src={about} alt="" className='w-[300px]' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
