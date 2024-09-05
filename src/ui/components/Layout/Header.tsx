import React from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from 'store/user/user.store'

const Header: React.FC = () => {
  const setIsLogged = useUserStore((store) => store.setIsLogged)
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to='/users'>My profile</Link>
          </li>
          <li>
            <Link to='/products/create'>Create product</Link>
          </li>
        </ul>
      </nav>
      <button
        type='button'
        onClick={() => setIsLogged(false)}
      >
        Logout
      </button>
    </header>
  )
}

export default Header
