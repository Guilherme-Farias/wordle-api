import { exec } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';

// TODO: according to https://vitest.dev/guide/environment#custom-environment it is no longer necessary to link, but from my tests I was unable to make it be for a specific file

const packagesDir = __dirname;
fs.readdir(packagesDir, async (err, files) => {
  if (err) {
    console.error(`Error reading directory: ${err.message}`);
    process.exit(1);
  }

  for (const file of files) {
    const packagePath = path.join(packagesDir, file);

    if (fs.lstatSync(packagePath).isDirectory()) {
      const packageJsonPath = path.join(packagePath, 'package.json');

      if (fs.existsSync(packageJsonPath)) {
        try {
          await exec('npm link', { cwd: packagePath });
          await exec(`npm link ${file}`, { cwd: process.cwd() });
        } catch {
          console.error(`Failed to link package ${file}`);
        }
      }
    }
  }
});
