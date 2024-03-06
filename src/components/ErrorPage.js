import React from 'react'

function ErrorPage({message}) {
  return (
    <div style={{height:"380px", textAlign:"center", backgroundColor:"white", margin: "4cm 0cm 0cm 9cm", position:"relative", width:"850px"}}><h2>Error!!!</h2>
    {console.log(message.message)}
    <h4>{message.message}</h4></div>
  )
}

export default ErrorPage
