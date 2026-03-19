import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const isUserOrOrgPageRepo = /\.github\.io$/i.test(repositoryName);

const resolveBasePath = () => {
  if (!process.env.GITHUB_ACTIONS) {
    return '/';
  }

  if (!repositoryName || isUserOrOrgPageRepo) {
    return '/';
  }

  return `/${repositoryName}/`;
};

export default defineConfig({
  plugins: [react()],
  base: resolveBasePath()
});
