import './Outgoing.css'

function Outgoing({content,created,type}) {

    if(type==="img") {

        return (
            <div className="Outgoing">
                <img style={{width: "-webkit-fill-available"}} controls src={content}/>
                <div>
                    <small style={{fontSize: "70%"}} className="text-muted" id="slast-ma">
                        {created}</small>
                </div>
            </div>
        );
    }


    if(type==="txt")
    {
    return (
            <div className="Outgoing" style={{wordBreak:"break-all"}}>
                {content}
                <div>
                    <small style={{fontSize: "70%"}} className="text-muted" id="slast-ma">
                        {created}</small>
                </div>
            </div>
    );
        }
    if(type==="audio") {

        return (
            <div className="Outgoing">
                <audio style={{width: "-webkit-fill-available"}} controls src={content}/>
                <div>
                    <small style={{fontSize: "70%"}} className="text-muted" id="slast-ma">
                        {created}</small>
                </div>
            </div>
        );
    }
        if(type==="video") {

            return (
                <div className="Outgoing">
                    <video style={{width: "-webkit-fill-available"}} controls src={content}/>
                    <div>
                        <small style={{fontSize: "70%"}} className="text-muted" id="slast-ma">
                            {created}</small>
                    </div>
                </div>
            );
        }


        
        

}
export default Outgoing