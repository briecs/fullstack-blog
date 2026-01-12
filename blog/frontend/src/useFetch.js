import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [IsLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [errorcode, setErrorcode] = useState(null);

    useEffect(() => {
        const abortFetch = new AbortController();
        
        fetch(url, { signal: abortFetch.signal })
        .then(res => {
            if (!res.ok) {
                const errordata = {
                    message: '',
                    code: res.status
                };
                if (res.status === 404) {
                    errordata.message = 'That blog does not exist.';
                }
                else if (res.status === 500) {
                    errordata.message = 'Server is not responding.';
                }
                else {
                    errordata.message = 'Data not found.';
                }
                throw errordata;
            }            
            return res.json();
        })
        .then(data => {
            setData(data);
            setIsLoading(false);
            setError(null);
            setErrorcode(null);
        })
        .catch(e => {
            if (e.name === "AbortError") {
                console.log("fetch stopped");
            }
            else {
                setError(e.message);
                setErrorcode(e.code || 500);
                setIsLoading(false);
            }
        });

        return () => abortFetch.abort();
    }, [url]);

    return { data, IsLoading, error, errorcode };
}
 
export default useFetch;