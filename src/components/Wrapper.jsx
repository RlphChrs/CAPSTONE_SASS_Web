import React from 'react'

const Wrapper = ( { children }) => {
  return (
    <section className='bg-gradient-to-r from-blue-900 to-gray-900 text-white'>
        <div className='max-w-[1250px] mx-auto'>
            { children}
        </div>
    </section>
  )
}

export default Wrapper