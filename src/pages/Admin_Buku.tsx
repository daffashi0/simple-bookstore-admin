import Breadcrumb from '../components/Breadcrumb';
import TableTemp from '../components/TableTemp';
import DefaultLayout from '../layout/DefaultLayout';
import {useState, useEffect} from 'react'
import axios from 'axios';
import { FaSearch, FaPlus } from "react-icons/fa";
import ModalAddBuku from '../components/ModalAddBuku'

const AdminBuku = () => {
  const [query, setQuery] = useState<any>()
  const [listBuku, setListBuku] = useState<any>()
  const [open, setOpen] = useState<boolean>(false)

  const bookHeaders = [
    'ID Buku',
    'Kategori',
    'Nama Buku',
    'Harga',
    'Stok',
    'Penerbit',
    'Actions'
  ]

  const getBuku = async () => {
    const { data } = await axios.get(`http://localhost:3000/api/buku?nama=${query}`)
    setListBuku(data.data)
  }

  const fetchBuku = async () => {
    const { data } = await axios.get('http://localhost:3000/api/buku')
    setListBuku(data.data)
  }

  useEffect(() => {
    fetchBuku()
  }, [])
  return (
    <DefaultLayout>
      <Breadcrumb pageName='List Buku' />

      <div className="flex flex-col gap-10">
        <button
        onClick={()=>setOpen(true)}
        className="flex flex-row self-end justify-center items-center gap-2 p-2 px-4 bg-meta-4">
            ADD <FaPlus/>
        </button>
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
        <ModalAddBuku open={open} close={()=>setOpen(false)} refetch={fetchBuku}  />
        {
          listBuku && <TableTemp headers={bookHeaders} data={listBuku} tipe='buku' action refetch={fetchBuku} />
        }
      </div>
    </DefaultLayout>
  );
};

export default AdminBuku;
