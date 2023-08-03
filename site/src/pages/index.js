import Head from 'next/head'
import styles from '@/styles/Home.module.css'
import DataForm from '@/components/DataForm'

export default function Home() {
  return (
    <>
      <Head>
        <title>Madcow Program</title>
        <meta name="description" content="Generate a madcow program." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <DataForm/>
      </main>
    </>
  )
}
