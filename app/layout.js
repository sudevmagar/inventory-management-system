import './globals.css';

export const metadata = {
  title: 'Inventory Management System',
  description: 'Manage your inventory efficiently',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-200 text-black">
        <div className="min-h-screen">{children}</div>
      </body>
    </html>
  );
}