import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'https://leetcode.com',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        headers: {
          'Origin': 'https://leetcode.com',
          'Referer': 'https://leetcode.com'
        }
      },
      '/cse':{
        target:'http://localhost:8080',
        changeOrigin:true,
        secure:false,
        // rewrite:(path)=>path.replace(/^\/cse/,''),
        headers:{
          'Content-Type':'application/json',
          'Origin':'http://localhost:8080',
          'Referer':'http://localhost:8080'
        }
      }
    }
  }
})


 