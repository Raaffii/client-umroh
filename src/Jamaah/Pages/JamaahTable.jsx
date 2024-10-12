import Modal from "../../Shared/Modal/Modal";
import { useState } from "react";
import FormJamaahUpdate from "./FormJamaahUpdate";

export default function JamaahTable({ currentItems, indexOfFirstItem, setList, list, setMessage }) {
  const [modal, setModal] = useState(false);
  const [modalUpdate, setModalUpdate] = useState(false);
  const [dataForUpdate, setDataForUpdate] = useState("");
  console.log(list);
  const [data, setData] = useState("");
  const [folder, setFolder] = useState("");
  const toggleModal = () => {
    setModal(!modal);
  };

  const toggleModalUpdate = (data) => {
    setModalUpdate(!modalUpdate);
    setDataForUpdate(data);
  };

  const calculateAge = (tanggalLahir) => {
    const birthDate = new Date(tanggalLahir);
    const today = new Date();

    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age;
  };

  const calculateMonthsLeft = (masaPaspor) => {
    const expiryDate = new Date(masaPaspor);
    const today = new Date();

    // Menghitung selisih dalam bulan
    const monthsDifference = (expiryDate.getFullYear() - today.getFullYear()) * 12 + (expiryDate.getMonth() - today.getMonth());

    return monthsDifference < 0 ? 0 : monthsDifference; // Pastikan tidak ada nilai negatif
  };

  const openModal = (file, folder) => {
    setModal(true);
    console.log(file);
    setData(file);
    setFolder(folder);
  };

  const deleteData = async (nik) => {
    console.log("hoyawal");
    try {
      await fetch(`https://server-umroh-api.vercel.app/api/deleteData/${nik}`, {
        method: "DELETE",
      });

      console.log("hoy");
      setList((list) => list.filter((list) => list.nik != nik));
    } catch (error) {
      console.error("Error deleting data:", error.message);
      // Tangani error, mungkin tampilkan pesan ke pengguna
    }
  };

  return (
    <>
      <Modal toggleModal={toggleModal} modal={modal}>
        <h5>
          Data:{" "}
          <h6 className='clip-animation' style={{ color: "red" }}>
            Data yang baru diupload membutuhkan waktu unggah
          </h6>
        </h5>
        <embed type='application/pdf' src={`https://firebasestorage.googleapis.com/v0/b/filemern.appspot.com/o/${folder}%2F${data}?alt=media&token`} width='600' height='400'></embed>
      </Modal>
      <Modal toggleModal={toggleModalUpdate} modal={modalUpdate}>
        <FormJamaahUpdate data={dataForUpdate} setList={setList} setModalUpdate={setModalUpdate} setMessage={setMessage} />
      </Modal>
      <table className='table table-striped' style={{ border: "1px solid #d7d9d7" }}>
        <thead>
          <tr>
            <th>No</th>

            <th>Nama</th>
            <th>NIK</th>
            <th>Tempat Lahir</th>
            <th>Tanggal Lahir</th>
            <th>Alamat</th>
            <th>Asal</th>
            <th>Jenis Kelamin</th>
            <th>No Paspor</th>
            <th>Masa Berlaku Paspor</th>
            <th>Paket</th>
            <th>Kamar</th>
            <th>Lampiran KTP</th>
            <th>Lampiran KK</th>
            <th>Lampiran Foto Diri</th>
            <th>Lampiran Paspor</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((data, index) => (
            <tr key={index}>
              <td>{index + indexOfFirstItem + 1}</td>

              <td>{data.nama}</td>
              <td>{data.nik}</td>
              <td>{data.tempatLahir}</td>
              <td>
                <label className='badge badge-warning'>{data.tanggalLahir}</label>
                <span className='ml-2'>({calculateAge(data.tanggalLahir)} thn)</span>
              </td>
              <td>{data.alamat}</td>
              <td>
                {data.kelurahan}-{data.kecamatan}-{data.kota}-{data.provinsi}
              </td>
              <td>{data.jenisKelamin}</td>
              <td>{data.nomerPaspor}</td>
              <td>
                <label className='badge badge-warning'>{data.masaPaspor}</label>
                <span className='ml-2'>({calculateMonthsLeft(data.masaPaspor)} bulan lagi)</span>
              </td>
              <td>
                <label className='badge badge-success'>{data.paket}</label>
              </td>
              <td>
                <label className='badge badge-info'>{data.kamar}</label>
              </td>
              <td>
                <button type='button' className='btn btn-inverse-success btn-fw' onClick={() => openModal(data.lampiranKTP, "ktp")}>
                  KTP
                </button>
              </td>
              <td>
                <button type='button' className='btn btn-inverse-success btn-fw' onClick={() => openModal(data.lampiranKK, "kk")}>
                  KK
                </button>
              </td>
              <td>
                <button type='button' className='btn btn-inverse-success btn-fw' onClick={() => openModal(data.fotoDiri, "foto")}>
                  Foto Diri
                </button>
              </td>
              <td>
                <button type='button' className='btn btn-inverse-success btn-fw' onClick={() => openModal(data.paspor, "paspor")}>
                  Paspor
                </button>
              </td>
              <td>
                {" "}
                <button type='button' className='btn btn-inverse-warning btn-fw' onClick={() => toggleModalUpdate(data)}>
                  Edit
                </button>
                <button type='button' className='btn btn-inverse-danger btn-fw' onClick={() => deleteData(data.nik)}>
                  Del
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
