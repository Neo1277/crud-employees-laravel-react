import { Spinner } from 'reactstrap';

//It shows spinner
export const Loading = () => {
    return(
        <div className="col-12">
            {/*<span className="fa fa-spinner fa-pulse fa-3x fa-fw text-primary"></span>*/}
            <Spinner       
                animation="border"
                color="primary"
                role="status"
                style={{
                    height: "100px",
                    width: "100px",
                    margin: "auto",
                    display: "block",
                }} 
            />
            <p              
            style={{
                    height: "100px",
                    width: "100px",
                    margin: "auto",
                    display: "block",
            }} 
            >Loading . . .</p>
        </div>
    );
};