import chalk from 'chalk';
import app from './app.js';

const port = process.env.PORT || 4000;
app.listen(port, () =>
  console.log(chalk.cyanBright(`Server running in port: ${port}`))
);
