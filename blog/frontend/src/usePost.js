import { useState } from "react";

const usePost = (url) => {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ error, setError ] = useState(null);
    const [ errorcode, setErrorcode ] = useState(null);

    const startPost = (data) => {
        setIsLoading(true);
        setError(null);
        setErrorcode(null);
        const access_token = localStorage.getItem('access_token')
        let headers = {'Content-Type': 'application/json'}

        if (access_token) {
            headers['Authorization'] = `Bearer ${access_token}`
        }

        return fetch(url, {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        }).then(res => {
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
        }).then(postdata => {
            setIsLoading(false);
            return postdata;
        }).catch(e => {
            setError(e.message);
            setErrorcode(e.code);
            setIsLoading(false);
            return null;
        });
    }
    
    return({ startPost, isLoading, error, errorcode });
}
 
export default usePost;