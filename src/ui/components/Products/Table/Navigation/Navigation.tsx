import React from 'react'

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
    <nav className='flex-wrap'>
      <ul className='flex-wrap gap-4'>
        <li>
          <button
            disabled={currentIndex === 0}
            onClick={prevoffset}
          >
            Previous
          </button>
        </li>
        {currentIndex > 5 && (
          <>
            <li>{currentIndex - 2}</li>
            <li>{currentIndex - 1}</li>
          </>
        )}
        {pagination?.map((i) => (
          <li key={i}>
            <button
              disabled={i === currentIndex}
              onClick={() => handleGoToPage(i)}
            >
              {i}
            </button>
          </li>
        ))}
        {currentIndex > 5 && (
          <>
            <li>{currentIndex + 1}</li>
            <li>{currentIndex + 2}</li>
          </>
        )}
        <li>
          <button
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
