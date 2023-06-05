import { FaRegEdit, FaTrashAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import axios from 'axios'
import { useState } from 'react'
import ModalAddBuku from '../components/ModalAddBuku'
import ModalAddPenerbit from "./ModalAddPenerbit";


interface TableTempProps {
  headers: string[]
  data: any[],
  tipe: string,
  action?: boolean,
  refetch: () => Promise<void>
}

const TableTemp = ({ headers, data, tipe, action, refetch } : TableTempProps) => {
  const url = tipe == 'buku' ? 'http://localhost:3000/api/buku' : 'http://localhost:3000/api/penerbit'
  const [selectedItem, setSelectedItem] = useState<any>({})
  const [open, setOpen] = useState<boolean>(false)
  const [openPenerbit, setOpenPenerbit] = useState<boolean>(false)

  const deleteData = async (id: string) => {
    try {
      await axios.delete(url+`/${id}`)
      toast.info('delete success', {
        position: "bottom-center",
        autoClose: 1500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      refetch()
    } catch (error) {
      toast('Gagal delete data', {
        type: 'error',
      });
    }
  }

  const editData = (item: any) => {
    if(tipe == 'buku'){
      setSelectedItem({
        id: item.id,
        kategori: item.kategori,
        nama: item.nama,
        harga: item.harga,
        stok: item.stok,
        id_penerbit: item.penerbit.id
      })
      if(selectedItem){
        setOpen(true)
      }
    } else {
      setSelectedItem(item)
      setOpenPenerbit(true)
    }
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              {headers?.map((v) => {
                return (
                  <th className="py-4 px-4 font-medium text-black dark:text-white">
                    {v}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {
              tipe == 'buku' ? data.map((v)=> (
                (
                  <tr>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <p className=" text-black dark:text-white">{v.id}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{v.kategori}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {v.nama}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {v.harga}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  {v.stok}
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{v.penerbit.nama}</p>
                </td>
                {
                  action && (
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary" onClick={() => editData(v)}>
                          <FaRegEdit />
                        </button>
                        <button className="hover:text-primary" onClick={() => deleteData(v.id)}>
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  )
                }
              </tr>
                )
              )) :
              data.map((v)=> (
                (
                  <tr>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <p className=" text-black dark:text-white">{v.id}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {v.nama}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{v.alamat}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{v.kota}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{v.telpon}</p>
                </td>
                {
                  action && (
                    <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                      <div className="flex items-center space-x-3.5">
                        <button className="hover:text-primary" onClick={() => editData(v)}>
                          <FaRegEdit />
                        </button>
                        <button className="hover:text-primary" onClick={() => deleteData(v.id)}>
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  )
                }
              </tr>
                )
              ))
            }
          </tbody>
        </table>
      </div>
      <ModalAddBuku open={open} close={()=>setOpen(false)} refetch={refetch} isEdit item={selectedItem}  />
      <ModalAddPenerbit open={openPenerbit} close={()=>setOpenPenerbit(false)} refetch={refetch} isEdit item={selectedItem}  />
    </div>
  );
};

export default TableTemp;
