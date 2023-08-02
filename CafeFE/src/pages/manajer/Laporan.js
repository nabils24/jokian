import { useState, useEffect } from "react";
import axios from 'axios';
import { baseURL, config } from '../../config';

function Laporan() {
  const [bulan, setBulan] = useState('');
  const [tahun, setTahun] = useState('');
  const [transaksiData, setTransaksiData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [noTransaksi, setNoTransaksi] = useState(false);
  const [userKasir, setUserKasir] = useState([]);
  const [dateHandler, setDateHandler] = useState(true);
  const [userHandler, setUserHandler] = useState(true);

  //manages the side-effects in functional component
  useEffect(() => {
    handleUserKasir();
  }, []);

  const handleUserKasir = async (event) => {
    // get data from API using AXIOS
    try {
      const response = await axios.get(baseURL + "/user/kasir", config);
      setUserKasir(response.data.data);
    } catch (error) {
      console.error(error);
    }
  }

  const clickRentangWaktu = () => {
    setDateHandler(false);
    setUserHandler(true);
  }
  const clickBerdasarkanKasir = () => {
    setDateHandler(true);
    setUserHandler(false);
  }

  const getByUid = async (uid) => {
    // get data from API using AXIOS
    let payload = {
      uid: uid
    }
    try {
      const response = await axios.post(baseURL + "/transaksi/getByUid", payload, config);
      const data = response.data.data;
      if (data.length === 0) {
        setTransaksiData([]);

      } else {

        setTransaksiData(data);

      }
    } catch (error) {
      console.error(error);
      setTransaksiData([]);
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        baseURL + "/transaksi/getByDate",
        { startDate: startDate, endDate: endDate },
        config
      );


      const data = response.data.data;
      if (data.length === 0) {
        setTransaksiData([]);

      } else {

        setTransaksiData(data);

      }
    } catch (error) {
      console.error(error);
      setTransaksiData([]);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Laporan Transaksi</h1>
      <div className="flex justify mb-4">
        {/* Opsi */}
        <div className="flex items-center mr-4" hi>
          <button className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={() => clickBerdasarkanKasir()}>
            Berdasarkan Karyawan
          </button>
          <button className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded ml-3" onClick={() => clickRentangWaktu()}>
            Rentang Tanggal
          </button>
        </div>


      </div>
      {/* Rentang Waktu */}
      <form onSubmit={handleFormSubmit} className="mb-4" hidden={dateHandler}>
        <div className="flex mb-2">

          <div class="flex items-center">
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input name="startDate" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date start" value={startDate} onChange={(e) => setStartDate(e.target.value)} >
              </input>
            </div>
            <span class="mx-4 text-gray-500">to</span>
            <div class="relative">
              <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
              <input name="endDate" type="date" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Select date end" value={endDate} onChange={(e) => setEndDate(e.target.value)}>
              </input>
            </div>
          </div>

        </div>

        <button className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
          Tampilkan Transaksi
        </button>
      </form>
      {/* Berdasarkan Karyawan */}
      <div className="flex items-center mr-4" >
        {userKasir.map((kasir) => (
          <button className="btn bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2" hidden={userHandler} onClick={() => getByUid(kasir.id_user)}>
            {kasir.nama_user}
          </button>
        ))}
      </div>


      <div>
        {transaksiData.length === 0 ? (
          <p> No Data</p>
        ) : (
          transaksiData.length > 0 && (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Tanggal Transaksi
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Nama Pelanggan
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    No Meja
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Menu
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Total
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {transaksiData.map((transaksiItem, index) => (
                  <tr key={transaksiItem.id_transaksi}>
                    <td className="px-6 py-4 whitespace-nowrap">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {new Intl.DateTimeFormat("id-ID").format(
                        new Date(transaksiItem.tgl_transaksi)
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaksiItem.nama_pelanggan}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaksiItem.meja.nomor_meja}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaksiItem.user.nama_user}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <ul>
                        {transaksiItem.detail_transaksi.map((detailItem) => (
                          <li key={detailItem.id_detail_transaksi}>
                            {detailItem.menu.nama_menu} ({detailItem.jumlah})
                          </li>
                        ))}
                      </ul>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      Rp{" "}
                      {new Intl.NumberFormat("id-ID").format(
                        transaksiItem.detail_transaksi.reduce(
                          (total, detailItem) =>
                            total + detailItem.menu.harga * detailItem.jumlah,
                          0
                        )
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {transaksiItem.status === "belum_bayar" ? (
                        <button
                          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
                        // onClick={() => handleToggleStatus(transaksiItem)}
                        >
                          Belum Bayar
                        </button>
                      ) : (
                        <button
                          className="bg-gray-500 text-white font-bold py-2 px-4 rounded-md"
                          disabled
                        >
                          Lunas
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )
        )}
      </div>

    </div>

  );
}

export default Laporan;
