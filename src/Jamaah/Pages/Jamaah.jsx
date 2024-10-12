import { useState, useEffect } from "react";
import Papa from "papaparse";
import CardLg12 from "../../Shared/UIElements/CardLg12";
import Pagination from "../../Shared/UIElements/Pagination";
import Modal from "../../Shared/Modal/Modal";
import JamaahTable from "./JamaahTable";
import FormJamaah from "./FormJamaah";

const DUMMY_DATA = [
  {
    nama: "Mark Evan",
    nik: "231231312132",
    tempatLahir: "Kalifornia",
    tanggalLahir: "22-mei-1232",
    alamat: "jl.bedsa 21",
    asal: "gresik, jawa timur",
    jenisKelamin: "laki-laki",
    noPaspor: "212222",
    masaBerlakuPaspor: "2043",
    ktp: "111",
    kk: "222",
    foto: "333",
    paspor: "444",
  },
  {
    nama: "Mark Evan",
    nik: "231231312132",
    tempatLahir: "Kalifornia",
    tanggalLahir: "22-mei-1232",
    alamat: "jl.bedsa 21",
    asal: "gresik, jawa timur",
    jenisKelamin: "laki-laki",
    noPaspor: "212222",
    masaBerlakuPaspor: "2043",
    ktp: "111",
    kk: "222",
    foto: "333",
    paspor: "444",
  },
  {
    nama: "Mark Evan",
    nik: "231231312132",
    tempatLahir: "Kalifornia",
    tanggalLahir: "22-mei-1232",
    alamat: "jl.bedsa 21",
    asal: "gresik, jawa timur",
    jenisKelamin: "laki-laki",
    noPaspor: "212222",
    masaBerlakuPaspor: "2043",
    ktp: "111",
    kk: "222",
    foto: "333",
    paspor: "444",
  },
  {
    nama: "Mark Evan",
    nik: "231231312132",
    tempatLahir: "Kalifornia",
    tanggalLahir: "22-mei-1232",
    alamat: "jl.bedsa 21",
    asal: "gresik, jawa timur",
    jenisKelamin: "laki-laki",
    noPaspor: "212222",
    masaBerlakuPaspor: "2043",
    ktp: "111",
    kk: "222",
    foto: "333",
    paspor: "444",
  },
  {
    nama: "Mark Evan",
    nik: "231231312132",
    tempatLahir: "Kalifornia",
    tanggalLahir: "22-mei-1232",
    alamat: "jl.bedsa 21",
    asal: "gresik, jawa timur",
    jenisKelamin: "laki-laki",
    noPaspor: "212222",
    masaBerlakuPaspor: "2043",
    ktp: "111",
    kk: "222",
    foto: "333",
    paspor: "444",
  },
  {
    nama: "Mark Evan",
    nik: "231231312132",
    tempatLahir: "Kalifornia",
    tanggalLahir: "22-mei-1232",
    alamat: "jl.bedsa 21",
    asal: "gresik, jawa timur",
    jenisKelamin: "laki-laki",
    noPaspor: "212222",
    masaBerlakuPaspor: "2043",
    ktp: "111",
    kk: "222",
    foto: "333",
    paspor: "444",
  },
  {
    nama: "Mark Evan",
    nik: "231231312132",
    tempatLahir: "Kalifornia",
    tanggalLahir: "22-mei-1232",
    alamat: "jl.bedsa 21",
    asal: "gresik, jawa timur",
    jenisKelamin: "laki-laki",
    noPaspor: "212222",
    masaBerlakuPaspor: "2043",
    ktp: "111",
    kk: "222",
    foto: "333",
    paspor: "444",
  },
  // Tambahkan data dummy lainnya sesuai kebutuhan
];

export default function Jammah() {
  const [list, setList] = useState([]);
  const [message, setMessage] = useState(1);
  const [loading, setLoading] = useState(false);

  const closeMassage = () => {
    setMessage(1);
  };

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://server-umroh-api.vercel.app/api/getdata");

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const responseData = await response.json();
        setList(responseData.data);
      } catch (err) {
        setError(err.message); // Menangani error jika ada
      } finally {
        setLoading(false); // Set loading ke false setelah data diambil
      }
    };

    fetchProducts();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [modal, setModal] = useState(false);
  const itemsPerPage = 10;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = list.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const toggleModal = () => {
    setModal(!modal);
  };

  const exportToCSV = () => {
    const csv = Papa.unparse(list);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "data_jamaah.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <CardLg12 title='Jamaah' description='Jamaah'>
      <Modal toggleModal={toggleModal} modal={modal}>
        <FormJamaah toggleModal={toggleModal} setMessage={setMessage} setList={setList} list={list} setLoading={setLoading} />
      </Modal>
      <button onClick={exportToCSV} className='btn btn-link'>
        <i className='icon-download'></i> Export
      </button>
      <button onClick={toggleModal} className='btn btn-link '>
        <i className='icon-square-plus'></i> Tambah Data
      </button>
      {message === 2 && (
        <p className='text-light bg-dark pl-1 d-flex justify-content-between align-items-center'>
          Berhasil Menambahkan
          <button className='btn-close' aria-label='Close' onClick={closeMassage}>
            x
          </button>
        </p>
      )}
      {message === 3 && (
        <p className='text-light bg-dark pl-1 d-flex justify-content-between align-items-center'>
          Gagal Menambahkan
          <button className='btn-close' aria-label='Close' onClick={closeMassage}>
            x
          </button>
        </p>
      )}{" "}
      {message === 4 && (
        <p className='text-light bg-dark pl-1 d-flex justify-content-between align-items-center'>
          Berhasil Diubah
          <button className='btn-close' aria-label='Close' onClick={closeMassage}>
            x
          </button>
        </p>
      )}
      <p>
        {loading ? (
          <div style={{ display: "flex", alignItems: "center" }}>
            <div class='loader'></div> <div>-Loading</div>
          </div>
        ) : (
          ""
        )}
      </p>
      <div className='table-responsive'>
        <JamaahTable currentItems={currentItems} indexOfFirstItem={indexOfFirstItem} setList={setList} list={list} setMessage={setMessage} />
      </div>
      <Pagination itemsPerPage={itemsPerPage} totalItems={list.length} paginate={paginate} currentPage={currentPage} />
    </CardLg12>
  );
}
