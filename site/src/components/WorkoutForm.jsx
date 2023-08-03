import Image from "next/image";
import styles from './WorkoutForm.module.css'
import InputForm from "./InputForm";
import { workoutName, workoutExtra } from "@/util";

export default function WorkoutForm({workout}) {
  return (
    <div className={styles.containerDiv}>
      <WorkoutHeader workout={workout}/>
      <div className={styles.inputDiv}>
        <div style={{width: "80%"}}>
          <WorkoutInput workout={workout}/>
        </div>
      </div>
    </div>
  )
}


function WorkoutHeader({workout}) {
  let path = `/img/${workout.toLowerCase()}.svg`
  return (
    <div className={styles.headerContainer}>
      <Image
        width={75}
        height={75}
        src={path}
        alt={`Picture of ${workout}`}>
      </Image>
      <div className={styles.headerText}>
      {workout}
      </div>
    </div>
  )
}


function WorkoutInput({workout}) {
  const wrkName = workoutName.get(workout).toLowerCase()
  const wrkInc = wrkName + "inc"
  const extrasWorkout = workoutExtra.get(wrkName)
  const extrasInc = workoutExtra.get(wrkInc)
  // console.log(extrasWorkout, extrasInc)
  const [minWorkout, maxWorkout] = [extrasWorkout[1], extrasWorkout[2]]
  const [minInc, maxInc] = [extrasInc[1], extrasInc[2]]
  return (
    <div className={styles.workoutInputContainer}>
      <div className={styles.leftInput}>
      <InputForm
        name={wrkName}
        label="Max Weight"
        defaultInput={extrasWorkout[0]}
        min={minWorkout}
        max={maxWorkout}
      />
      </div>
      <div className={styles.rightInput}>
      <InputForm
        name={wrkInc}
        label="Increment"
        defaultInput={extrasInc[0]}
        min={minInc}
        max={maxInc}
      />
      </div>
    </div>
  )
}