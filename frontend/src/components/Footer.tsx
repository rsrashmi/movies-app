import { Box, IconButton, Stack, Typography } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import PinterestIcon from "@mui/icons-material/Pinterest";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
export default function Footer() {
  return (
    <Box component="footer" py={2} textAlign="center" bgcolor="#1e1e2f">
        <Stack direction="row" justifyContent="center" spacing={2} mb={2}>
        <IconButton sx={{ color: "#aaa" }}><FacebookIcon /></IconButton>
        <IconButton sx={{ color: "#aaa" }}><XIcon /></IconButton>
        <IconButton sx={{ color: "#aaa" }}><InstagramIcon /></IconButton>
        <IconButton sx={{ color: "#aaa" }}><YouTubeIcon /></IconButton>
        <IconButton sx={{ color: "#aaa" }}><PinterestIcon /></IconButton>
        <IconButton sx={{ color: "#aaa" }}><LinkedInIcon /></IconButton>
      </Stack>

      <Typography
  variant="body2"
  sx={{ color: "white", fontSize: "0.75rem", px: 2 }}
>
  Copyright © {new Date().getFullYear()} Movies and TV Shows. All Rights Reserved.
</Typography>
      </Box>
  );
}
