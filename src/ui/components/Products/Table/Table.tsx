import React, { useEffect, useMemo, useState } from 'react'
import { getProducts } from 'services/products/products.services'
import { Product } from 'store/products/product.type'
import styles from './Table.module.scss'
import { useProductsStore } from 'store/products/products.store'
import { FaSort } from 'react-icons/fa6'
import Navigation from './Navigation/Navigation'

const Table = () => {
  const [page, setPage] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [newData, setData] = useState<Product[][]>([])
  const [hasFetched, setHasFetched] = useState(false)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product
    direction: 'asc' | 'desc'
  }>({ key: 'title', direction: 'asc' })
  const [result, setResult] = useState('')

  const setProducts = useProductsStore((state) => state.setProducts)

  const sortedData = useMemo(() => {
    if (!newData[currentIndex] || newData[currentIndex].length === 0) {
      return []
    }

    const sortableItems = [...newData[currentIndex]]

    sortableItems.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1
      }
      return 0
    })

    return sortableItems
  }, [newData, currentIndex, sortConfig])

  const getResults = sortedData?.filter((prod) => {
    return prod.title.toLocaleLowerCase().includes(result.toLocaleLowerCase())
  })
  const requestSort = (key: keyof Product) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  useEffect(() => {
    const controller = new AbortController()
    const { signal } = controller

    if (hasFetched) return

    getProducts({ signal })
      .then((data) => {
        if (!signal.aborted) {
          const allPages = 5
          const chunks = Array.from(
            { length: Math.ceil(data.length / allPages) },
            (v, i) => data.slice(i * allPages, i * allPages + allPages)
          )
          setData(chunks)
          setProducts(chunks)
          setHasFetched(true)
        }
      })
      .catch((error) => {
        if (!signal.aborted) {
          console.error(error)
        }
      })

    return () => {
      controller.abort()
    }
  }, [hasFetched])

  const pagination = useMemo(() => {
    const arr = newData.map((_, index) => index)
    const chunks = Array.from({ length: Math.ceil(arr.length / 5) }, (v, i) =>
      arr.slice(i * 5, i * 5 + 5)
    )
    return chunks[page]
  }, [currentIndex, page, newData])

  const nextoffset = () => {
    if (newData.length === 0) return
    if (pagination?.length < 5) {
      return setCurrentIndex((prev) => prev + 1)
    } else {
      setCurrentIndex(5)
      setPage(page + 1)
    }
  }
  const prevoffset = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1)
      if (page > 0) {
        setPage(page - 1)
      }
    }
  }
  const handleGoToPage = (pageNum: number) => {
    newData[pageNum]
    setCurrentIndex(pageNum)
  }
  return (
    <>
      <input
        type='text'
        value={result}
        onChange={(e) => setResult(e.target.value)}
      />
      <table className='w-full text-sm text-left rtl:text-right text-gray-500'>
        <thead className='text-xs text-gray-700 uppercase '>
          <tr>
            <th
              scope='col'
              className='px-6 py-3 bg-gray-50 text-center'
            >
              Image
            </th>
            <th
              scope='col'
              className='px-6 py-3 bg-gray-50 text-center'
              onClick={() => requestSort('title')}
            >
              Title
              <FaSort />
            </th>
            <th
              scope='col'
              className='px-6 py-3 bg-gray-50 text-center'
              onClick={() => requestSort('price')}
            >
              Price
              <FaSort />
            </th>
            <th
              scope='col'
              className='px-6 py-3 bg-gray-50 text-center'
              onClick={() => requestSort('category')}
            >
              Category
              <FaSort />
            </th>
          </tr>
        </thead>
        <tbody className='border-b border-gray-200'>
          {getResults?.map((product: Product) => (
            <tr
              key={product.id}
              className='px-6 py-4 h-12 text-center font-medium text-gray-900 whitespace-nowrap bg-gray-50'
            >
              <td>
                <figure className={styles.productImage}>
                  <img
                    src={product.image}
                    alt={product.description}
                    className={styles.image}
                  />
                </figure>
              </td>
              <td>{product.title}</td>
              <td>{product.price}</td>
              <td>{product.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Navigation
        currentIndex={currentIndex}
        prevoffset={prevoffset}
        nextoffset={nextoffset}
        pagination={pagination}
        handleGoToPage={handleGoToPage}
      />
    </>
  )
}

export default Table
