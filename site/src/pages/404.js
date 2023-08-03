import Layout from "@/components/Layout"
import CenterContent from "@/components/CenterContent"
import Link from "next/link"

export default function Links() {
  return (
    <Layout>
      <CenterContent>
        <Body/>
      </CenterContent>
    </Layout>
  )
}

function Body() {
  return (
    <div style={{textAlign: "center"}}>
      <h1>404 Missing</h1>
      Oops! Missing page, are you even at the right place?
      <div className="spaceDiv"></div>
      <Link href={'/'} style={{textDecoration: "none"}}>
        Go Home
      </Link>
    </div>
  )
}