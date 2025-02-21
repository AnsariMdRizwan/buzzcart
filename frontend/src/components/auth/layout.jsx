import React from 'react'
import { Outlet } from 'react-router-dom'
import b1 from '../../../src/assets/main_image.png'
import LoginPhoto from "../../../src/assets/login_photo.jpg"

const Authlayout = () => {
    return (
        <>
            <div className="flex min-h-screen w-full">
                {/* Left Section with Background Image */}
                <div
                    className="hidden lg:flex items-center justify-center w-1/2 px-12"
                    style={{
                        backgroundImage: `url(${b1})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                >
                   
                </div>

                {/* Right Section */}
                <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 relative">
                    {/* Background with reduced opacity */}
                    <div
                        className="absolute inset-0 bg-violet-200"
                        // style={{
                        //     backgroundImage: `url(${LoginPhoto})`,
                        //     backgroundSize: "cover",
                        //     backgroundPosition: "center",
                        //     opacity: 0.6,

                        // }}
                    ></div>
                    {/* Content */}


                    <Outlet />
                </div>
            </div>
        </>
    )
}

export default Authlayout
