import React, { useState, useEffect } from "react";
import { provinces } from "./Data";
import Papa from "papaparse";

export default function CascadingOption({ setAsal, data, update }) {
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedVillage, setSelectedVillage] = useState("");
  useEffect(() => {
    if (update) {
      setSelectedProvince(data.provinsi);
      setSelectedCity(data.kota);
      setSelectedDistrict(data.kecamatan);
      setSelectedVillage(data.kelurahan);
    }
  }, []);
  const [dataProvinsi, setDataProvinsi] = useState([]);
  const [dataKabupatenKota, setDataKabupatenKota] = useState([]);
  const [dataKecamatan, setDataKecamatan] = useState([]);
  const [dataKelurahan, setDataKelurahan] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provinsiResponse = await fetch("/provinsiData/provinsi.csv");
        const provinsiText = await provinsiResponse.text();
        Papa.parse(provinsiText, {
          header: true,
          complete: (results) => {
            setDataProvinsi(results.data);
          },
        });
        const kabupatenResponse = await fetch("/provinsiData/kabupaten_kota.csv");
        const kabupatenText = await kabupatenResponse.text();
        Papa.parse(kabupatenText, {
          header: true,
          complete: (results) => {
            setDataKabupatenKota(results.data);
          },
        });

        const kecamatanResponse = await fetch("/provinsiData/kecamatan.csv");
        const kecamatanText = await kecamatanResponse.text();
        Papa.parse(kecamatanText, {
          header: true,
          complete: (results) => {
            setDataKecamatan(results.data);
          },
        });

        const kelurahanResponse = await fetch("/provinsiData/kelurahan.csv");
        const kelurahanText = await kelurahanResponse.text();
        Papa.parse(kelurahanText, {
          header: true,
          complete: (results) => {
            setDataKelurahan(results.data);
          },
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleProvinceChange = (e) => {
    setSelectedProvince(e.target.value);
    setSelectedCity("");
    setSelectedDistrict("");
    setSelectedVillage("");
  };

  const handleCityChange = (e) => {
    setSelectedCity(e.target.value);
    setSelectedDistrict("");
    setSelectedVillage("");
  };

  const handleDistrictChange = (e) => {
    setSelectedDistrict(e.target.value);
    setSelectedVillage("");
  };

  const handleVillageChange = async (e) => {
    await setSelectedVillage(e.target.value);
    const asal = {
      province: selectedProvince.split("-")[1],
      city: selectedCity.split("-")[1],
      district: selectedDistrict.split("-")[1],
      village: e.target.value.split("-")[1],
    };

    setAsal(asal);
  };

  const selectedProvinceData = dataKabupatenKota.filter((province) => province.id.split(".")[0] === selectedProvince.split("-")[0]);
  const selectedCityData = dataKecamatan.filter((city) => city.id.split(".").slice(0, 2).join(".") === selectedCity.split("-")[0]);
  const selectedDistrictData = dataKelurahan.filter((district) => district.id.split(".").slice(0, 3).join(".") === selectedDistrict.split("-")[0]);

  return (
    <div className='row'>
      <div className='col-md-3'>
        <div className='form-group'>
          <label htmlFor='province'>Provinsi</label>
          <select id='province' className='form-control' value={selectedProvince} onChange={handleProvinceChange}>
            <option value={null}>{data ? data.provinsi : "--Pilih Provinsi-"}</option>
            {dataProvinsi.map((province) => (
              <option key={province.id} value={`${province.id}-${province.name}`}>
                {province.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className='col-md-3'>
        <div className='form-group'>
          <label htmlFor='city'>Kota</label>
          <select id='city' className='form-control' value={selectedCity} onChange={handleCityChange} disabled={!selectedProvince}>
            <option value={null}>{data ? data.kota : "--Pilih Kota--"}</option>
            {selectedProvinceData &&
              selectedProvinceData.map((city) => (
                <option key={city.id} value={`${city.id}-${city.name}`}>
                  {city.name}
                </option>
              ))}
          </select>
        </div>
      </div>{" "}
      <div className='col-md-3'>
        <div className='form-group'>
          <label htmlFor='city'>Kecamatan</label>
          <select id='city' className='form-control' value={selectedDistrict} onChange={handleDistrictChange} disabled={!selectedCity}>
            <option value={null}>{data ? data.kecamatan : "--Pilih Kecamatan--"}</option>
            {selectedCityData &&
              selectedCityData.map((district) => (
                <option key={district.id} value={`${district.id}-${district.name}`}>
                  {district.name}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className='col-md-3'>
        <div className='form-group'>
          <label htmlFor='city'>Kecamatan</label>
          <select id='city' className='form-control' value={selectedVillage} onChange={handleVillageChange} disabled={!selectedDistrict}>
            <option value={null}>{data ? data.kelurahan : "--Pilih Kelurahan"}</option>
            {selectedDistrictData &&
              selectedDistrictData.map((village) => (
                <option key={village.id} value={`${village.id}-${village.name}`}>
                  {village.name}
                </option>
              ))}
          </select>
        </div>
      </div>
    </div>
  );
}
