'use client';
import { useState } from 'react';

import useloginstore from '@/store/loginstore';

export default function LoginModal({}) {
  const [user, setuser] = useState(null);
  const login = useloginstore((s) => s.login);
  const toggle = useloginstore((state) => state.toggle);
  const setusername = useloginstore((state) => state.setusername);

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-end pr-6 pt-20 bg-black/30 backdrop-blur-sm"
      onClick={toggle}
    >
      <div
        className="relative bg-white shadow-xl rounded-xl p-6 w-80"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold">Login </h2>

        <p className="text-gray-600 mt-1 text-sm">
          Register now and get <span className="font-semibold">1000 Nykaa</span>{' '}
          reward points instantly!
        </p>

        <div className="mt-6 space-y-3">
          <input
            onChange={(e) => setusername(e.target.value)}
            className="border border-blue-500 w-full py-3 border rounded-lg font-medium flex justify-between px-3"
            type="text"
            placeholder="6666666"
          />

          <button
            onClick={login}
            className="w-full py-3 border rounded-lg font-medium flex justify-between px-3"
          >
            Login <span></span>
          </button>
        </div>
      </div>
    </div>
  );
}
