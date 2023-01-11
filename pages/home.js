import Cookies from "js-cookie";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";

export const getStaticProps = async () => {
  const resp = await fetch(
    "https://netzwelt-devtest.azurewebsites.net/Territories/All"
  );

  const data = await resp.json();

  return {
    props: { netz: data },
  };
};

export default function Home({ netz }) {
  const [territories, setTerritories] = useState(netz.data);
  const [regions, setRegions] = useState( territories.filter((territory) => territory.id.length === 1))
  const [subRegions, setSubRegions]  = useState()

  const router = useRouter();

  const handleLogout = () => {
    Cookies.remove("loggedin");
    router.push("http://localhost:3000/");
  };

  return (
    <>
      HOME PAGE <button onClick={handleLogout}>LOG OUT</button>
      {regions.map((region) => (<div key={region.name}>{region.name}</div>))}
      
    </>
  );
}
