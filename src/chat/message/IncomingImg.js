import './IncomingMessage.css'

function IncomingImg({content,created,type}) {

    var d = new Date();
    if (type === "txt") {
        return (
            <img src={require(".")} className="incoming">
                {content}
                <div>
                    <small style={{fontSize: "70%"}} className="text-muted" id="slast-ma">
                        {created}</small>
                </div>
            </img>
        );
    }
}
export default IncomingImg