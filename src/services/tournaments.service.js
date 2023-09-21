import axios from 'axios';

class TournamentsService {
    constructor() {
        this.api = axios.create({
            baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5005'
        });

        // Automatically set JWT token in the headers for every request
        this.api.interceptors.request.use(config => {
            // Retrieve the JWT token from the local storage
            const storedToken = localStorage.getItem('authToken');

            if (storedToken) {
                config.headers = { Authorization: `Bearer ${storedToken}` };
            }

            return config;
        });
    }

    // POST /api/tournaments
    createtournament = requestBody => {
        return this.api.post('/api/tournaments', requestBody);
    };

    // GET /api/tournaments
    getAlltournaments = () => {
        return this.api.get('/api/tournaments');
    };

    // GET /api/tournaments/:id
    gettournament = id => {
        return this.api.get(`/api/tournaments/${id}`);
    };

    // PUT /api/tournaments/:id
    updatetournament = (id, requestBody) => {
        return this.api.put(`/api/tournaments/${id}`, requestBody);
    };

    // DELETE /api/tournaments/:id
    deletetournament = id => {
        return this.api.delete(`/api/tournaments/${id}`);
    };
}

// Create one instance object
const tournamentsService = new tournamentsService();

export default TournamentsService;