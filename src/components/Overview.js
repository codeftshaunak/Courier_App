import React from 'react';

const Overview = () => {
    return (
        <section className="comp-color body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-wrap w-full mb-20">
                    <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
                        <br />
                        <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-white">
                            Overview of Our Courier Company
                        </h1>
                        <div className="h-1 w-20 bg-indigo-500 rounded"></div>
                    </div>
                    <br />
                    <p className="lg:w-1/2 w-full leading-relaxed ">
                        We are a reliable and efficient courier company that offers a wide range of services to
                        meet your shipping needs. Our services include same-day delivery, next-day delivery,
                        and international shipping. We also offer tracking services, so you can keep an eye on
                        your package every step of the way. Our team of experts is dedicated to ensuring that
                        your package arrives at its destination safely and on time.
                    </p>
                </div>
                <div className="flex flex-wrap -m-4">
                    <div className="xl:w-1/3 md:w-1/2 p-4">
                        <div className="border border-gray-300 p-6 rounded-lg">
                            <div className="w-10 h-10 inline-flex items-center justify-center rounded-full bg-gray-100 text-gray-500 mb-4">
                                <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-6 h-6" viewBox="0 0 24 24">
                                    <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                                </svg>
                            </div>
                            <h2 className="text-lg  font-medium title-font mb-2">Fast Delivery</h2>
                            <p className="leading-relaxed text-base">
                                We offer same-day and next-day delivery services to get your package where it needs to
                                go as quickly as possible.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Overview;
