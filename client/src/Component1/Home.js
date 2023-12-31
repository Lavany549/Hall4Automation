import React from "react";
import '../css/HomeStyle.css'
import { NavLink } from "react-router-dom";
import hall from '../images/hall.jpg';
import rain from '../images/rain.jpg';
// import squirrel from '../images/squirrel.jpg'
import ground from '../images/ground.jpg'
const Home=()=>{
    return(
        <>
        <div className="mainSection" >
            <div className="contentBox">
                <h1>Hall of Residence 4</h1>
                <p>Almost centrally located amongst the student hostels of IIT Kanpur,
                 Hall 4 enjoys a unique repute of having most of the distinguished alumni 
                 of the institute as its ex-residents. The spirit of Hall 4 lies in its 
                 policy of social activism, intellectual contribution and the diverse 
                 tapestry of cultural fragrance. Said to possess some of the most 
                 forthright group of students, the Hall has in the past taken major 
                 social initiatives and proposed solutions to the institute regarding 
                 various issues including the proposal of a new mess model. The Hall is
                  proud to have the student gymkhana constitution being modelled after its own constitution.</p>
                 
                <div className="btnBox">
                    <div className="btn1">
                        <NavLink to="/about"className="readMore">Read More</NavLink>
                    </div>
                </div>
            </div>
            <div className="imgContainer">
                <img src={hall} alt="hall"></img>
            </div>
        </div>

        <div className="mainSection2" >
            <div className="imgContainer2">
                    <img src={rain} alt="rain"></img>
            </div>
            <div className="contentBox2">
            <h1>About Hall-4</h1>
            <p>The hustle and bustle that goes on in the Hall quad goes on to late nights and sometimes even very early mornings, accompanied by sips of tea and coffee in the Hall 4 canteen. A very different and focused group of students carry on playing shots at the Billiard room, which is the only such facility in any of the student hostels of the institute. While the residents of the Hall have taken patents for their research work and contribute to various symposiums, conferences and journals in academics, an interdisciplinary camaraderie is also seen amongst the residents of the hall.</p>
            <p>Hall-4! The most lively Hall! Hall-4, The Fourth Hall of Residence was established during the early years of formation of the Indian Institute of Technology, Kanpur. It has been since then a residence for Post Graduate students of the institute.</p>           
           </div>
           
            
        </div>
        <div className="mainSection3" >
           
            <div className="contentBox3">
            <p>The hall boasts of having some of the best facilities available inside the campus. The Sports-room with Billiard Table, common room with a TV, a very rich circulation library, a great canteen providing hygienic food and entertainment in form of a T. V, Quadrangle (lawn), Volley ball court, 2 Badminton courts and a basket ball court with the provision of floodlights and a Table Tennis room are there to satisfy all kinds of refreshment needs of the boarders.</p>
            <p>Hall-4 is spanned over 10300 sq. meter area and has total 486 rooms in nine residential blocks (A, B, C, D, E, E1, F, G and H), each block consisting of 54 rooms distributed among three floors.</p>
            <p>Hall 4 not only have the best facilities available but also it allows other hall's students to come and use it. Only Hall-4 has the Billiards table and a well furnished Reading Room (with about 15 newspapers and 30 Magazines).</p>
            </div>
        
            
            <div className="imgContainer3">
                    <img src={ground} alt="ground"></img>
            </div>
            
        </div>
        <div className="mainSection4" >
           
           <div className="contentBox4">
           <h1>Mailing Address</h1>
           <p style={{ whiteSpace: 'pre-line' }}>
            Indian Institute of Technology Kanpur,
            {'\n'}
            Fourth Hall of Residence,
            {'\n'}
            Kanpur (UP),
            {'\n'}
            India - 208016
            </p>
           
           <h1>Telephone numbers</h1>
           <p  style={{ whiteSpace: 'pre-line' }}>+91 512 259 4452
            {'\n'}
           4451 (Hall-4 Office)</p>
           </div>
         
           
       </div>
        
        </>
    );
}
export default Home; 
