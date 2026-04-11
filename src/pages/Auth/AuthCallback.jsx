import { useEffect } from "react";
import { useNavigate,useSearchParams } from "react-router-dom";
import { useUser } from "../../context/UserContext";
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

const AuthCallback = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { setUser } = useUser();
    useEffect(() => {
        const token=searchParams.get('token');
        const error=searchParams.get('error');
        if(error==='only_iut_emails'){
            navigate('/login?error=only_iut_emails');
        }

        if(!token){
            navigate('/login?error=no_token');
            return;

        }

        localStorage.setItem('token', token);

        axios.get(`${API_BASE_URL}/users/profile`,{
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            setUser(response.data.user);
            navigate('/dashboard');
        })
        .catch((error) => {
            
            localStorage.removeItem('token');
            navigate('/login?error=auth_failed');
        });
    }, []);
    return (
        <div style={{textAlign: 'center', marginTop: '4rem'}}>
            <p>Signing you in... </p>
        </div>
    );
}

export default AuthCallback;