# Jet AI Take-Home

## Stack
This project utilizes the following technologies: Next.js, TailwindCSS, Prisma ORM, SQLite, and LangChain.

## Structure
The project follows the standard setup for Next.js with TailwindCSS. Key files and directories include:

- `pages/api/llm.tsx`
- `constants.tsx`
- `page.tsx`
- `schema.prisma`

## Design Choices

### File Structure: LLM Interactions
I chose to convert the default server-side rendering into client-side rendering for `page.tsx`. The request logic for fetching a response from the LLM is placed on an API endpoint, as the component needs to be populated repetitively after the initial load.

For a more complex application, structural changes might involve splitting the Button into its own component if there is data to be fetched on loading the page. However, for the current scope, the main page data is fairly static. The projected usage is more backend/computationally intensive related to analytics, so this shouldn't pose a problem.

### Data Flow
Due to the relatively small scope of the project with few states to manage, there is little use for Redux or extensive state management.

### ORM
For analytics, implementing an ORM is better over raw SQL queries. The added benefits of data validation outweigh potential decreases in performance for this use case.

### CSS Framework
TailwindCSS is used here for its pre-built utility classes, which provides a quick solution for UI. There is room, however, for improvement in class cleanliness.

## Installation

1. Clone the repository.
2. Install dependencies:
    ```bash
    cd jetai-llmhaikuvalidator
    npm install
    ```
3. Set up environment variables:
    - Create a `.env` file with your OpenAI API key:
        ```
        OPENAI_API_KEY=[apikey]
        ```
4. Database Setup:
    - Load vars/schema from schema.prisma and env:
        ```bash
        npx prisma migrate dev --name init
        npx prisma studio