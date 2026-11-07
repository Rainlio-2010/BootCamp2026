import { useEffect, useState } from "react";
import "./App.css";


function App() {


  const [board, setBoard] = useState([]);



  function load() {

    fetch(
      "http://127.0.0.1:5000/"
    )

      .then(r => r.json())

      .then(data => {

        setBoard(data)

      })

  }



  useEffect(() => {


    load();



    function key(e) {


      let dir = null;


      if (e.key === "ArrowLeft")
        dir = "left";


      if (e.key === "ArrowRight")
        dir = "right";


      if (e.key === "ArrowUp")
        dir = "up";


      if (e.key === "ArrowDown")
        dir = "down";



      if (dir) {


        fetch(
          "http://127.0.0.1:5000/move",
          {
            method: "POST",

            headers: {
              "Content-Type": "application/json"
            },

            body: JSON.stringify({
              direction: dir
            })

          }

        )

          .then(r => r.json())

          .then(data => {

            setBoard(data)

          })

      }



    }



    window.addEventListener(
      "keydown",
      key
    )



    return () => {

      window.removeEventListener(
        "keydown",
        key
      )

    }


  }, [])




  return (

    <div className="game">


      <h1>2048</h1>


      <div className="board">


        {
          board.flat().map(
            (num, i) => (

              <div className="cell" key={i}>

                {
                  num === 0 ? "" : num
                }

              </div>

            )
          )
        }


      </div>


    </div>


  )


}


export default App;