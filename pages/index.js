
import Link from "next/link"




export default function Home({toDo}) {
  
  

  return (
    <div className="home-body">
      <div className="home-calendar-container">
        <section className="calendar-container-left" >
          <section>
            <h1>Calendar</h1>
            <img src="/img/calendar-preview.PNG" alt=""/>
          </section>
        </section>
        <section className="calendar-container-right" >
          <h1>Welcome to Split <span>A</span><span>C</span><span>T.</span></h1>
          <label className="home-email-input" htmlFor="email">
            {/* <span>Get start</span> */}
            <input type="email" name="email" placeholder="E-mail" />
            <button>Free - Register</button>
          </label>
        </section>
      </div>

    </div>
  )
}



