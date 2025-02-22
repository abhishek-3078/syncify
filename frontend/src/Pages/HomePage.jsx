import React from 'react'

const HomePage = () => {
  return (
    <>

    <div className='bg-black text-white h-[64px] flex items-center justify-between px-10'>
        <h1 className='text-2xl font-bold'>Syncify</h1>
        <div className='flex items-center gap-4'>
            <button className='bg-white text-black px-4 py-2 rounded-md'>Login</button>
            <button className='bg-white text-black px-4 py-2 rounded-md'>Register</button>
        </div>
    </div>
    </>
  )
}

export default HomePage