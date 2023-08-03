import Layout from "@/components/Layout";
import styles from "@/styles/Links.module.css"
import CenterContent from "@/components/CenterContent";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

export default function Links() {
  const [data, setData] = useState({})
  const router = useRouter()
  
  useEffect(() => {
    if (Object.keys(data).length === 0) {
      const interval = setInterval(() => {
        getLinks(router,setData);
      }, 5000);
      return () => clearInterval(interval);
    }
    return
  }, [])

  return (
    <Layout>
      <CenterContent>
        <Header/>
        <div className="spaceDiv"></div>
        <Loading data={data}/>
        <ShowLinks data={data}/>
      </CenterContent>
    </Layout>
  )
}

function Header() {
  return (
    <>
      <h1 style={{textAlign: "center"}}>Links</h1>
      Your program is getting ready now.
      Every couple of seconds we automatically check if they&apos;re ready.
      <b> No need to wait here, come back in some minutes.</b>
    </>
  )
}

function Loading({data}) {
  let display = Object.keys(data).length === 0 ? "flex" : "none" 
  return (
    <div className={styles.loadingDiv} style={{display: display}}>
      <div className={styles.spinRing}></div>
      <div className={styles.loadingLabel}><b>Getting Links</b></div>
    </div>
  )
}

function ShowLinks({data}) {
  let isAvailable = Object.keys(data).length !== 0
  let display = isAvailable ? "flex" : "none"
  let pdfLink = isAvailable ? data["pdf"] : ""
  let pngLink = isAvailable ? data["png"] : ""
  return (
    <div className={styles.linksDiv} style={{display: display}}>
      {isAvailable ?
      <>
        <Link link={pdfLink} type="pdf"/>
        <Link link={pngLink} type="png"/>
      </> : ''}
    </div>
  )
}

function Link({link, type}) {
  return (
    <a href={link} style={{textDecoration: "none"}}>
      <div className={styles.linkButton}>
        Get the {type}
      </div>
    </a>
  )
}

function getLinks(router, setData) {
  fetch('api/links', {
    method: 'GET',
    headers: {
      'Accept' : 'application/json'
    }
  }).then( response => {
    switch (response.status) {
      case 404:
        alert("You haven't submit any data yet.")
        router.push("/")
        return ""
      case 425:
        return "Not yet finished"
      case 200:
        return response.json()
      default:
          return "Undefined request code"
    }
  }).then( json => {
    if (typeof json !== "string") {
      setData(json)
    } else {
      console.log(json)
    }
  })
}
