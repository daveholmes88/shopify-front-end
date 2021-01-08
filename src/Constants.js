const prod = {
    url: {
        API_Movies: 'https://tranquil-earth-85240.herokuapp.com/ratings',
        API_Nominations: 'https://tranquil-earth-85240.herokuapp.com/breweries',
        API_Users: 'https://tranquil-earth-85240.herokuapp.com/users',
    }
}

const dev = {
    url: {
        API_Movies: 'http://localhost:3000/ratings',
        API_Nominations: 'http://localhost:3000/breweries',
        API_Users: 'http://localhost:3000/users',
    }
}

export const config = process.env.NODE_ENV === "development" ? dev : prod

export const API_Key = "a51950c"