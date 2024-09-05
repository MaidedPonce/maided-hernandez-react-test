import React from 'react'
import { Link } from 'react-router-dom'
import { useUserStore } from 'store/user/user.store'
import styles from './Header.module.scss'

const Header: React.FC = () => {
  const setIsLogged = useUserStore((store) => store.setIsLogged)
  return (
    <header className={styles.header}>
      <nav>
        <ul className={styles.items}>
          <li>
            <Link
              className={styles.link}
              to='/products'
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              className={styles.link}
              to='/users'
            >
              My profile
            </Link>
          </li>
          <li>
            <Link
              className={styles.link}
              to='/products/create'
            >
              Create product
            </Link>
          </li>
        </ul>
      </nav>
      <button
        type='button'
        className='button'
        onClick={() => setIsLogged(false)}
      >
        Logout
      </button>
    </header>
  )
}

export default Header
