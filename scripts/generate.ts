import { generateData } from '../lib/utils/generate-data';

// Set OpenAI API key from environment variable
if (!process.env.OPENAI_API_KEY) {
  console.error('Error: OPENAI_API_KEY environment variable is required');
  process.exit(1);
}

generateData()
  .then(() => {
    console.log('Data generation completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during data generation:', error);
    process.exit(1);
  });
