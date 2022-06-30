import React from 'react'
import Head from 'next/head'

import Footer from './Footer'
import Navebar from './Navebar'

const Layout = ({children}) => {
  return (
    <div className='layout'>
<Head>
  <title>Next.js Store</title>
</Head>
<header>
<Navebar />

</header>
<main className='main-container'>
 {children}
</main>
<footer>
  <Footer/>
</footer>
    </div>
  )
}

export default Layout