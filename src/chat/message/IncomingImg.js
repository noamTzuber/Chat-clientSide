import './IncomingMessage.css'

function IncomingImg({content,created}) {

    var d = new Date();

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
export default IncomingImg