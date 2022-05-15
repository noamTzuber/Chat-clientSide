import './IncomingMessage.css'

function IncomingMessage({content,created}) {
    return (
        <div className="IncomingMessage" style={{wordBreak:"break-all"}}>
            {content}
            <div>
                <small style={{fontSize: "70%"}} className="text-muted" id="slast-ma">
                    {created}</small>
            </div>
        </div>
    );

    // if(type==="img") {
    //
    //     return (
    //         <div className="IncomingMessage">
    //             <img style={{width: "-webkit-fill-available"}} controls src={content}/>
    //             <div>
    //                 <small style={{fontSize: "70%"}} className="text-muted" id="slast-ma">
    //                     {created}</small>
    //             </div>
    //         </div>
    //     );
    // }

    // if(type==="audio") {
    //
    //     return (
    //         <div className="IncomingMessage">
    //             <audio style={{width: "-webkit-fill-available"}} controls src={content}/>
    //             <div>
    //                 <small style={{fontSize: "70%"}} className="text-muted" id="slast-ma">
    //                     {created}</small>
    //             </div>
    //         </div>
    //     );
    // }
    //     if(type==="video") {
    //
    //         return (
    //             <div className="IncomingMessage">
    //                 <video style={{width: "-webkit-fill-available"}} controls src={content}/>
    //                 <div>
    //                     <small style={{fontSize: "70%"}} className="text-muted" id="slast-ma">
    //                         {created}</small>
    //                 </div>
    //             </div>
    //         );
    //     }

}
export default IncomingMessage