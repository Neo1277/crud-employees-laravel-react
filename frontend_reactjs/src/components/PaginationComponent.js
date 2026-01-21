import { 
    Container, 
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';
import { Loading } from './LoadingComponent';

export default function PaginationComponent(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = e.target.href;
        props.fetchClients(url);
    };
    
    if (props.clients.isLoading) {
        
        return(
            <Loading />
        );
    }
    else if (props.clients.errorMessage) {
        return(
            <h4>{props.clients.errorMessage}</h4>
        );
    }
    else{
        return (
            <Container>
                <Pagination aria-label="Page navigation example">
                    <PaginationItem disabled={
                        props.clients.clients.links.first === null ? true : false
                    }>
                        <PaginationLink
                            first
                            href={props.clients.clients.links.first}
                            onClick={handleSubmit}
                        />
                    </PaginationItem>
                    <PaginationItem disabled={
                        props.clients.clients.links.prev === null ? true : false
                    }>
                        <PaginationLink
                            href={props.clients.clients.links.prev}
                            previous
                            onClick={handleSubmit}
                        />
                    </PaginationItem>
                    <PaginationItem disabled={
                        props.clients.clients.links.next === null ? true : false
                    }>
                        <PaginationLink
                            href={props.clients.clients.links.next}
                            next
                            onClick={handleSubmit}
                        />
                    </PaginationItem>
                    <PaginationItem disabled={
                        props.clients.clients.links.last === null ? true : false
                    }>
                        <PaginationLink
                            href={props.clients.clients.links.last}
                            last
                            onClick={handleSubmit}
                        />
                    </PaginationItem>
                </Pagination>
            </Container>
        );
    }
}