import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-8 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-3">
        <p className="text-white font-semibold">Zyeebis Place</p>
        <p className="text-sm">
          Choose your preferred delivery date at checkout
        </p>
        <p className="text-sm">
          <a href="tel:+2347050337273" className="hover:text-white">
            +234 705 033 7273
          </a>
        </p>
        <div className="flex justify-center gap-4 text-sm">
          <a
            href="https://wa.me/2347050337273"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            WhatsApp
          </a>
          <Link href="/admin" className="hover:text-white">
            Admin
          </Link>
        </div>
        <p className="text-xs text-gray-600 mt-4">
          &copy; {new Date().getFullYear()} Zyeebis Place. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
