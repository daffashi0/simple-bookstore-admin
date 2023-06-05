import React, {useState, useEffect} from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import { FaWindowClose, FaChevronDown } from "react-icons/fa";
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';
import { toast } from "react-toastify";


interface AddBukuProps {
    item?: any[] | undefined
    open: boolean
    close: any
    isEdit?: boolean
    refetch: () => Promise<void>
}

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
      children: React.ReactElement;
    },
    ref: React.Ref<unknown>,
  ) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

const ModalAddBuku = ({ item, open, close, isEdit, refetch }:AddBukuProps) => {
    const [listPenerbit, setListPenerbit] = useState<any[]>()
    const [formData, setFormData] = useState<any>(item ?? {})

    const submitHandler = () => {
        if(isEdit){
            doEdit()
        } else {
            doCreate()
        }
    }

    const doEdit = async () => {
        try {
            await axios.patch(`http://localhost:3000/api/buku/${formData.id}`, formData)
            toast.info('edit success', {
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
            close
        } catch (error) {
            toast.info('edit failed', {
                position: "bottom-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    const doCreate = async () => {
        try {
            await axios.post('http://localhost:3000/api/buku', formData)
            toast.info('add success', {
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
            close()
        } catch (error) {
            toast.info('edit failed', {
                position: "bottom-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                });
        }
    }

    const fetchPenerbit = async () => {
        const { data } = await axios.get('http://localhost:3000/api/penerbit')
        setListPenerbit(data.data)
      }

      useEffect(() => {
        fetchPenerbit()
      }, [])

      useEffect(()=>{
        if(item){
          setFormData(item)
        }
      }, [item])
    return (
        <Dialog
        open={open}
        onClose={close}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={close}
              aria-label="close"
            >
              <FaWindowClose />
            </IconButton>
            <h1 className='text-white font-bold ml-2'>{ isEdit ? 'EDIT' : 'ADD BUKU' }</h1>
          </Toolbar>
        </AppBar>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form action="#">
              <div className="p-6.5">
                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      ID <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.id}
                      placeholder="ID 5 Karakter"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      onChange={(e) => setFormData((prevState:any) => ({...prevState, id: e.target.value}) as any)}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Kategori <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.kategori}
                      placeholder="Kategori Buku"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      onChange={(e) => setFormData((prevState:any) => ({...prevState, kategori: e.target.value}) as any)}
                    />
                  </div>
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama Buku <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nama}
                    placeholder="Nama buku"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setFormData((prevState:any) => ({...prevState, nama: e.target.value}) as any)}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Harga <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.harga}
                    placeholder="harga dalam rupiah"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setFormData((prevState:any) => ({...prevState, harga: parseInt(e.target.value)}) as any)}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Stok <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="number"
                    value={formData.stok}
                    placeholder="stok yang tersedia"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setFormData((prevState:any) => ({...prevState, stok: parseInt(e.target.value)}) as any)}
                  />
                </div>

                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Penerbit <span className="text-meta-1">*</span>
                  </label>
                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                    value={formData.id_penerbit ?? ''}
                    onChange={(e) => {
                        setFormData((prevState:any) => ({...prevState, id_penerbit: e.target.value}) as any);
                        console.log(formData);
                      }}
                    className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                      <option value="">Pilih Penerbit</option>
                      {
                        listPenerbit && listPenerbit.map((v: any) => (
                            <option value={v.id}>{v.nama}</option>
                        ))
                      }
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <FaChevronDown/>
                    </span>
                  </div>
                </div>

                <button className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray" onClick={submitHandler}>
                  { isEdit ? 'EDIT' : 'ADD'}
                </button>
              </div>
            </form>
          </div>
        </Dialog>
    )
}

export default ModalAddBuku