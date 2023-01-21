import { Container } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";
const Layout = ({ children }) => {
  return (
    <div className="h-1/1 w-full bg-cyan-50">
      <Navbar />
      <Container>{children}</Container>
      <Footer />
    </div>
  );
};

export default Layout;
