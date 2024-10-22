import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Button, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaGlobe, FaLanguage, FaMoneyBillWave, FaMapMarkerAlt } from 'react-icons/fa';
import { useCountryDetails } from "../hooks/useFetch.tsx";

export function CountryDetails() {
    const { cca2, name } = useParams<{ cca2?: string; name?: string }>();
    const searchTerm = cca2 || name || '';
    const isCode = !!cca2;
    const { country, loading, error } = useCountryDetails(searchTerm, isCode);
    const navigate = useNavigate();

    if (loading) {
        return (
            <Container className="my-5">
                <Alert variant="info">Loading country details...</Alert>
            </Container>
        );
    }

    if (error || !country) {
        return (
            <Container className="my-5">
                <Alert variant="danger">
                    <Alert.Heading>Error loading country details</Alert.Heading>
                    <p>{error || "Country not found"}</p>
                    <hr />
                    <div className="d-flex justify-content-between">
                        <Button onClick={() => navigate(-1)} variant="outline-danger">
                            <FaArrowLeft className="me-2" />
                            Go Back
                        </Button>
                        <Link to="/">
                            <Button variant="outline-primary">
                                View All Countries
                            </Button>
                        </Link>
                    </div>
                </Alert>
            </Container>
        );
    }

    return (
        <Container className="my-5">
            <Card className="shadow-lg">
                <Card.Header className="bg-primary text-white py-3">
                    <h2 className="mb-0">{country.name.common}</h2>
                    {country.name.official !== country.name.common && (
                        <small>{country.name.official}</small>
                    )}
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md={6} className="mb-4">
                            <img
                                src={country.flags.svg}
                                alt={`${country.name.common} flag`}
                                className="img-fluid rounded shadow"
                            />
                        </Col>
                        <Col md={6}>
                            <h4 className="mb-3">Quick Facts</h4>
                            <DetailRow icon={FaMapMarkerAlt} label="Capital" value={country.capital.join(', ')} />
                            <DetailRow icon={FaGlobe} label="Region" value={`${country.subregion}, ${country.region}`} />
                            <DetailRow icon={FaLanguage} label="Languages" value={Object.values(country.languages).join(', ')} />
                            <DetailRow icon={FaMoneyBillWave} label="Currencies" value={Object.values(country.currencies).map(c => `${c.name} (${c.symbol})`).join(', ')} />
                        </Col>
                    </Row>
                    <Row className="mt-4">
                        <Col md={6}>
                            <h4 className="mb-3">Demographics</h4>
                            <DetailRow label="Population" value={country.population.toLocaleString()} />
                            <DetailRow label="Area" value={`${country.area.toLocaleString()} km²`} />
                        </Col>
                        <Col md={6}>
                            <h4 className="mb-3">Additional Info</h4>
                            <DetailRow label="Timezones" value={country.timezones.join(', ')} />
                            <DetailRow label="Driving Side" value={country.car.side} />
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer className="text-center py-3">
                    <Link to="/">
                        <Button variant="primary" size="lg">
                            <FaArrowLeft className="me-2" />
                            Back to All Countries
                        </Button>
                    </Link>
                </Card.Footer>
            </Card>
        </Container>
    );
}

const DetailRow: React.FC<{ icon?: React.ElementType, label: string, value: string }> = ({ icon: Icon, label, value }) => (
    <Row className="mb-2">
        <Col xs={4} className="fw-bold text-muted">
            {Icon && <Icon className="me-2" />}
            {label}:
        </Col>
        <Col xs={8}>{value}</Col>
    </Row>
);