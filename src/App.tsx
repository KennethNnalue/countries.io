import "bootstrap/dist/css/bootstrap.min.css";

import { CountryList } from "./components/CountryList.tsx";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useFetch } from "./hooks/useFetch.tsx";
import { CountriesProvider } from "./contexts/CountriesContext.tsx";
import { useEffect } from "react";
import { useCountries } from "./contexts/CountriesContext.tsx";
import {CountryDetails} from "./components/CountryDetails.tsx";

const CountriesDataLoader = () => {
    const { data, loading, error } = useFetch();
    const { setCountries } = useCountries();

    useEffect(() => {
        if (data) {
            setCountries(data);
        }
    }, [data, setCountries]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return null;
};



function App() {
    return (
        <Router>
            <CountriesProvider>
                <CountriesDataLoader />
                <Routes>
                    <Route path="/" element={<CountryList />} />
                    <Route path="/country/:cca2" element={<CountryDetails />} />
                    <Route path="/country/search/:name" element={<CountryDetails />} />
                </Routes>
            </CountriesProvider>
        </Router>
    );
}

export default App;