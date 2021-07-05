import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import { SnackbarProvider } from 'src/providers/snackbar';
import ProductsListPage from 'src/views/Products';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      staleTime: Infinity,
      refetchOnWindowFocus: false,
      refetchOnMount: false,
    },
  },
});

const theme = createMuiTheme();

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <QueryClientProvider client={queryClient}>
        <SnackbarProvider>
          <ProductsListPage />
        </SnackbarProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
