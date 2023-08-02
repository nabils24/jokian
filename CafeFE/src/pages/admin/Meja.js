import React from "react";
import $ from "jquery";
import axios from "axios";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

// import Sidebar from "./sidebar";

export default class Meja extends React.Component {
  constructor() {
    super()
    this.state = {
      meja: [],
      action: "",
      token: "",
      id_meja: 0,
      nomor_meja: "",
      status: "",
      fillPassword: true,
      search: null,

    }
    if (localStorage.getItem("token")) {
      this.state.token = localStorage.getItem("token")
    } else {
      window.location.reload();
    }
  }
  headerConfig = () => {
    let header = {
      headers: { Authorization: `Bearer ${this.state.token}` }
    }
    return header
  }
  // buat fungsi cari meja
  cariMeja = (event) => {

    let url = "http://localhost:8000/meja/cariMeja/" + this.state.search
    if (this.state.search == "" || this.state.search == null) {
      this.getMeja()
    } else {
      axios.get(url, this.headerConfig())
        .then(response => {
          this.setState({ meja: response.data.data })
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status) {
              window.alert("Meja tidak ditemukan atau tidak ada query yang dicari")
              window.location.reload();
            }
          } else {
            console.log(error);
          }
        })

    }

  }

  // end fungsi cari meja
  getMeja = () => {
    $("#dropdown").hide()
    let url = "http://localhost:8000/meja"
    axios.get(url, this.headerConfig())
      .then(response => {
        this.setState({ meja: response.data.data })
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message)
            window.location = '/'
          }
        } else {
          console.log(error);
        }
      })
  }

  getMejaStatus = (status) => {
    $("#dropdown").hide()
    let url = "http://localhost:8000/status/" + status
    axios.get(url, this.headerConfig())
      .then(response => {
        this.setState({ meja: response.data.data })
      })
      .catch(error => {
        if (error.response) {
          if (error.response.status) {
            window.alert(error.response.data.message)
            window.location.reload();

          }
        } else {
          console.log(error);
        }
      })
  }

  Add = () => {
    $("#modal_meja").show()
    this.setState({
      id_meja: 0,
      nomor_meja: "",
      status: "",
      fillPassword: true,
      action: "insert"
    })
  }
  Edit = selectedItem => {
    $("#modal_meja").show()
    this.setState({
      id_meja: selectedItem.id_meja,
      nomor_meja: selectedItem.nomor_meja,
      status: selectedItem.status,
      action: "update"
    })
  }
  saveMeja = (event) => {
    event.preventDefault()
    $("#modal_meja").show()
    let sendData = {
      id_meja: this.state.id_meja,
      nomor_meja: this.state.nomor_meja,
      status: this.state.status
    }
    let url = "http://localhost:8000/meja"
    if (this.state.action === "insert") {
      axios.post(url, sendData, this.headerConfig())
        .then(response => {
          window.alert(response.data.message)
          this.getMeja()
        })
    } else if (this.state.action === "update") {
      let baseURL = "http://localhost:8000/meja/" + sendData.id_meja
      axios.put(baseURL, sendData, this.headerConfig())
        .then(response => {
          window.alert(response.data.message)
          this.getMeja()
        })
        .catch(error => console.log(error))
    }
    $("#modal_meja").hide()
  }
  dropMeja = selectedItem => {
    if (window.confirm("Apakah anda yakin ingin menghapus data ini?")) {
      let url = "http://localhost:8000/meja/" + selectedItem.id_meja
      axios.delete(url, this.headerConfig())
        .then(response => {
          window.alert(response.data.message)
          this.getMeja()
        })
        .catch(error => console.log(error))
    }
  }
  bind = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }
  componentDidMount() {
    this.getMeja()
  }
  status = () => { //?
    $('#dropdown').show()
    $('#icon2').show()
    $('#icon1').hide()
  }
  statusTutup = () => {
    $('#dropdown').hide()
    $('#icon1').show()
    $('#icon2').hide()
  }
  close = () => {
    $("#modal_meja").hide()
  }

  render() {
    return (
      <div className='flex h-screen w-full'>
        <div className="w-full h-screen mx-28">
          {/* <Sidebar /> */}
          <div className=" mt-5 overflow-x-auto sm:rounded-lg">
            <h1 className="flex justify-center font-medium text-5xl">Meja List</h1>
            {/* make search */}
            <div className="flex justify-center my-5">
              <div className="flex justify-center items-center border border-gray-400 rounded-md">
                <input type="text" className="px-2 py-1 outline-none" name="search" value={this.state.search} onChange={this.bind} placeholder="Cari Nomor Meja" />
                <button className="bg-gray-400 hover:bg-gray-600 px-2 py-1 rounded-md outline-none focus:outline-none ease-linear transition-all duration-150" onClick={() => this.cariMeja()}>
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-6 h-6 text-white hover:text-gray-100" fill="none" viewBox="0 0 24 24" stroke="currentColor" >
                    <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M8 9l3 3 3-3"></path>
                  </svg>
                </button>
              </div>
            </div>

            <button className="hover:bg-green-500 float-right bg-green-600 text-white font-bold uppercase text-sm px-4 py-3 mb-2 rounded-md outline-none ease-linear transition-all duration-150" type="button" onClick={() => this.Add()}>
              Tambah Meja
            </button>
            <table class="min-w-full text-sm text-left text-gray-700">
              <thead class="text-xs text-gray-100 uppercase bg-[#E14D2A]">
                <tr className="text-base">
                  <th scope="col" className="px-6 py-3">
                    Nomor Meja
                  </th>
                  <th scope="col" className="px-6 py-3 flex items-center">
                    Status Meja
                    <a href="#" onClick={() => this.status()} id="icon1"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg></a>
                    <a href="#" onClick={() => this.statusTutup()} id="icon2" className="hidden"><svg xmlns="http://www.w3.org/2000/svg" class="w-3 h-3 ml-1" aria-hidden="true" fill="currentColor" viewBox="0 0 320 512"><path d="M27.66 224h264.7c24.6 0 36.89-29.78 19.54-47.12l-132.3-136.8c-5.406-5.406-12.47-8.107-19.53-8.107c-7.055 0-14.09 2.701-19.45 8.107L8.119 176.9C-9.229 194.2 3.055 224 27.66 224zM292.3 288H27.66c-24.6 0-36.89 29.77-19.54 47.12l132.5 136.8C145.9 477.3 152.1 480 160 480c7.053 0 14.12-2.703 19.53-8.109l132.3-136.8C329.2 317.8 316.9 288 292.3 288z" /></svg></a>
                  </th>
                  <div id="dropdown" class="z-10 hidden fixed bg-white divide-y divide-gray-100 rounded-lg shadow w-44 ">
                    <ul class="py-2 text-sm text-gray-700 " aria-labelledby="dropdownDefaultButton">
                      <li>
                        <a href="#" onClick={() => this.getMeja()} class="block px-4 py-2  hover:bg-gray-600 hover:text-white">Tampilkan Semua</a>
                      </li>
                      <li>
                        <a href="#" onClick={() => this.getMejaStatus("terisi")} className="block px-4 py-2  hover:bg-gray-600 hover:text-white">terisi</a>
                      </li>
                      <li>
                        <a href="#" onClick={() => this.getMejaStatus("kosong")} className="block px-4 py-2  hover:bg-gray-600 hover:text-white">kosong</a>
                      </li>
                    </ul>
                  </div>
                  <th scope="col" class="px-6 py-3">
                    <span class="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {this.state.meja.map((item) => (
                  <tr className="bg-orange-200 border-b font-sans  border-gray-700 hover:bg-orange-100" key={item.id_meja}>
                    <td className="px-6 py-4">
                      {item.nomor_meja}
                    </td>
                    <td className="px-6 py-4">
                      {item.status}
                    </td>
                    <td className="px-6 py-4 text-center flex justify-evenly">
                      <a href="#" className="inline-flex font-medium text-blue-500 hover:underline" onClick={() => this.Edit(item)}>
                        <FaEdit size={20} />
                      </a>
                      <a href="#" className="font-medium text-red-500 hover:underline" onClick={() => this.dropMeja(item)}>
                        <MdDelete size={20} />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* Modal */}
        <div id="modal_meja" className="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 md:inset-0 h-modal md:h-full bg-tranparent bg-black bg-opacity-50">
          <div className="flex md:h-auto w-auto justify-center ">
            <div className="relative bg-white rounded-lg shadow  w-1/3">
              <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center" onClick={() => this.close()}>
                <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                <span className="sr-only">Tutup modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 ">Meja</h3>
                <form className="space-y-6" onSubmit={(event) => this.saveMeja(event)}>
                  <div>
                    <label for="nomor_meja" className="block mb-2 text-sm font-medium text-gray-900 ">Nomor Meja</label>
                    <input type="text" name="nomor_meja" id="nomor_meja" value={this.state.nomor_meja} onChange={this.bind} className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400 " placeholder="Masukkan nomor meja" required />
                  </div>
                  <div>
                    <label for="role" className="block mb-2 text-sm font-medium text-gray-900 ">Status Meja</label>
                    <select className="bg-gray-50 border border-gray-500 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 placeholder-gray-400" placeholder="Status Meja" name="status" value={this.state.status} onChange={this.bind} required>
                      <option value="">Pilih Status Meja</option>
                      <option value="terisi">terisi</option>
                      <option value="kosong">kosong </option>
                    </select>
                  </div>
                  <button type="submit" className="w-full text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-600 hover:bg-blue-700 ">Simpan</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}