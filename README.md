# Coin Calculator (frontend)

CoinCalculator is a small tool for you to calculate the minimal coins needed for the target amount.

Support multiple denominations `[0.01, 0.05, 0.1, 0.2, 0.5, 1, 2, 5, 10, 50, 100, 1000]` and target amount from 0.00 to 10000.00

This project is the frontend part for [CoinCalculator(backend)](https://github.com/HIT-cenhaoyang/2025_CenHaoyang_backend).

## Getting Started

1. Clone the repository

```
git clone https://github.com/HIT-cenhaoyang/2025_CenHaoyang_frontend
```

2. Start the backend

   Refer to [CoinCalculator(backend)](https://github.com/HIT-cenhaoyang/2025_CenHaoyang_backend)

3. Move into the folder and start frontend

   ### Option 1

   change src/App.js Line 18

   from
   ```
   const response = await fetch(`${process.env.REACT_APP_API_URL}/coins/calculate`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             targetAmount: parseFloat(targetAmount),
             coinDenominations: selectedCoins.map(Number)
           }),
         });
   ```
   to
   ```
   const response = await fetch(`http://localhost:8080/coins/calculate`, {
           method: 'POST',
           headers: {
             'Content-Type': 'application/json',
           },
           body: JSON.stringify({
             targetAmount: parseFloat(targetAmount),
             coinDenominations: selectedCoins.map(Number)
           }),
         });
   ```

   then start the React App
   ```
   cd 2025_CenHaoyang_frontend
   npm start
   ```

   ### Option 2

   You can also use docker to build the app
   
   ```
   docker build -t frontend .
   docker run -p 8080:8080 frontend
   ```

   ### Option 3

   Also create a docker-compose.yml can help to start the backend and frontend at the same time.

   Create a docker-compose.yml

   ```
   services:
     backend:
       image: maxcen/dropwizard-app # or the local backend image name
       ports:
         - "8080:8080"
         - "8081:8081"
       environment:
         - JAVA_OPTS=-Xmx512m
       networks:
         - coins-network
   
     frontend:
       image: maxcen/coins-react # or the local frontend image name
       ports:
         - "3000:3000"
       depends_on:
         - backend
       environment:
         - REACT_APP_API_URL=http://localhost:8080 # change to public IP if deployed on server
       networks:
         - coins-network
   
   networks:
     coins-network:
       driver: bridge
   ```