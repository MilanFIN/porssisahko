"use client";
import Image from 'next/image'
import { useEffect } from 'react'

export default function Home() {

  const getYleContent = async () => {
    const headers = {}
    let res:any, err = await fetch("/api/yle");
    console.log(res);
  }

  useEffect(() => {
    getYleContent();
  }, [])


  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      <div className="w-full h-full">
        test
      </div>
    </main>
  )
}
