import React from 'react'
import Header from '../components/header/Header'

const MainLayout = ({ children }: any) => {
  return (
    <>
        <Header />
        {children}
    </>
  )
}

export default MainLayout