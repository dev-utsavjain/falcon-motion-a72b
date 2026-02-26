export default function Footer() {
  return (
    <footer className="bg-[#050506] border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6 py-8">
        <p className="text-white/50 text-sm text-center">© {new Date().getFullYear()} hi. All rights reserved.</p>
      </div>
    </footer>
  );
}