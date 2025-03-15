import { PropsWithChildren } from 'react';

import Header from '../Header';

function Layout({ children }: PropsWithChildren) {
  return (
    <div className="bg-gradient-to-br from-background to-muted">
      <Header />
      <main className="min-h-screen container mx-auto px-4 py-8">{children}</main>
      <footer className="backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 text-center text-gray-200">
          <p className="py-2 text-muted-foreground">Made with ❤ by ddthien</p>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
