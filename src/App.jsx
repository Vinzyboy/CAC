import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Count from "./components/pages/frontend/home/Count";
import Home from "./components/pages/frontend/home/Home";
import Main from "./components/pages/frontend/home/Main";
import { StoreProvider } from "./components/store/storeContext";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <StoreProvider>
        <Router>
          <Routes>
            <Route index element={<Home />} />
            <Route path="/Main" element={<Main />} />
            <Route path="/Count" element={<Count />} />
          </Routes>
        </Router>
      </StoreProvider>
    </QueryClientProvider>
  );
};

export default App;
