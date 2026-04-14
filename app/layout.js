import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "FitCheck — Your Digital Closet",
  description: "AI-powered wardrobe styling from your own clothes",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
          <Toaster
            position="bottom-center"
            toastOptions={{
              style: {
                background: "white",
                color: "#2c1f14",
                border: "1px solid rgba(107,85,64,0.25)",
                borderRadius: "4px",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: "13px",
                boxShadow: "2px 4px 12px rgba(44,31,20,0.12)",
              },
              success: {
                iconTheme: { primary: "#7a8654", secondary: "white" },
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}