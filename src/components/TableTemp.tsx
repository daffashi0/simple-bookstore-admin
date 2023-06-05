import { FaRegEdit, FaTrashAlt } from "react-icons/fa";


interface TableTempProps {
  headers: string[]
  data: any[],
  tipe: string,
  action?: boolean
}

const TableTemp = ({ headers, data, tipe, action } : TableTempProps) => {
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
                        <button className="hover:text-primary">
                          <FaRegEdit />
                        </button>
                        <button className="hover:text-primary">
                          <FaTrashAlt />
                        </button>
                      </div>
                    </td>
                  )
                }
              </tr>
                )
              )) :
              (
                <tr>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <p className=" text-black dark:text-white">id</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">kategori</p>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                <h5 className="font-medium text-black dark:text-white">
                  nama
                </h5>
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                0
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                0
              </td>
              <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                <p className="text-black dark:text-white">penerbit</p>
              </td>
              {
                action && (
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex items-center space-x-3.5">
                      <button className="hover:text-primary">
                        <FaRegEdit />
                      </button>
                      <button className="hover:text-primary">
                        <FaTrashAlt />
                      </button>
                    </div>
                  </td>
                )
              }
            </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableTemp;
