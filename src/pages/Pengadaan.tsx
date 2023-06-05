import Breadcrumb from '../components/Breadcrumb';
import TableTemp from '../components/TableTemp';
import DefaultLayout from '../layout/DefaultLayout';
import {useState, useEffect} from 'react'
import axios from 'axios';
import { FaSearch } from "react-icons/fa";

const Pengadaan = () => {
  const [query, setQuery] = useState<any>()
  const [listBuku, setListBuku] = useState<any>()

  const bookHeaders = [
    'ID Buku',
    'Kategori',
    'Nama Buku',
    'Harga',
    'Stok',
    'Penerbit'
  ]

  const getBuku = async () => {
    const { data } = await axios.get(`http://localhost:3000/api/buku?order=stok&nama=${query}`)
    setListBuku(data.data)
  }

  useEffect(() => {
    const fetchBuku = async () => {
      const { data } = await axios.get('http://localhost:3000/api/buku?order=stok')
      setListBuku(data.data)
    }

    fetchBuku()
  }, [])
  return (
    <DefaultLayout>
      <Breadcrumb pageName='Pengadaan' />

      <div className="flex flex-col gap-10">
        <div className="relative bg-white p-3">
          <button className="absolute top-1/2 left-2 -translate-y-1/2" onClick={()=>getBuku()}>
            <FaSearch />
          </button>
          <input
            type="text"
            placeholder="Search nama buku..."
            className="w-full bg-transparent pr-4 pl-9 focus:outline-none"
            onChange={(e) => setQuery(e.target.value)}/>
        </div>
        {
          listBuku && <TableTemp headers={bookHeaders} data={listBuku} tipe='buku' />
        }
      </div>
    </DefaultLayout>
  );
};

export default Pengadaan;
