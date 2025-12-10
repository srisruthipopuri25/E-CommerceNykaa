import { create } from "zustand";
import axios from 'axios';

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
        axios.post('https://dummyjson.com/auth/login', {
            headers: { 'Content-Type': 'application/json' },
            username: 'emilys',
            password: 'emilyspass',
        })
            .then(res => res.data)
            .then(()=>get().toggle())
            .catch(error => console.log(error))

        set(() => ({
            isloggedin: true,
        }))
    },
}))

export default useloginstore