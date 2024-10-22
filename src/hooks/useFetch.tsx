import {useEffect, useState} from "react";



 export type Country = {
    name: CountryName;
    cca2: string;
    flags: Flags;
    isFavorite: boolean;
}

type CountryName= {
    common: string
}

type Flags = {
    svg: string
}


export type CountryDetails = {
    name: {
        common: string;
        official: string;
        nativeName: {
            [key: string]: {
                official: string;
                common: string;
            };
        };
    };
    population: number;
    region: string;
    subregion: string;
    capital: string[];
    area: number;
    flags: {
        svg: string;
        png: string;
        alt: string;
    };
    languages: {
        [key: string]: string;
    };
    currencies: {
        [key: string]: {
            name: string;
            symbol: string;
        };
    };
    borders: string[];
    timezones: string[];
    car: {
        side: string;
    };
};

export function useFetch() {
const apiUrl = "https://restcountries.com/v3.1/all";

    const [data, setData] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await fetch(apiUrl);
                const data = await response.json();
                const countries = data.map((country: Country) => ({
                    name: country.name,
                    cca2: country.cca2,
                    flags: country.flags,
                    isFavorite: false, // Set the default isFavorite state to false
                }));
                setData(countries);
            } catch (err) {
                setError('Failed to fetch countries.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return { data, loading, error, setData };
}



export function useCountryDetails(searchTerm: string, isCode: boolean = false) {
    const [country, setCountry] = useState<CountryDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCountryDetails = async () => {
            if (!searchTerm) return;

            setLoading(true);
            setError(null);
            try {
                const endpoint = isCode
                    ? `https://restcountries.com/v3.1/alpha/${searchTerm}`
                    : `https://restcountries.com/v3.1/name/${searchTerm}?fullText=true`;

                const response = await fetch(endpoint);
                const data = await response.json();

                if (!data || data.length === 0) {
                    throw new Error('Country not found');
                }

                const countryData = data[0];
                const countryDetails: CountryDetails = {
                    name: countryData.name,
                    population: countryData.population,
                    region: countryData.region,
                    subregion: countryData.subregion,
                    capital: countryData.capital,
                    area: countryData.area,
                    flags: countryData.flags,
                    languages: countryData.languages,
                    currencies: countryData.currencies,
                    borders: countryData.borders,
                    timezones: countryData.timezones,
                    car: {
                        side: countryData.car.side
                    }
                };

                setCountry(countryDetails);
            } catch (err) {
                setError('Failed to fetch country details.');
            } finally {
                setLoading(false);
            }
        };

        fetchCountryDetails();
    }, [searchTerm, isCode]);

    return { country, loading, error };
}