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

const ModalAddPenerbit = ({ item, open, close, isEdit, refetch }:AddBukuProps) => {
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
            await axios.patch(`http://localhost:3000/api/penerbit/${formData.id}`, formData)
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
            await axios.post('http://localhost:3000/api/penerbit', formData)
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
            <h1 className='text-white font-bold ml-2'>{ isEdit ? 'EDIT' : 'ADD PENERBIT' }</h1>
          </Toolbar>
        </AppBar>
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <form action="#">
              <div className="p-6.5">
              <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    ID <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.id}
                    placeholder="ID 4 karakter"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setFormData((prevState:any) => ({...prevState, id: e.target.value}) as any)}
                  />
                </div>
                <div className="mb-4.5">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nama penerbit <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.nama}
                    placeholder="Nama buku"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setFormData((prevState:any) => ({...prevState, nama: e.target.value}) as any)}
                  />
                </div>

                <div className="mb-6">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Alamat
                  </label>
                  <textarea
                    rows={3}
                    value={formData.alamat}
                    placeholder="Alamat penerbit"
                    className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                    onChange={(e) => setFormData((prevState:any) => ({...prevState, alamat: e.target.value}) as any)}
                  ></textarea>
                </div>

                <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Kota <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.kota}
                      placeholder="Kota penerbit"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      onChange={(e) => setFormData((prevState:any) => ({...prevState, kota: e.target.value}) as any)}
                    />
                  </div>

                  <div className="w-full xl:w-1/2">
                    <label className="mb-2.5 block text-black dark:text-white">
                      Telpon <span className="text-meta-1">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.telpon}
                      placeholder="No. Telp penerbit"
                      className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                      onChange={(e) => setFormData((prevState:any) => ({...prevState, telpon: e.target.value}) as any)}
                    />
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

export default ModalAddPenerbit