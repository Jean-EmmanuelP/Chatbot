# Mistral AI Chat Clone

This is a tiny replica of the Mistral AI chat, built using Svelte and TailwindCSS.

## Prerequisites (Backend Installation)

1. Clone the backend repository: git clone git@github.com:Jean-EmmanuelP/backend_chatbot.git
2. Set up a virtual environment: python -m venv venv
(You might need to use `python3` for some systems)

3. Activate the virtual environment:
- On macOS:
  ```
  source venv/bin/activate
  ```
- On Windows:
  ```
  venv\Scripts\activate
  ```

4. Install the required packages: pip install mistralai flask python-dotenv flask-cors
(Or use `pip3`)

5. Create a `.env` file and add your Mistral API key:
MISTRAL_API_KEY=your_api_key_here
## Frontend Installation

1. Clone this repository.
2. Install the dependencies and start the development server:
npm i && npm run dev –open