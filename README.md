# Next.js Payment Gateway Assignment

A modern e-commerce checkout implementation with payment processing simulation, built using Next.js, Shadcn UI, and React Context API.

## Features

- Dynamic product listing
- Cart management with quantity controls
- Multi-step checkout process
- Payment form with validation
- Secure tokenization simulation
- Order confirmation flow
- Responsive UI

## Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sagarmee/oneStopShoopingShop.git
   cd oneStopShoopingShop
   
2. **Install dependencies**
    npm install
   
3. **Run the development server**
    npm run dev

4. **Access the application**
    http://localhost:3000

5. **Tokenization Logic**
    
  **Implementation Details**

   **Algorithm**: SHA-256 hashing (via crypto-js)

    **Data Included**:

      Card Number

      Expiry Date

      CVV

      Cardholder Name

  **Process**:

  1. Combine all card details into a single string
  2. Generate SHA-256 hash of the combined string
  3. Convert hash to hexadecimal format
  4. Log/display the resulting token









   
