import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Banner from "./components/pages/frontend/home/Banner";
import Count from "./components/pages/frontend/home/Count";
import Main from "./components/pages/frontend/home/Main";
import Footer from "./components/pages/frontend/partial/Footer";
import { StoreProvider } from "./components/store/storeContext";

const App = () => {
  const queryClient = new QueryClient();
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StoreProvider>
          <Router>
            <Routes>
              {/* <Route index element={<Home />} /> */}
              <Route index element={<Banner />} />
              <Route path="/main" element={<Main />} />
              <Route path="/count" element={<Count />} />
            </Routes>
          </Router>
        </StoreProvider>
      </QueryClientProvider>
      <Footer />
    </>
  );
};

export default App;
