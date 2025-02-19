const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const interface = `
╔══════════════════════════════════════════════════╗
║ [📗 📘 📕] - - - - - - - - - - - - - - - - - - - - ║
║                                                  ║
║          Select an option:                       ║
║          ---------------------                   ║
║          1. Option #/dev > A:[src/]              ║ 
║          2. Option #/dev > B:[srv/]              ║
║          3. Option C                             ║
║          4. Quit                                 ║
║                                                  ║
║ Enter your choice:                               ║
║                                                  ║
╚══════════════════════════════════════════════════╝
`;
console.log(interface);

rl.question('', (answer) => {
  switch (answer) {
    case '1':
      console.log('You selected Option A');
      // Execute the command for Option A
      require('child_process').exec('node src/script_a.js', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing Option A: ${error}`);
          return;
        }
        console.log(stdout);
        rl.close();
      });
      break;
    case '2':
      console.log('You selected Option B');
      // Execute the command for Option B
      require('child_process').exec('node srv/script_b.js', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing Option B: ${error}`);
          return;
        }
        console.log(stdout);
        rl.close();
      });
      break;
    case '3':
      console.log('You selected Option C');
      // Execute the command for Option C
      require('child_process').exec('node script_c.js', (error, stdout, stderr) => {
        if (error) {
          console.error(`Error executing Option C: ${error}`);
          return;
        }
        console.log(stdout);
        rl.close();
      });
      break;
    case '4':
      console.log('Goodbye!');
      rl.close();
      break;
    default:
      console.log('Invalid option');
      rl.close();
  }
});