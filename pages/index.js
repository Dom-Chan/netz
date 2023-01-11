import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";
import styles from "../styles/Home.module.css";

const inter = Inter({ subsets: ["latin"] });

// export const getStaticProps = async() => {
//   const url = "/api/hello"
//   const res = await fetch(url)
//   const data = await res.json()
//   //console.log(data)

//   return {
//     props: {netz: data}
//   }
// }

export default function Home({}) {

  const creds = { username: "a", password : "bar"}

  const options = {
    method: "POST",
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify(creds)
  }
  
  fetch("/api/hello", options);
  
  return (
    <>
      LOGIN PAGE
    </>
  );
}
