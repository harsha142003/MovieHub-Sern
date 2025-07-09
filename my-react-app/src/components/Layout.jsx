import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='min-h-screen'>
      <div>
        <main className={`transform transition-transform duration-500`} style={{ backgroundColor: '#ffffff' }}>
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout