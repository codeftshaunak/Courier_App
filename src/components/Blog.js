import Link from 'next/link';
import React from 'react'
import LayoutComponent from '../layout/LayoutComponent';
import HeroBlog from './HeroBlog';

const Blog = () => {
    const id = 5;
    return (
        <LayoutComponent>
            <HeroBlog />
        </LayoutComponent>
    )
}

export default Blog;
