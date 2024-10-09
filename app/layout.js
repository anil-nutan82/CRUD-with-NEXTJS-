import '../app/globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>Product CRUD</title>
      </head>
      <body className="bg-gray-100">
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
