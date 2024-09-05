import React from 'react'
import styles from '../Table.module.scss'

interface Navigation {
  currentIndex: number
  prevoffset: () => void
  nextoffset: () => void
  pagination: number[]
  handleGoToPage: (pageNum: number) => void
}

const Navigation = ({
  currentIndex,
  prevoffset,
  nextoffset,
  pagination,
  handleGoToPage,
}: Navigation) => {
  return (
    <nav>
      <ul className={styles.nav}>
        <li>
          <button
            className='button'
            disabled={currentIndex === 0}
            onClick={prevoffset}
          >
            Previous
          </button>
        </li>
        {currentIndex >= 5 && (
          <>
            <li>{currentIndex - 2}</li>
            <li>{currentIndex - 1}</li>
          </>
        )}
        {pagination?.map((i) => (
          <li key={i}>
            <button
              className={i === currentIndex ? 'button darkButton' : 'button'}
              disabled={i === currentIndex}
              onClick={() => handleGoToPage(i)}
            >
              {i}
            </button>
          </li>
        ))}
        {currentIndex >= 5 && (
          <>
            <li>{currentIndex + 1}</li>
            <li>{currentIndex + 2}</li>
          </>
        )}
        <li>
          <button
            className='button'
            disabled={pagination?.length === currentIndex}
            onClick={nextoffset}
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
