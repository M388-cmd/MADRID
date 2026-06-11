import fs from 'fs';
import git from 'isomorphic-git';

async function run() {
  try {
    const dir = process.cwd();
    const commits = await git.log({ fs, dir, depth: 5 });
    console.log("Commits:", commits.map(c => c.commit.message));
    
    // Check if public/metro.jfif exists in the previous commit
    await git.checkout({
      fs,
      dir,
      filepaths: ['images.jfif', 'a64677becf28a53381b8e5d87fe8b4da.jpg', 'public/metro.jfif', 'public/cercanias.jpg']
    });
    console.log("Checked out files if they existed.");
  } catch (err) {
    console.error(err);
  }
}
run();
