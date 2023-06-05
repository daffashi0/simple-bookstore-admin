import Breadcrumb from '../components/Breadcrumb';
import TableTemp from '../components/TableTemp';
import DefaultLayout from '../layout/DefaultLayout';
import {useState, useEffect} from 'react'
import axios from 'axios';
import { FaSearch, FaPlus } from "react-icons/fa";

const AdminPenerbit = () => {
  const [query, setQuery] = useState<any>()
  const [listPenerbit, setListPenerbit] = useState<any>()

  const penerbitHeaders = [
    'ID Penerbit',
    'Nama Penerbit',
    'Alamat',
    'Kota',
    'Telpon',
    'Actions'
  ]

  const getPenerbit = async () => {
    const { data } = await axios.get(`http://localhost:3000/api/penerbit?nama=${query}`)
    setListPenerbit(data.data)
  }

  const fetchPenerbit = async () => {
    const { data } = await axios.get('http://localhost:3000/api/penerbit')
    setListPenerbit(data.data)
  }

  useEffect(() => {
    fetchPenerbit()
  }, [])
  return (
    <DefaultLayout>
      <Breadcrumb pageName='List Penerbit' />

      <div className="flex flex-col gap-10">
        <button className="flex flex-row self-end justify-center items-center gap-2 p-2 px-4 bg-meta-4">
            ADD <FaPlus/>
        </button>
        <div className="relative bg-white p-3">
          <button className="absolute top-1/2 left-2 -translate-y-1/2" onClick={()=>getPenerbit()}>
            <FaSearch />
          </button>
          <input
            type="text"
            placeholder="Search nama buku..."
            className="w-full bg-transparent pr-4 pl-9 focus:outline-none"
            onChange={(e) => setQuery(e.target.value)}/>
        </div>
        {
          listPenerbit && <TableTemp headers={penerbitHeaders} data={listPenerbit} tipe='penerbit' action refetch={fetchPenerbit} />
        }
      </div>
    </DefaultLayout>
  );
};

export default AdminPenerbit;
