import { Loading } from './LoadingComponent';
import { Container, Table } from 'reactstrap';

export default function FooterComponent(props) {

    return(
        <Container>
            <center>
                <p>© Copyright {new Date().getFullYear()} Marlon</p>
            </center>
        </Container>
    );
    
}