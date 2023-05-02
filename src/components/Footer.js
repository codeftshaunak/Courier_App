import React from 'react'

const Footer = () => {
    return (
        <div>
            <footer className="bg-gray-800 text-gray-300 py-8">
                <div className="container mx-auto flex flex-wrap justify-between">
                    <div className="w-full md:w-1/4 px-4">
                        <h4 className="text-lg font-bold mb-4">Company Name</h4>
                        <p className="mb-4">1234 Main St</p>
                        <p className="mb-4">Anytown, USA 12345</p>
                        <p className="mb-4">(123) 456-7890</p>
                        <p>info@companyname.com</p>
                    </div>
                    <div className="w-full md:w-1/4 px-4">
                        <h4 className="text-lg font-bold mb-4">Links</h4>
                        <ul>
                            <li className="mb-2"><a href="#">Home</a></li>
                            <li className="mb-2"><a href="#">About Us</a></li>
                            <li className="mb-2"><a href="#">Services</a></li>
                            <li className="mb-2"><a href="#">Contact Us</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4 px-4">
                        <h4 className="text-lg font-bold mb-4">Social Media</h4>
                        <ul>
                            <li className="mb-2"><a href="#">Facebook</a></li>
                            <li className="mb-2"><a href="#">Twitter</a></li>
                            <li className="mb-2"><a href="#">Instagram</a></li>
                            <li className="mb-2"><a href="#">LinkedIn</a></li>
                        </ul>
                    </div>
                    <div className="w-full md:w-1/4 px-4">
                        <h4 className="text-lg font-bold mb-4">Subscribe to Our Newsletter</h4>
                        <form className="mb-4">
                            <div className="flex flex-wrap">
                                <div className="w-full">
                                    <input className="bg-gray-700 appearance-none border-2 border-gray-700 rounded w-full py-2 px-4 text-gray-300 leading-tight focus:outline-none focus:bg-gray-600 focus:border-gray-500" type="text" placeholder="Email Address" />
                                </div>
                                <div className="w-full mt-2">
                                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                        Subscribe
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="container mx-auto mt-8 text-center">
                    <p>© 2023 Company Name. All Rights Reserved.</p>
                </div>
            </footer>

        </div>
    )
}

export default Footer
