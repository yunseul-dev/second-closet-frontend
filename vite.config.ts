import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import viteImagemin from '@vheemstra/vite-plugin-imagemin';
import imageminWebp from 'imagemin-webp';
import imageminSvgo from 'imagemin-svgo';
import imageminMozjpeg from 'imagemin-mozjpeg';
import imageminPngQuant from 'imagemin-pngquant';
import imageminGifSicle from 'imagemin-gifsicle';

export default defineConfig({
  plugins: [
    react(),
    viteImagemin({
      plugins: {
        jpg: imageminMozjpeg(),
        png: imageminPngQuant(),
        gif: imageminGifSicle(),
        svg: imageminSvgo(),
      },
      makeWebp: {
        plugins: {
          jpg: imageminWebp(),
          png: imageminWebp(),
          jpeg: imageminWebp(),
        },
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id: string) => {
          if (id.includes('node_modules')) {
            const module = id.split('node_modules/').pop().split('/')[0];
            return `vendor/${module}`;
          }
        },
      },
    },
    chunkSizeWarningLimit: 1024 * 500,
  },
});
