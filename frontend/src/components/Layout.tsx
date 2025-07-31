import { Box } from "@mui/material";

import Footer from "./Footer";
import Header from "./Header";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  
return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header/>
      <Box sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer/>
    </Box>
  );
}
