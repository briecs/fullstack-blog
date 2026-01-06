import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [IsLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const abortFetch = new AbortController();
        
        fetch(url, { signal: abortFetch.signal })
        .then(res => {
            if (!res.ok) {
                throw Error('Data not found.');
            }
            return res.json();
        })
        .then(data => {
            setData(data);
            setIsLoading(false);
            setError(null);
        })
        .catch(e => {
            if (e.name === "AbortError") {
                console.log("fetch stopped");
            }
            else {
                setError(e.message);
                setIsLoading(false);
            }
        });
        

        return () => abortFetch.abort();
    }, [url]);

    return { data, IsLoading, error };
}
 
export default useFetch;