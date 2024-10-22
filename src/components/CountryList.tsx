import React, { useState, useMemo } from 'react';
import { Container, Row, Col, Form, InputGroup, Button, ButtonGroup, ToggleButton } from 'react-bootstrap';
import { useCountries } from '../contexts/CountriesContext';
import { CountryCard } from "./Country.tsx";
import { Link, useNavigate } from "react-router-dom";
import './CountryList.css';

type FilterType = 'all' | 'favorite' | 'unfavorite';

export function CountryList() {
    const { countries, toggleFavorite } = useCountries();
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState<FilterType>('all');
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/country/search/${searchTerm}`);
        }
    };

    const filteredCountries = useMemo(() => {
        return countries.filter(country => {
            if (filter === 'favorite') return country.isFavorite;
            if (filter === 'unfavorite') return !country.isFavorite;
            return true;
        });
    }, [countries, filter]);

    return (
        <div className="country-list-container">
            <div className="sticky-header">
                <Container fluid>
                    <Row className="mb-4">
                        <Col md={6} className="mx-auto">
                            <Form onSubmit={handleSearch}>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Search for a country..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                    <Button type="submit" variant="primary">Search</Button>
                                </InputGroup>
                            </Form>
                        </Col>
                    </Row>
                    <Row className="mb-4">
                        <Col className="d-flex justify-content-center">
                            <ButtonGroup>
                                <ToggleButton
                                    id={`filter-all`}
                                    type="radio"
                                    variant="outline-primary"
                                    name="filter"
                                    value="all"
                                    checked={filter === 'all'}
                                    onChange={(e) => setFilter(e.currentTarget.value as FilterType)}
                                >
                                    All Countries
                                </ToggleButton>
                                <ToggleButton
                                    id={`filter-favorite`}
                                    type="radio"
                                    variant="outline-primary"
                                    name="filter"
                                    value="favorite"
                                    checked={filter === 'favorite'}
                                    onChange={(e) => setFilter(e.currentTarget.value as FilterType)}
                                >
                                    Favorites
                                </ToggleButton>
                                <ToggleButton
                                    id={`filter-unfavorite`}
                                    type="radio"
                                    variant="outline-primary"
                                    name="filter"
                                    value="unfavorite"
                                    checked={filter === 'unfavorite'}
                                    onChange={(e) => setFilter(e.currentTarget.value as FilterType)}
                                >
                                    Unfavorites
                                </ToggleButton>
                            </ButtonGroup>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="country-cards">
                <Container fluid>
                    <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-4">
                        {filteredCountries.length > 0 ? (
                            filteredCountries.map((country) => (
                                <Col key={country.cca2}>
                                    <Link to={`/country/${country.cca2}`} style={{ textDecoration: 'none' }}>
                                        <CountryCard
                                            country={country}
                                            onToggleFavorite={toggleFavorite}
                                        />
                                    </Link>
                                </Col>
                            ))
                        ) : (
                            <Col>
                                <p>No countries to display.</p>
                            </Col>
                        )}
                    </Row>
                </Container>
            </div>
        </div>
    );
}