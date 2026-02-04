import { Container, Pagination, PaginationItem, PaginationLink } from 'reactstrap';

export default function PaginationComponent({ links, meta, onPageChange }) {
    const handleClick = (e) => {
        e.preventDefault();
        const url = e.currentTarget.href;
        if (!url) return;
        onPageChange(url);
    };

    return (
        <Container>
            <Pagination aria-label="clients-pagination">
                <PaginationItem disabled={!links.first}>
                    <PaginationLink
                        first
                        href={links.first}
                        onClick={handleClick}
                        aria-label="First"
                    />
                </PaginationItem>
                <PaginationItem disabled={!links.prev}>
                    <PaginationLink
                        previous
                        href={links.prev}
                        onClick={handleClick}
                        aria-label="Previous"
                    />
                </PaginationItem>
                <PaginationItem disabled={!links.next}>
                    <PaginationLink
                        next
                        href={links.next}
                        onClick={handleClick}
                        aria-label="Next"
                    />
                </PaginationItem>
                <PaginationItem disabled={!links.last}>
                    <PaginationLink
                        last
                        href={links.last}
                        onClick={handleClick}
                        aria-label="Last"
                    />
                </PaginationItem>
            </Pagination>

            {meta && (
                <>
                    <p>Current page: {meta.current_page}</p>
                    <p>Total items: {meta.total}</p>
                </>
            )}
        </Container>
    );
}