import React from 'react'
import WheelComponent from "./WheelComponent";

function Rewards() {
    const segments = [
        {isSuper: false, value:'Better Luck next time'},
        {isSuper: false, value:'Better Luck next time'},
        {isSuper: true, value:'30%'},
        {isSuper: false, value:'Better Luck next time'},
        {isSuper: false, value:'Better Luck next time'},
        {isSuper: false, value:'Better Luck next time'},
        {isSuper: false, value:'Better Luck next time'},
        {isSuper: false, value:'Better Luck next time'},
        {isSuper: true, value:'10%'},
        {isSuper: false, value:'Better Luck next time'},
        
    ]
    const segColors = [
        '#F44336',
        '#E91E63',
        '#9C27B0',
        '#3F51B5',
        '#03A9F4',
        '#4CAF50',
        '#CDDC39',
        '#555555',
        'brown',
        '#aaa444',
    ]
      const onFinished = (winner) => {
        console.log(winner);
      };
    
      return (
        <div className="row">
            <div class="col" style={{margin:"0 0 80px 180px"}}>
            <WheelComponent
            segments={segments}
            segColors={segColors}
            winningSegment="won 70"
            onFinished={(winner) => onFinished(winner)}
            primaryColor="black"
            contrastColor="white"
            buttonText="Spin"
            isOnlyOnce={true}
            size={190}
            upDuration={100}
            downDuration={1000}
            fontFamily="Arial"
            />
            </div>
            <div class="col" style ={{ margin: "200px 200px 0 180px"}}>
            <div style={{textAlign:"left", width: "38rem", fontSize:"20"}}>
                <h1 style={{fontSize:"70px",color:"Black"}}>Welcome!</h1>
                <h4 style={{fontSize:"20px",color:"grey"}}>We love giving our new and frequent customers a chance to win free vouchers. Click on the <b style={{color:"black"}}>Spin</b> button to try your luck!</h4>
            </div>
            </div>
          
        </div>
      );
}

export default Rewards