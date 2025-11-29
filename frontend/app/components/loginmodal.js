"use client";
import axios from 'axios';
import { useState } from 'react';

export default function LoginModal({ toggle }) {
    const [user, setuser] = useState(null)

    function login() {
        axios.post('https://dummyjson.com/auth/login', {
            headers: { 'Content-Type': 'application/json' },
            username: 'emilys',
            password: 'emilyspass',
        })
            .then(res => setuser(res.data))
            .catch(error => console.log(error))
    }



    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-end pr-6 pt-20 bg-black/30 backdrop-blur-sm"
            onClick={toggle} // ✔ closes modal
        >


            <div
                className="relative bg-white shadow-xl rounded-xl p-6 w-80"
                onClick={(e) => e.stopPropagation()} // ✔ prevents closing inside modal
            >
                <h2 className="text-xl font-bold">Login </h2>

                <p className="text-gray-600 mt-1 text-sm">
                    Register now and get <span className="font-semibold">1000 Nykaa</span> reward points instantly!
                </p>

                <div className="mt-6 space-y-3">
                    {/* <button className="w-full py-3 border rounded-lg font-medium flex justify-between px-3">
                        Sign in with Mobile / Email <span>→</span>
                    </button> */}
                    <input className="border border-blue-500 w-full py-3 border rounded-lg font-medium flex justify-between px-3" type="text" placeholder="6666666" />

                    <button onClick={login} className="w-full py-3 border rounded-lg font-medium flex justify-between px-3">
                        Login <span></span>
                    </button>
                </div>
            </div>
        </div>
    );
}
