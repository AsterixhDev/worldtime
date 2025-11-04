import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import * as path from 'path';

// This Vite config enables the React plugin and the tsconfig paths plugin
// and also defines an explicit alias fallback so imports like
// `components/AppIcon` are resolved to `src/components/AppIcon`.
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  resolve: {
    alias: {
      // ensure Vite resolves the alias even if tsconfig plugin is not working
      // include both the bare key and the trailing-slash form so imports like
      // `components/ScrollToTop` reliably match on all platforms.
      components: path.resolve(__dirname, 'src/components'),
      'components/': path.resolve(__dirname, 'src/components') + '/',
    },
  },
});
