
import React, { useRef } from 'react'
import { useEffect, useState } from 'react'
import { getteam, httpGet, httpPut, postteam } from '../config/config'
import uefa from "../pages/uefa.png"
import "../css/Teams.css"

const TeamList = () => {


  const [team, setTeam] = useState([])
  const [teamA, setTeamA] = useState([])
  const [teamB, setTeamB] = useState([])

  useEffect(() => {
    httpGet("/api/team")
      .then(success => {
        console.log(success)
        console.log("aakash")
        setTeam(success)
      }
      )
      .catch(err => console.log(err))

  }, [])

  const onGetGroup = () => {
    httpGet('api/fixture/group/A')
      .then(console.log)
  }
  //const t1 =["barcelona","madrid","liverpool","bayern","chealsea","tottenham","arsenal","acmilan","intermilan","Lazio"]
  let count = 0
  let group = ''
  const change = (e) => {

    let elem = e.target;
    //console.log(elem)
    let team_id = e.target.getAttribute('teamId')
    let teamname = e.target.getAttribute('teamname')
   
    elem.classList.add('animation')

    let para = elem.children[0]
    console.log(elem.children[0])
    // console.log(para.innerHTML)
    count++
    if (teamA.length > teamB.length) {
      group = "B"
      console.log(teamA.length, teamB.length)
      setTeamB([...teamB, teamname])
    }
    else {
      group = 'A'
      setTeamA([...teamA, teamname])
    }



    httpPut(`/api/team/${team_id}`, {
      group: group
    })
      .then(success => {
        console.log(success)
        console.log("added to db")
        // setTeam(success)
        setTimeout(() => {
          let ts = team.filter(t => t._id !== team_id);
          // setTeam(ts)
        }, 4000)
      }
      )
      .catch(err => console.log(err))

     para.classList.add('animation')
     
     setTimeout(() => {
      elem.classList.remove('maindiv')
    para.classList.toggle('show')
    
     }, 4000);//toggle to add or remove.add matra use garda hunxa hamlae aile
    // para.style.visibility ="visible"; 
  setTimeout(()=>{
    let eleme =document.getElementById(teamname)
    eleme.remove()
    
    //alert(`group  allocated for ${teamname}`)
  },5000)
    


  }

  return (
    <div>
      <p id="name">TEAMS FOR DRAW</p>
      <div className='maincontainer' >
        {team.map((team1, index) => {

          return (

            <div key={team1._id} id={team1.teamname} teamname={team1.teamname} teamId={team1._id} className="maindiv" style={{ border: "1px solid black" }
            } onClick={change}>
              
              <p className='container'>{team1.teamname}</p>
            </div>


          )
        })}
      </div >


      <div className='group'>

        <div className="A">GROUP A
          
            {
              teamB.map(t => {
                return (
                  <div>
                    {t}
                  </div>
                )
              })
            }
          
        </div>
        <div className='B'>GROUP B

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
      </div>
      <button onClick={onGetGroup}>Get All</button>
    </div >



  )
}

export default TeamList




