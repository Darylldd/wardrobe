import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FITCHECK — AI Wardrobe Stylist",
  description: "Your personal AI-powered wardrobe stylist",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="noise-overlay">
        <AuthProvider>
          {children}
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#171717",
                color: "#faf7f2",
                border: "1px solid #2e2e2e",
                borderRadius: "4px",
                fontFamily: "'Outfit', sans-serif",
                fontSize: "13px",
                fontWeight: "300",
              },
              success: {
                iconTheme: { primary: "#c8a97e", secondary: "#080808" },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}