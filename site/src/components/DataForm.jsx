import { confExtra, confName, defaultData, workoutName } from "@/util"
import WorkoutForm from "./WorkoutForm"
import styles from './DataForm.module.css'
import InputForm from "./InputForm"
import { useRouter } from "next/router"
import Layout from "./Layout"
import { useState } from "react"

export default function DataForm() {
  const router = useRouter()
  const [info, setInfo] = useState("")
  return (
    <Layout>
      <Header/>
      <form onSubmit={(e) => sendData(e, router, setInfo)}>
        <Workouts/>
        <ExtraForms/>
        <div className="spaceDiv"></div>
        <SubmitButton/>
        <div className="spaceDiv"></div>
        <InformationBar information={info}/>
      </form>
    </Layout>
  )
}

function Header() {
  return (
    <div className="centerDiv">
      <div>
        <h1 style={{textAlign: "center"}}>Madcow Program</h1>
        Read this quickly before complaining that it didn&apos;t work
        <ul>
          <li><b>Max Weight</b> - that you can lift for 5 reps with good form</li>
          <li><b>Increment</b> - by amount every week</li>
          <li><b>Weeks</b> - of the program</li>
          <li><b>Set Interval</b> - deducted from your max weight</li>
          <li><b>Minimum Weight</b> - available to you</li>
          <li><b>Ramp Up Weeks</b> - until the weight increase starts</li>
          <li><b>Round Up</b> - or down the weights to Min Weight</li>
        </ul>
      </div>
    </div>
  )
}

function Workouts() {
  return (
    <>
    {Array.from(workoutName).map(([k, _]) => {
      return (
        <>
          <WorkoutForm key={k} workout={k}/>
          <hr key={k} className={styles.splitLine}/>
        </>
      )
    })}
  </>
  )
}

function ExtraForms() {
  return (
    <div className={styles.extraForms}>
      {Array.from(confName).map(([k, v]) => {
        const name = v
        const label = k
        const extra = confExtra.get(name)
        const defaultInput = extra[0]
        const min = extra[1]
        const max = extra[2]
        return (
          <InputForm
            key={k}
            name={name}
            label={label}
            defaultInput={defaultInput}
            min={min}
            max={max}
          />
        )
      })
      }
    </div>
  )
}

function SubmitButton() {
  return (
    <div className="centerDiv">
      <button 
        className={styles.submitButton}
        type="submit"
      >Submit</button>
    </div>
  )
}

// Get form data
const sendData = (e, router, setInfo) => {
  e.preventDefault()
  const form = e.target
  const data = new FormData(form)
  const formJson = Object.fromEntries(data.entries())
  // Validate data  
  let post = new Map(defaultData)
  Object.entries(formJson).forEach(([k, v]) => {
    let value = v === "true" ? true : parseFloat(v)
    post.set(k, value)
    // console.log(`k- ${k}, v</b> - ${typeof value} : ${value}`)
  })
  let returnJson = {}
  post.forEach((k, v) => {
    // console.log(`k: ${k}, v: ${v}`)
    returnJson[v] = k
  })
  // console.log(returnJson)
  let returnString = JSON.stringify(returnJson)
  console.log(returnString)
  fetch('api/madcow', {
    method: 'POST',
    headers: {
      "Content-Type" : "application/json",
    },
    body: returnString
  }).then( response => {
    switch (response.status) {
      case 500:
      case 429:
      case 503:
      case 400:
        return response.json()
      case 200:
        router.push('/links')
        return "Success"
      default:
        return "Undefined request code"
    }
  }).then( info => {
    setInfo(info)
  })
}

function InformationBar({information}) {
  let display = information === "" ? "none" : "block"
  return (
    <div className="centerDiv">
      <span className={styles.infoBar} style={{display: display}}>
        <b>
          {information}
        </b>
      </span>
    </div>
  )
}
