"use client";
import { useState } from 'react';

import useloginstore from "@/store/loginstore";

export default function LoginModal({}) {
    const [user, setuser] = useState(null)
    // const login = useloginstore((s) => s.login)
    const toggle=useloginstore((state)=>state.toggle)
    // const setusername = useloginstore((state)=>state.setusername)
    const logout = useloginstore((state)=>state.logout)
    const loggedoutmodal = useloginstore((state)=>state.loggedoutmodal)
    

    return (
        <div
            className="fixed inset-0 z-50 flex items-start justify-end pr-6 pt-20 bg-black/30 backdrop-blur-sm"
            onClick={toggle} // ✔ closes modal
        >


            <div
                className="relative bg-white shadow-xl rounded-xl p-6 w-80"
                onClick={(e) => e.stopPropagation()} // ✔ prevents closing inside modal
            >
                <h2 className="text-xl font-bold">Logout</h2>

                <p className="text-gray-600 mt-1 text-sm">
                    Register now and get <span className="font-semibold">1000 Nykaa</span> reward points instantly!
                </p>

                <div className="mt-6 space-y-3">
                    {/* <button className="w-full py-3 border rounded-lg font-medium flex justify-between px-3">
                        Sign in with Mobile / Email <span>→</span>
                    </button> */}

                    <button onClick={logout} className="w-full py-3 border rounded-lg font-medium flex justify-between px-3">
                        Logout <span></span>
                    </button>
                       <button onClick={loggedoutmodal} className="w-full py-3 border rounded-lg font-medium flex justify-between px-3">
                        cancel <span></span>
                    </button>
                </div>
            </div>
        </div>
    );
}
