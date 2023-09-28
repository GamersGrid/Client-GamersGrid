import axios from 'axios';

class TournamentsService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005'
        });

       
        this.api.interceptors.request.use(config => {
            
            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config;
        });
    }

    
    createtournament = requestBody => {
        return this.api.post('/api/tournaments', requestBody);
    };

    
    getAlltournaments = () => {
        return this.api.get('/api/tournaments');
    };

    
    gettournament = id => {
        return this.api.get(`/api/tournaments/${id}`);
    };

   
    updatetournament = (id, requestBody) => {
        return this.api.put(`/api/tournaments/${id}`, requestBody);
    };

    
    deletetournament = id => {
        return this.api.delete(`/api/tournaments/${id}`);
    };
}

const tournamentsService = new tournamentsService();

export default TournamentsService;