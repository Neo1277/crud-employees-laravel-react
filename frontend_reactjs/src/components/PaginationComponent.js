import { 
    Container, 
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';

export default function PaginationComponent(props) {
    const handleSubmit = (e) => {
        e.preventDefault();
        const url = e.currentTarget.href;
        if (!url) return;
        props.fetchClients(url);
    };
    
    return (
        <Container>
            <Pagination aria-label="clients-pagination">
                <PaginationItem disabled={!props.clients.clients.links.first}>
                    <PaginationLink
                        first
                        href={props.clients.clients.links.first}
                        onClick={handleSubmit}
                    />
                </PaginationItem>
                <PaginationItem disabled={!props.clients.clients.links.prev}>
                    <PaginationLink
                        href={props.clients.clients.links.prev}
                        previous
                        onClick={handleSubmit}
                    />
                </PaginationItem>
                <PaginationItem disabled={!props.clients.clients.links.next}>
                    <PaginationLink
                        href={props.clients.clients.links.next}
                        next
                        onClick={handleSubmit}
                    />
                </PaginationItem>
                <PaginationItem disabled={!props.clients.clients.links.last}>
                    <PaginationLink
                        href={props.clients.clients.links.last}
                        last
                        onClick={handleSubmit}
                    />
                </PaginationItem>
            </Pagination>
            <p>Current page: {props.clients.clients.meta.current_page}</p>
            <p>Amount of registers: {props.clients.clients.meta.total}</p>
        </Container>
    );
    
}