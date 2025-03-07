import { generateData } from '../lib/utils/generate-data';

generateData()
  .then(() => {
    console.log('Data generation completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error during data generation:', error);
    process.exit(1);
  });
