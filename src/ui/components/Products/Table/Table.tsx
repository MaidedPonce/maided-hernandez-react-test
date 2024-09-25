import React, { useEffect, useMemo, useState } from 'react'
import { getProducts } from 'services/products/products.services'
import { Product } from 'store/products/product.type'
import styles from './Table.module.scss'
import { useProductsStore } from 'store/products/products.store'
import { FaEye, FaSort } from 'react-icons/fa6'
import Navigation from './Navigation/Navigation'
import { useNavigate } from 'react-router-dom'

const Table: React.FC = () => {
  const dataStored = useProductsStore((state) => state.products)
  const [page, setPage] = useState(0)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [newData, setData] = useState<Product[][]>(dataStored || [])
  const [hasFetched, setHasFetched] = useState(false)
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Product
    direction: 'asc' | 'desc'
  }>({ key: 'title', direction: 'asc' })
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(true)
  const setProducts = useProductsStore((state) => state.setProducts)
  const setProduct = useProductsStore((state) => state.setProduct)

  const navigate = useNavigate()
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
    return prod?.title?.toLocaleLowerCase().includes(result.toLocaleLowerCase())
  })
  const requestSort = (key: keyof Product) => {
    let direction: 'asc' | 'desc' = 'asc'
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc'
    }
    setSortConfig({ key, direction })
  }

  const sortData = (data: Product[]) => {
    const allPages = 5
    const chunks = Array.from(
      { length: Math.ceil(data.length / allPages) },
      (v, i) => data.slice(i * allPages, i * allPages + allPages)
    )
    setData(chunks)
    setProducts(chunks)
    setLoading(false)
  }
  useEffect(() => {
    if (newData.length !== 0) {
      return sortData(newData.flat())
    }
    const controller = new AbortController()
    const { signal } = controller

    if (hasFetched) return
    setLoading(true)
    getProducts({ signal })
      .then((data) => {
        if (!signal.aborted) {
          sortData(data)
          setHasFetched(true)
          setLoading(false)
        }
      })
      .catch((error) => {
        if (!signal.aborted) {
          console.error(error)
        }
      })
      .finally(() => {
        setLoading(false)
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
  }, [currentIndex, page, newData, getResults])

  const nextoffset = () => {
    if (newData.length === 0) return
    if (pagination?.length >= 5 && currentIndex === 4) setPage(page + 1)
    if (pagination?.length < 5) {
      return setCurrentIndex((prev) => prev + 1)
    } else {
      setCurrentIndex((prev) => prev + 1)
      // setPage(page + 1)
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
    setCurrentIndex(pageNum)
    return newData[pageNum]
  }
  return (
    <section className={`${styles.tableContainer} subContainer`}>
      {newData.length === 0 && !loading ? (
        <p>There is not available data</p>
      ) : loading ? (
        'Loading data....'
      ) : (
        <>
          <input
            type='text'
            value={result}
            className={`field ${styles.input}`}
            placeholder='Search...'
            onChange={(e) => setResult(e.target.value)}
          />
          <table className={styles.table}>
            <thead className='text-xs text-gray-700 uppercase '>
              <tr>
                <th
                  scope='col'
                  className={styles.head}
                >
                  Image
                </th>
                <th
                  scope='col'
                  onClick={() => requestSort('title')}
                >
                  <div className={styles.head}>
                    Title
                    <FaSort />
                  </div>
                </th>
                <th
                  scope='col'
                  onClick={() => requestSort('price')}
                >
                  <div className={styles.head}>
                    Price
                    <FaSort />
                  </div>
                </th>
                <th
                  scope='col'
                  onClick={() => requestSort('category')}
                >
                  <div className={styles.head}>
                    Category
                    <FaSort />
                  </div>
                </th>
                <th scope='col'>See more...</th>
              </tr>
            </thead>
            <tbody>
              {getResults.length === 0 && !loading ? (
                <p>There is not available data</p>
              ) : (
                getResults?.map((product: Product) => (
                  <tr key={product.id}>
                    <td>
                      <figure className={styles.productImage}>
                        <img
                          src={product.image}
                          alt={product.description}
                          className={styles.image}
                        />
                      </figure>
                    </td>
                    <td>
                      <p className={styles.cell}>{product.title}</p>
                    </td>
                    <td>
                      <p className={styles.cell}>{product.price}</p>
                    </td>
                    <td>
                      <p className={styles.cell}>{product.category}</p>
                    </td>
                    <td
                      onClick={() => {
                        setProduct(product)
                        navigate(`/products/id=${product.id}`)
                      }}
                    >
                      <FaEye className={styles.eye} />
                    </td>
                  </tr>
                ))
              )}
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
      )}
    </section>
  )
}

export default Table
