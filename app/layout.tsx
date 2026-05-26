import "./globals.css";

export const metadata = {
  title: "PM Order Request",
  description: "Submit PM order requests",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
