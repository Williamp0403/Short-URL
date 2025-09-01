import { createRoot } from 'react-dom/client'
import { QueryClientProvider, QueryClient, QueryCache, MutationCache } from "@tanstack/react-query";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './AuthProvider.jsx';
import { handleError } from './utils/errors.js';

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleError
  }),
  mutationCache: new MutationCache({
    onError: handleError
  })
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={darkTheme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>,
)
