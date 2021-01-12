const prod = {
    url: {
        API_Movies: 'dave-holmes-shopify-back-end.herokuapp.com/movies',
        API_Nominations: 'dave-holmes-shopify-back-end.herokuapp.com/nominations',
        API_Users: 'dave-holmes-shopify-back-end.herokuapp.com/users',
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

export const API_Key = 'a51950c'