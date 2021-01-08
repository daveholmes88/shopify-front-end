const prod = {
    url: {
        API_Movies: 'https://tranquil-earth-85240.herokuapp.com/movies',
        API_Nominations: 'https://tranquil-earth-85240.herokuapp.com/nominations',
        API_Users: 'https://tranquil-earth-85240.herokuapp.com/users',
    }
}

const dev = {
    url: {
        API_Movies: 'http://localhost:3000/movies',
        API_Nominations: 'http://localhost:3000/nominations',
        API_Users: 'http://localhost:3000/users',
    }
}

export const config = process.env.NODE_ENV === "development" ? dev : prod

export const API_Key = "a51950c"