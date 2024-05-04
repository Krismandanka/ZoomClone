import React,{ReactNode} from 'react'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'

const HomeLayout = ({children}:{children:ReactNode}) => {
  return (
    <div className='relative'>
        <Navbar />
        <div className='flex'>
            
            <Sidebar />
            <section className='flex flex-col flex-1 min-h-screen px-6 pb-6 pt-28 max-md:pb-14 sm:px-14'>
                <div className='w-full'>
                {children}

                </div>
            </section>

        </div>

    </div>
  )
}

export default HomeLayout