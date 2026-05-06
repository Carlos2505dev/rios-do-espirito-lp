import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState, useEffect, Suspense, lazy } from "react";
const StaggeredMenu = lazy(() => import("./ui/StaggeredMenu").then(m => ({ default: m.StaggeredMenu })));
import { CheckCheck } from "lucide-react";

declare global {
  interface Window {
    __navigate?: (href: string) => void;
  }
}

const Navbar = () => {
    const [hidden, setHidden] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0;
        if (latest > previous && latest > 150) {
            setHidden(true);
            setIsMenuOpen(false);
        } else {
            setHidden(false);
        }
    });

    // Close mobile menu when resizing to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768 && isMenuOpen) {
                setIsMenuOpen(false);
            }
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMenuOpen]);

    const menuItems = [
        { name: 'INÍCIO', href: "#inicio" },
        { name: 'CRE', href: "#sobre" },
        { name: 'PROGRAMAÇÃO', href: "#programacao" },
    ];

    const staggeredItems = menuItems.map(item => ({
        label: item.name,
        ariaLabel: `Ir para ${item.name}`,
        link: item.href
    }));

    const handleNavigate = (href: string) => {
        if (href.startsWith('#')) {
            const element = document.querySelector(href);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
                // Update URL without jump
                window.history.pushState(null, '', href);
                return;
            }
        }
        if (window.__navigate) {
            window.__navigate(href);
        } else {
            window.location.href = href;
        }
    };

    return (
        <>
            {/* Responsive CSS */}
            <style>{`
                .desktop-nav-wrapper { display: flex; }
                .mobile-nav-wrapper { display: none; }
                
                @media (max-width: 768px) {
                    .desktop-nav-wrapper { display: none !important; }
                    .mobile-nav-wrapper { display: block !important; }
                }

                .nav-contact-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background-color: white;
                    color: #090C13;
                    border: none;
                    transition: all 0.3s ease;
                }

                .nav-contact-btn:hover,
                .nav-contact-btn:active {
                    background-color: #ff6b00 !important;
                    transform: translateY(-2px);
                    color: white !important;
                }
            `}</style>

            {/* Desktop Navbar */}
            <div className="desktop-nav-wrapper">
                <motion.div
                    variants={{
                        visible: { y: 0, opacity: 1 },
                        hidden: { y: -100, opacity: 0 },
                    }}
                    animate={hidden ? "hidden" : "visible"}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="fixed top-4 w-full z-50 px-4 flex justify-center"
                >
                    <div
                        className="bg-[#090C13]/60 backdrop-blur-md rounded-full py-3 flex items-center justify-between shadow-lg border border-[#1C2030] transition-all duration-300 ease-in-out w-auto"
                        style={{ maxWidth: '1200px', paddingLeft: '2rem', paddingRight: '2rem' }}
                    >
                        {/* Logo */}
                        <div className="flex items-center shrink-0">
                            <a
                                href="/"
                                className="flex items-center gap-2 h-8 cursor-pointer"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavigate("/");
                                }}
                            >
                                <img
                                    alt="Logo CRE"
                                    width={120}
                                    height={32}
                                    className="h-full w-auto object-contain"
                                    src="/assets/Logo CRE Branco.svg"
                                />
                            </a>
                        </div>

                        {/* Desktop Nav */}
                        <nav className="desktop-nav items-center space-x-8 mx-10 shrink-0 flex">
                            {menuItems.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="text-white hover:text-orange-500 text-sm font-aeonik font-bold tracking-widest transition-colors whitespace-nowrap cursor-pointer"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleNavigate(item.href);
                                    }}
                                >
                                    {item.name}
                                </a>
                            ))}
                        </nav>

                        {/* Action Button */}
                        <div className="flex items-center gap-4 shrink-0">
                            <button
                                onClick={() => {
                                    handleNavigate("#ingressos");
                                }}
                                className="nav-contact-btn px-6 py-2 rounded-full font-bold text-xs uppercase tracking-widest whitespace-nowrap shrink-0"
                            >
                                <CheckCheck className="w-4 h-4" />
                                GARANTIR INGRESSO
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Mobile Navbar using StaggeredMenu */}
            <div className="mobile-nav-wrapper">
                <motion.div
                    variants={{
                        visible: { y: 0, opacity: 1 },
                        hidden: { y: -100, opacity: 0 },
                    }}
                    animate={(hidden && !isMenuOpen) ? "hidden" : "visible"}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="fixed top-0 left-0 w-full z-50 px-0"
                >
                <Suspense fallback={<div className="h-16" />}>
                    <StaggeredMenu
                        isFixed={true}
                        items={staggeredItems}
                        accentColor="#ff6b00"
                        colors={['#090C13', '#1C2030', '#ff6b00']}
                        onMenuOpen={() => setIsMenuOpen(true)}
                        onMenuClose={() => setIsMenuOpen(false)}
                    />
                </Suspense>
                </motion.div>
            </div>
        </>
    );
};

export default Navbar;


