import React from 'react'
import { FaFaceSadTear } from 'react-icons/fa6'

const NotFound: React.FC = () => {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        alignItems: 'center',
      }}
      className='container'
    >
      <h1 style={{ fontSize: '5rem', margin: 0 }}>404</h1>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <p>Not Found</p>
        <FaFaceSadTear />
      </div>
    </section>
  )
}

export default NotFound
