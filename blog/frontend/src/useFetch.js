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
                return res.json().then(msg => {
                    const errordata = {
                        message: msg.msg,
                        code: res.status
                    };
                throw errordata;
                });
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