import React from 'react'
import LoginForm from '@/components/loginform/login'; 
import Image from 'next/image';
export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Kiri: Welcome Section */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-primary to-blue-500 items-center justify-center text-white p-10">
        <div>
            <div className="flex justify-center mb-6">
                <Image src="/LogoNavbar.svg" alt="Logo" width={400} height={200} className=""/>
            </div>
            <h1 className="text-2xl font-bold mb-4">Selamat Datang di Perpustakaan Online</h1>
        </div>
      </div>

      {/* Kanan: Login Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <LoginForm/>
      </div>
    </div>
  );
}