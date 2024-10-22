import React, {createContext, useCallback, useContext, useState} from 'react';
import { Country } from "../hooks/useFetch.tsx";

type CountriesContextType = {
    countries: Country[];
    setCountries: React.Dispatch<React.SetStateAction<Country[]>>;
    toggleFavorite: (cca2: string) => void;
};

const CountriesContext = createContext<CountriesContextType | undefined>(undefined);

export const useCountries = () => {
    const context = useContext(CountriesContext);
    if (!context) {
        throw new Error('useCountries must be used within a CountriesProvider');
    }
    return context;
};

export const CountriesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [countries, setCountries] = useState<Country[]>([]);

    const toggleFavorite = useCallback((cca2: string) => {
        setCountries((prevCountries) =>
            prevCountries.map((country) =>
                country.cca2 === cca2
                    ? { ...country, isFavorite: !country.isFavorite }
                    : country
            )
        );
    }, []);

    return (
        <CountriesContext.Provider value={{ countries, setCountries, toggleFavorite }}>
            {children}
        </CountriesContext.Provider>
    );
};