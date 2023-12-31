import React from "react";
import '../css/AboutStyle.css'
import mess from '../images/mess.jpg';
import cultural from '../images/cultural.jpg';
import canteen from '../images/canteen.jpg';
import projector from '../images/projector.jpg';
import ground from '../images/ground.jpg';
function About(){
    
    return(
        <>
         <div className="mainContent" >
            <div className="ContentBox">
                <h1>Mess</h1>
                <p>The mess committee headed by the chairman consists of mess accounts secretary, mess store and supply secretary and both the general body representatives. The committee monitors the mess which caters to the boarding requirements of the inmates. The residents are provided breakfast, lunch and dinner. The menu for all the meals is decided by the mess-menu committee (consisting of resident representatives from different areas of the country) in consultation with the mess-management staff and based on the suggestions of inmates as well as seasonal requirements.</p>
                <p><i>Special meals are served on Friday nights as well as on selected occasions like national festivals, new year day, Holi, Diwali and Id.</i></p>
                <p>The mess has a spacious and well-ventilated dinning room, a well-equipped and hygienically maintained kitchen, a cold storage room for perishable items and a storeroom for other items. The menu has popular dishes from different regions of the country in order to serve the needs of the hall's mixed population.</p>         
                <p>Most of the hall residents are charged the mess bill (on a monthly basis) for which a fixed amount gets deducted from the institute assistantship received by them while the balance is paid by the residents through cheque.</p>           
                  
            </div>
            <div className="imageContainer">
                <img src={mess} alt="mess"></img>
            </div>
            </div>

            <div className="mainContent2" >
            <div className="imageContainer2">
                <img src={mess} alt="mess"></img>
            </div>
            <div className="ContentBox2">
                <h1>Accounts</h1>
                <ul className="committee-list">
                <li>Chairman, Accounts Committee (also a member of the HEC)</li>
                <li>President (also a member of the HEC)</li>
                <li>Chairman, Mess Committee (also a member of the HEC)</li>
                <li>Mess Accounts Secretary (also a member of the Mess Committee)</li>
                <li>Both the General body representatives (also members of the HEC)</li>
                <li>One experienced resident</li>
                </ul>
                <p>
                    The committee operates to assist the HEC in the accounts-related matters of the hall.
                </p>   
            </div>
            
            </div>


            <div className="mainContent" >
            <div className="ContentBox">
                <h1>Computer Room</h1>
                <p>
                Imagine our life without computers! It was not that serious thing at least 20 years before.
                But now, everything is computerized including our pastimes by the great masterplans of FACEBOOK & Twitters.
                </p>
                <p>
                    In our hall, we facilitated the Computer Room with New High-Processing Desktops with all GNU/Linux Operating systems
                    which are more user-friendly than the insecure/Antivirus dependent/boring Microsoft Windows, to feed our geek-natured IITians.
                    We encourage everyone to learn the Free softwares through spoken-Tutorials.org by DST, India.
                </p>
                <p>
                    IIT Kanpur campus Network-related Information for new Students <a href="https://www.iitk.ac.in/hall4/infoiitk.pdf">here</a>.
                </p>
                <h2>Computer Room Committee</h2>
                <p style={{ whiteSpace: 'pre-line' }}>
                1 Mirtunjay Kumar
                {'\n'}
                2 Vivek Verma
                {'\n'}
                3 Sudheer Kumar
                {'\n'}
                4 BalaSubrahmanyam
                {'\n'}
                5 Vijay Jain
                </p>
                
            </div>
            <div className="imageContainer">
                <img src={mess} alt="mess"></img>
            </div>
            </div>

            <div className="mainContent2" >
            <div className="imageContainer2">
                <img src={cultural} alt="cultural"></img>
            </div>
            
            <div className="ContentBox2">
                <h1>Cultural</h1>
                
                <p>As it deals with music, arts, films photography...etc it is the popular face of the HEC. Hall owns a projector and a music system , which is unique among the halls. The committee coordinates and conduct various festivals (national and regional festivals) and celebrations.</p>   
            </div>
            <div className="imageContainer1">
                <img src={projector} alt="projector"></img>
            </div>
            
            </div>

            <div className="mainContent" >
            <div className="ContentBox">
                <h1>Games</h1>
               <p>Games and sports are the structured activities, usually undertaken for enjoyment and sometimes used as an educational tool. Games are distinct from work, which is usually carried out for remuneration and from art, which is more concerned with the expression of ideas.</p>
               <p>In our hall we organize almost all the games events like cricket, football, volleyball, badminton, TT, basketball, cards, chess, carrom and billiards also. In whole IIT Kanpur only Hall-4 has facility to provide billiards to their residents.</p>
               <p>Throughout the year we organize all the Games events at appropriate time. The main aim of games committee of hall is to provide a change from the routine activities to the residents.</p>
               <h2>Games Coordinators</h2>
                <p style={{ whiteSpace: 'pre-line' }}>
                    1 Badminton: Maneesh K & Ravindra N
                    {'\n'}
                    2 Basketball: Ishant Jain
                    {'\n'}
                    3 Billiards: Pradeep S Chauhan
                    {'\n'}
                    4 Chess: Ravi Shankar
                    {'\n'}
                    5 Cricket: Digendranath S
                    {'\n'}
                    6 Football: Tanmay K
                    {'\n'}
                    7 Table Tennis: Shailendra K
                    {'\n'}
                    8 Volleyball: Vivek Meena
                    {'\n'}
                    9 Carrom: Patel Soham
                </p>
            </div>
            <div className="imageContainer">
                <img src={ground} alt="ground"></img>
            </div>
            </div>

            <div className="mainContent2" >
            <div className="imageContainer2">
                <img src={canteen} alt="canteen"></img>
            </div>
            <div className="ContentBox2">
                <h1>Canteen</h1>
                
                <p>Hall-4 canteen is generally known as "The Best Canteen in IITK". The said complement is attributed to its food quality, taste and service. It is a private canteen running on contract basis which gets renewed every year. Currently Mr. Ashok Singh is the contractor</p>
                <p>Our canteen is going through a renovation phase and we hope it will bring out something new...</p>
                <p>Feel free to contact for any queries, suggestions, feedback or complaints.....</p>   
            </div>
            
            </div>


            
        
       
        </>
    );
}
export default About; 
