
import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { getteam, postteam } from '../config/config'
import uefa from "../pages/uefa.png"
import "../css/Teams.css"

const TeamList = () => {


  const [team, setTeam] = useState([])
  const [teamA, setTeamA] = useState([])
  const [teamB, setTeamB] = useState([])

  useEffect(() => {
    getteam("/api/team")
      .then(success => {
        console.log(success)
        console.log("aakash")
        setTeam(success)
      }
      )
      .catch(err => console.log(err))

  }, [])
  //const t1 =["barcelona","madrid","liverpool","bayern","chealsea","tottenham","arsenal","acmilan","intermilan","Lazio"]
  let count = 0
  let group = ''
  const change = (e) => {

    let elem = e.target;
    let team = e.target.getAttribute('teamId')
    let teamName = e.target.getAttribute('teamName')
    elem.classList.add('animation')

    let para = elem.children[0]
    // console.log(para.innerHTML)
    count++
    if (teamA.length > teamB.length) {
      group = "B"
      console.log(teamA.length, teamB.length)
      setTeamB([...teamB, teamName])
    }
    else {
      group = 'A'
      setTeamA([...teamA, teamName])
    }



    postteam(`/api/team/${group}`, {
      team
    })
      .then(success => {
        console.log(success)
        console.log("added to db")
        setTeam(success)
      }
      )
      .catch(err => console.log(err))

    // para.classList.add('animation')
    // setTimeout(() => {
    para.classList.toggle('show')
    elem.classList.remove('maindiv')
    // }, 4000);//toggle to add or remove.add matra use garda hunxa hamlae aile
    // para.style.visibility ="visible"; 


  }


  return (
    <div>
      <p id="name">TEAMS FOR DRAW</p>
      <div className='maincontainer' >
        {team.map((team1, index) => {

          return (

            <div key={team1._id} teamName={team1.teamname} teamId={team1._id} className="maindiv" style={{ border: "1px solid black" }
            } onClick={change}>
              <p className='container'>{team1.teamname}</p>
            </div>


          )
        })}
      </div >


      <div className='group'>

        <div className="A">GROUP A
          <p id="A">
            {
              teamB.map(t => {
                return (
                  <div>
                    {t}
                  </div>
                )
              })
            }
          </p>
        </div>
        <div className='B'>GROUP B</div>
        
          {
            teamA.map(t => {
              return (
                <div>
                  {t}
                </div>
              )
            })
          }
        
      </div>

    </div >



  )
}

export default TeamList




