import React from 'react'
import WhatsAppWidget from "react-whatsapp-chat-widget";
import "react-whatsapp-chat-widget/index.css";


function ChatBot() {
  return (
    <WhatsAppWidget
			phoneNo="923349914331"
			position="right"
			widgetWidth="200px"
			widgetWidthMobile="260px"
			autoOpen={false}
			autoOpenTimer={5000}
			messageBox={false}
			messageBoxTxt="Hi Team, is there any related service available ?"
			iconSize="40"
			iconColor="white"
			iconBgColor="tomato"
			headerIcon="https://proficientdesigners.in/wp-content/themes/pd/img/logo-new.png"
			headerIconColor="pink"
			headerTxtColor="black"
			headerBgColor="tomato"
			headerTitle="Walls of Destiny"
			headerCaption="Online"
			bodyBgColor="#bbb"
			chatPersonName="Support"
			chatMessage={<>Hi there 👋 <br /><br /> How can I help you?</>}
			footerBgColor="#999"
			btnBgColor="yellow"
			btnTxtColor="black"
		/>
  )
}

export default ChatBot