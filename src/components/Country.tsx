import { Card, Button } from 'react-bootstrap';
import { FaStar, FaRegStar } from 'react-icons/fa';
import React from "react";

interface CountryCardProps {
    country: {
        name: { common: string };
        flags: { svg: string };
        cca2: string;
        isFavorite: boolean;
    };
    onToggleFavorite: (cca2: string) => void;
}

export const CountryCard = React.memo(({ country, onToggleFavorite }: CountryCardProps) => {    return (
        <Card className="h-100 shadow-sm hover-effect">
            <Card.Img
                variant="top"
                src={country.flags.svg}
                alt={`${country.name.common} flag`}
                style={{ height: '150px', objectFit: 'cover' }}
            />
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="text-center mb-3">{country.name.common}</Card.Title>
                <div className="text-center">
                    <Button
                        active={country.isFavorite}
                        variant="outline-warning"
                        size="sm"
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            onToggleFavorite(country.cca2);
                        }}
                    >
                        {country.isFavorite ? <FaStar /> : <FaRegStar />}
                        {' '}
                        {country.isFavorite ? 'Unmark as Favorite' : 'Mark as Favorite'}
                    </Button>
                </div>
            </Card.Body>
        </Card>
    );
});
