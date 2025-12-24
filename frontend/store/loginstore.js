import { create } from "zustand";
import axios from 'axios';
import api from "@/store/axios";


const useloginstore = create((set,get) => ({
    isloggedin: false,
    username: null,
    signup: false,
    loggedoutclicked: false,
    toggle: () => {
        set((state) => ({
            signup: !state.signup

        }))
    },
    setusername : (data) =>{
        set((state) => ({
            username : data
        }))
    },
    logout : () =>{
        set((state) => ({
            username:null,
            loggedoutclicked:false
        }))
    },
    //to hide/show logout modal
    loggedoutmodal:()=>{
        set((state)=>({
            loggedoutclicked: !state.loggedoutclicked
        }))
    },

    login: (data) => {
  api.post("/auth/login", {
      username: data.username,
      password: data.password,
    })
    .then((res) => res.data)
    .then(() => get().toggle())
    .catch((error) => console.log(error));

  set(() => ({
    isloggedin: true,
  }));
},
}))

export default useloginstore
