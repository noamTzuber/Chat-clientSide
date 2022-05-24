import './Contact.css'

function Contact(props) {
    let p;
    // if(props.img ==="" ){
    //     return (
    //         <div className="contact">
    //             <div style={{width:"70px", height:"70px"}}></div>
    //             <div className="position-absolute top-50 start-50 translate-middle">{props.name}</div>
    //         </div>
    //     );
    //
    // }else {
    //     p = props.img
        var pic = require("../../DB/profilePictures/diff.jpg");
        return (
            <div className="contact">
                <div style={{backgroundImage: `url(${pic})`, backgroundSize:"cover", width:"70px", height:"70px", borderRadius:"50%", clipPath: "circle()", backgroundPosition: "center center"}}></div>
                <span className="position-absolute top-50 start-50 translate-middle" style={{fontSize:"170%"}}>{props.name}</span>
                <button type="button" class="btn btn-primary position-absolute top-50" style = {{right: "2%" , top:"100%"}}>Rate us!</button>


            </div>
        );
}
export default Contact