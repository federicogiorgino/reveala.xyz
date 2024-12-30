import { ThemeToggle } from "./theme-toggle";

function Navbar() {
  return (
    <nav className="flex justify-between items-center py-3 px-4 fixed top-0 left-0 right-0 z-50">
      <ThemeToggle />
    </nav>
  );
}

export { Navbar };
