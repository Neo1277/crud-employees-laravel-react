//import { Loading } from './LoadingComponent';
import { 
	Button, 
	Form, 
	Input, 
    Label, 
	Container, 
	Row, 
	Col,
} from 'reactstrap';
import React, { useState } from 'react';
import { baseUrl } from '../shared/baseUrl';

export default function SearchClientComponent(props) {
    const [filterBy, setFilterBy] = useState("");
    const [searchWord, setSearchWord] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        const url = baseUrl + 'clients?' + filterBy + '=' + searchWord;
        props.fetchClients(url);
    };

    const handleChangeFilterBy = (e) => {
        setFilterBy(e.target.value);
    };

    const handleChangeSearchWord = (e) => {
        setSearchWord(e.target.value);
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit} data-testid="SearchClientForm">
                <Row>
                    <Col md="1">
                        <Label for="type_of_identity_document_id">
                            Filter by
                        </Label>
                    </Col>
                    <Col md="3">
                        <Input
                            id="filter_by"
                            name="filter_by"
                            type="select"
                            value={filterBy}
                            onChange={handleChangeFilterBy}
                        >
                            <option key="1" value="type_of_identity_document">
                                Type of identity document
                            </option>
                            <option key="2" value="identity_document">
                                Identity document
                            </option>
                            <option key="3" value="first_last_name">
                                First lastname
                            </option>
                            <option key="4" value="second_last_name">
                                Second lastname
                            </option>
                            <option key="5" value="first_name">
                                First name
                            </option>
                            <option key="6" value="other_names">
                                Other names
                            </option>
                            <option key="7" value="email">
                                Email
                            </option>
                            <option key="8" value="country">
                                Country
                            </option>
                            <option key="9" value="area">
                                Area
                            </option>
                        </Input>
                    </Col>
                    <Col md="3">
                        <Input 
                            type="text" 
                            id="search" 
                            name="search"
                            value={searchWord}
                            onChange={handleChangeSearchWord} 
                            required 
                        />
                    </Col>
                    <Col md="3">
                        <Button color="secondary">
                            <i className="fa-solid fa-magnifying-glass"> </i>
                            Search
                        </Button>
                    </Col>
                </Row> 
            </Form>
        </Container>
    );
}