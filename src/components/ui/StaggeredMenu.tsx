import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import './StaggeredMenu.css';

declare global {
  interface Window {
    __navigate?: (href: string) => void;
  }
}

export interface StaggeredMenuItem {
    label: string;
    ariaLabel: string;
    link: string;
}

export interface StaggeredMenuProps {
    position?: 'left' | 'right';
    colors?: string[];
    items?: StaggeredMenuItem[];
    displayItemNumbering?: boolean;
    className?: string;
    menuButtonColor?: string;
    openMenuButtonColor?: string;
    accentColor?: string;
    changeMenuColorOnOpen?: boolean;
    closeOnClickAway?: boolean;
    onMenuOpen?: () => void;
    onMenuClose?: () => void;
    isFixed?: boolean;
}

export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
    position = 'right',
    colors = ['#B19EEF', '#5227FF'],
    items = [],
    displayItemNumbering = true,
    className,
    menuButtonColor = '#fff',
    openMenuButtonColor = '#0071E4',
    changeMenuColorOnOpen = true,
    accentColor = '#0071E4', // Adjusted to match project theme
    isFixed = false,
    closeOnClickAway = true,
    onMenuOpen,
    onMenuClose
}: StaggeredMenuProps) => {
    const [open, setOpen] = useState(false);
    const openRef = useRef(false);
    const panelRef = useRef<HTMLDivElement | null>(null);
    const preLayersRef = useRef<HTMLDivElement | null>(null);
    const preLayerElsRef = useRef<HTMLElement[]>([]);
    const plusHRef = useRef<HTMLSpanElement | null>(null);
    const plusVRef = useRef<HTMLSpanElement | null>(null);
    const line1Ref = useRef<HTMLSpanElement | null>(null);
    const line2Ref = useRef<HTMLSpanElement | null>(null);
    const line3Ref = useRef<HTMLSpanElement | null>(null);
    const iconRef = useRef<HTMLSpanElement | null>(null);
    const openTlRef = useRef<gsap.core.Timeline | null>(null);
    const closeTweenRef = useRef<gsap.core.Tween | null>(null);
    const spinTweenRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
    const colorTweenRef = useRef<gsap.core.Tween | null>(null);
    const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
    const itemGlowRef = useRef<HTMLDivElement | null>(null);
    const [currentPath, setCurrentPath] = useState(window.location.pathname);
    const busyRef = useRef(false);
    const itemEntranceTweenRef = useRef<gsap.core.Tween | null>(null);

    // Sync current path for active states
    useEffect(() => {
        const handleLocationChange = () => {
            setCurrentPath(window.location.pathname);
        };
        window.addEventListener('popstate', handleLocationChange);
        // Also listen for our custom navigation
        const originalPushState = window.history.pushState;
        window.history.pushState = function (...args) {
            originalPushState.apply(this, args);
            handleLocationChange();
        };
        return () => window.removeEventListener('popstate', handleLocationChange);
    }, []);

    const handleItemHover = useCallback((e: React.MouseEvent<HTMLElement>) => {
        if (!itemGlowRef.current) return;
        const target = e.currentTarget;
        // Cache rects to avoid repeated DOM reads
        const rect = target.getBoundingClientRect();
        const panelRect = panelRef.current?.getBoundingClientRect();

        if (panelRect) {
            const y = rect.top - panelRect.top + rect.height / 2;
            gsap.to(itemGlowRef.current, {
                top: y,
                opacity: 0.6,
                duration: 0.4,
                ease: 'power2.out'
            });
        }
    }, []);

    const handleItemLeave = useCallback(() => {
        if (!itemGlowRef.current) return;
        gsap.to(itemGlowRef.current, {
            opacity: 0,
            duration: 0.3
        });
    }, []);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const panel = panelRef.current;
            const preContainer = preLayersRef.current;
            const plusH = plusHRef.current;
            const plusV = plusVRef.current;
            const icon = iconRef.current;
            if (!panel || !plusH || !plusV || !icon) return;

            let preLayers: HTMLElement[] = [];
            if (preContainer) {
                preLayers = Array.from(preContainer.querySelectorAll('.sm-prelayer')) as HTMLElement[];
            }
            preLayerElsRef.current = preLayers;

            const offscreen = position === 'left' ? -100 : 100;
            gsap.set([panel, ...preLayers], { xPercent: offscreen });
            gsap.set(plusH, { transformOrigin: '50% 50%', rotate: 0 });
            gsap.set(plusV, { transformOrigin: '50% 50%', rotate: 90 });
            gsap.set(icon, { rotate: 0, transformOrigin: '50% 50%' });

            if (line1Ref.current) gsap.set(line1Ref.current, { y: -8 });
            if (line3Ref.current) gsap.set(line3Ref.current, { y: 8 });

            if (toggleBtnRef.current) gsap.set(toggleBtnRef.current, { color: menuButtonColor });
        });
        return () => ctx.revert();
    }, [menuButtonColor, position]);

    const buildOpenTimeline = useCallback(() => {
        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return null;

        openTlRef.current?.kill();
        if (closeTweenRef.current) {
            closeTweenRef.current.kill();
            closeTweenRef.current = null;
        }
        itemEntranceTweenRef.current?.kill();

        const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
        const numberEls = Array.from(
            panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
        ) as HTMLElement[];


        const layerStates = layers.map(el => ({ el, start: Number(gsap.getProperty(el, 'xPercent')) }));
        const panelStart = Number(gsap.getProperty(panel, 'xPercent'));

        if (itemEls.length) {
            gsap.set(itemEls, { yPercent: 140, rotate: 10 });
        }
        if (numberEls.length) {
            gsap.set(numberEls, { '--sm-num-opacity': 0 });
        }


        const tl = gsap.timeline({ paused: true });

        layerStates.forEach((ls, i) => {
            tl.fromTo(ls.el, { xPercent: ls.start }, { xPercent: 0, duration: 0.5, ease: 'power4.out' }, i * 0.07);
        });
        const lastTime = layerStates.length ? (layerStates.length - 1) * 0.07 : 0;
        const panelInsertTime = lastTime + (layerStates.length ? 0.08 : 0);
        const panelDuration = 0.65;
        tl.fromTo(
            panel,
            { xPercent: panelStart },
            { xPercent: 0, duration: panelDuration, ease: 'power4.out' },
            panelInsertTime
        );

        if (itemEls.length) {
            const itemsStartRatio = 0.15;
            const itemsStart = panelInsertTime + panelDuration * itemsStartRatio;
            tl.to(
                itemEls,
                {
                    yPercent: 0,
                    rotate: 0,
                    duration: 1,
                    ease: 'power4.out',
                    stagger: { each: 0.1, from: 'start' }
                },
                itemsStart
            );
            if (numberEls.length) {
                tl.to(
                    numberEls,
                    {
                        duration: 0.6,
                        ease: 'power2.out',
                        '--sm-num-opacity': 1,
                        stagger: { each: 0.08, from: 'start' }
                    },
                    itemsStart + 0.1
                );
            }
        }



        openTlRef.current = tl;
        return tl;
    }, [position]);

    const playOpen = useCallback(() => {
        if (busyRef.current) return;
        busyRef.current = true;
        const tl = buildOpenTimeline();
        if (tl) {
            tl.eventCallback('onComplete', () => {
                busyRef.current = false;
            });
            tl.play(0);
        } else {
            busyRef.current = false;
        }
    }, [buildOpenTimeline]);

    const playClose = useCallback(() => {
        openTlRef.current?.kill();
        openTlRef.current = null;
        itemEntranceTweenRef.current?.kill();

        const panel = panelRef.current;
        const layers = preLayerElsRef.current;
        if (!panel) return;

        const all: HTMLElement[] = [...layers, panel];
        closeTweenRef.current?.kill();
        const offscreen = position === 'left' ? -100 : 100;
        closeTweenRef.current = gsap.to(all, {
            xPercent: offscreen,
            duration: 0.32,
            ease: 'power3.in',
            overwrite: 'auto',
            onComplete: () => {
                const itemEls = Array.from(panel.querySelectorAll('.sm-panel-itemLabel')) as HTMLElement[];
                if (itemEls.length) {
                    gsap.set(itemEls, { yPercent: 140, rotate: 10 });
                }
                const numberEls = Array.from(
                    panel.querySelectorAll('.sm-panel-list[data-numbering] .sm-panel-item')
                ) as HTMLElement[];
                if (numberEls.length) {
                    gsap.set(numberEls, { '--sm-num-opacity': 0 });
                }
                busyRef.current = false;
            }
        });
    }, [position]);

    const animateIcon = useCallback((opening: boolean) => {
        const line1 = line1Ref.current;
        const line2 = line2Ref.current;
        const line3 = line3Ref.current;
        if (!line1 || !line2 || !line3) return;

        spinTweenRef.current?.kill();
        const tl = gsap.timeline();
        spinTweenRef.current = tl;

        if (opening) {
            tl.to(line2, { scaleX: 0, opacity: 0, duration: 0.3, ease: 'power2.in' })
                .to(line1, { y: 0, rotate: 45, duration: 0.4, ease: 'power4.out' }, 0)
                .to(line3, { y: 0, rotate: -45, duration: 0.4, ease: 'power4.out' }, 0);
        } else {
            tl.to(line1, { y: -8, rotate: 0, duration: 0.3, ease: 'power3.inOut' })
                .to(line3, { y: 8, rotate: 0, duration: 0.3, ease: 'power3.inOut' }, 0)
                .to(line2, { scaleX: 1, opacity: 1, duration: 0.3, ease: 'power2.out' }, 0.1);
        }
    }, []);

    const animateColor = useCallback(
        (opening: boolean) => {
            const btn = toggleBtnRef.current;
            if (!btn) return;
            colorTweenRef.current?.kill();
            if (changeMenuColorOnOpen) {
                const targetColor = opening ? openMenuButtonColor : menuButtonColor;
                colorTweenRef.current = gsap.to(btn, {
                    color: targetColor,
                    delay: 0.18,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            } else {
                gsap.set(btn, { color: menuButtonColor });
            }
        },
        [openMenuButtonColor, menuButtonColor, changeMenuColorOnOpen]
    );

    React.useEffect(() => {
        if (toggleBtnRef.current) {
            if (changeMenuColorOnOpen) {
                const targetColor = openRef.current ? openMenuButtonColor : menuButtonColor;
                gsap.set(toggleBtnRef.current, { color: targetColor });
            } else {
                gsap.set(toggleBtnRef.current, { color: menuButtonColor });
            }
        }
    }, [changeMenuColorOnOpen, menuButtonColor, openMenuButtonColor]);

    const animateText = useCallback(() => {
        // Disabled as we now use an icon
    }, []);

    const toggleMenu = useCallback(() => {
        const target = !openRef.current;
        openRef.current = target;
        setOpen(target);
        if (target) {
            onMenuOpen?.();
            playOpen();
        } else {
            onMenuClose?.();
            playClose();
        }
        animateIcon(target);
        animateColor(target);
        animateText();
    }, [playOpen, playClose, animateIcon, animateColor, animateText]);

    const closeMenu = useCallback(() => {
        if (openRef.current) {
            openRef.current = false;
            setOpen(false);
            onMenuClose?.();
            playClose();
            animateIcon(false);
            animateColor(false);
            animateText();
        }
    }, [playClose, animateIcon, animateColor, animateText, onMenuClose]);

    React.useEffect(() => {
        if (!closeOnClickAway || !open) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (
                panelRef.current &&
                !panelRef.current.contains(event.target as Node) &&
                toggleBtnRef.current &&
                !toggleBtnRef.current.contains(event.target as Node)
            ) {
                closeMenu();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [closeOnClickAway, open, closeMenu]);

    return (
        <div
            className={(className ? className + ' ' : '') + 'staggered-menu-wrapper' + (isFixed ? ' fixed-wrapper' : '')}
            style={accentColor ? { ['--sm-accent' as any]: accentColor } : undefined}
            data-position={position}
            data-open={open || undefined}
        >
            <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
                {(() => {
                    const raw = colors && colors.length ? colors.slice(0, 4) : ['#1e1e22', '#35353c'];
                    let arr = [...raw];
                    if (arr.length >= 3) {
                        const mid = Math.floor(arr.length / 2);
                        arr.splice(mid, 1);
                    }
                    return arr.map((c, i) => <div key={i} className="sm-prelayer" style={{ background: c }} />);
                })()}
            </div>
            <header className="staggered-menu-header" aria-label="Main navigation header">
                <div className="flex items-center gap-4">
                    <div className="sm-logo" aria-label="Logo">
                        <a
                            href="#inicio"
                            className="flex items-center gap-2 h-8 cursor-pointer"
                            onClick={(e) => {
                                e.preventDefault();
                                const element = document.querySelector("#inicio");
                                if (element) {
                                    element.scrollIntoView({ behavior: 'smooth' });
                                    window.history.pushState(null, '', '#inicio');
                                } else {
                                    if (window.__navigate) {
                                        window.__navigate("/");
                                    } else {
                                        window.location.href = "/";
                                    }
                                }
                                closeMenu();
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
                </div>
                <div className="flex items-center gap-4">
                    <button
                        ref={toggleBtnRef}
                        className="sm-toggle"
                        aria-label={open ? 'Fechar menu' : 'Abrir menu'}
                        aria-expanded={open}
                        aria-controls="staggered-menu-panel"
                        onClick={toggleMenu}
                        type="button"
                    >
                        <div className="sm-hamburger">
                            <span ref={line1Ref} className="sm-hamburger-line" />
                            <span ref={line2Ref} className="sm-hamburger-line" />
                            <span ref={line3Ref} className="sm-hamburger-line" />
                        </div>
                        <span ref={iconRef} className="sm-icon" aria-hidden="true" style={{ display: 'none' }}>
                            <span ref={plusHRef} className="sm-icon-line" />
                            <span ref={plusVRef} className="sm-icon-line sm-icon-line-v" />
                        </span>
                    </button>
                </div>
            </header>

            <aside id="staggered-menu-panel" ref={panelRef} className="staggered-menu-panel" aria-hidden={!open} inert={!open ? true : undefined}>
                <div className="sm-panel-inner">
                    <ul className="sm-panel-list" role="list" data-numbering={displayItemNumbering || undefined}>
                        {items && items.length ? (
                            items.map((it, idx) => (
                                <li className="sm-panel-itemWrap" key={it.label + idx}>
                                    <a
                                        href={it.link}
                                        className="sm-panel-item cursor-pointer"
                                        aria-label={it.ariaLabel}
                                        tabIndex={open ? 0 : -1}
                                        data-index={idx + 1}
                                        data-active={currentPath === it.link || (it.link !== '/' && currentPath.startsWith(it.link))}
                                        onMouseEnter={handleItemHover}
                                        onMouseLeave={handleItemLeave}
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (it.link.startsWith('#')) {
                                                const element = document.querySelector(it.link);
                                                if (element) {
                                                    element.scrollIntoView({ behavior: 'smooth' });
                                                    window.history.pushState(null, '', it.link);
                                                }
                                            } else {
                                                if (window.__navigate) {
                                                    window.__navigate(it.link);
                                                } else {
                                                    window.location.href = it.link;
                                                }
                                            }
                                            closeMenu();
                                        }}
                                    >
                                        <span className="sm-panel-itemLabel">{it.label}</span>
                                    </a>
                                </li>
                            ))
                        ) : (
                            <li className="sm-panel-itemWrap" aria-hidden="true">
                                <span className="sm-panel-item">
                                    <span className="sm-panel-itemLabel">Nenhum item</span>
                                </span>
                            </li>
                        )}
                    </ul>

                    <div ref={itemGlowRef} className="sm-item-glow" aria-hidden="true" />

                    <div className="sm-quick-contact">
                        <p className="sm-contact-text">Instagram</p>
                        <a href="https://www.instagram.com/verbocabula/" target="_blank" rel="noopener noreferrer" className="sm-contact-email" tabIndex={open ? 0 : -1}>
                            @verbocabula
                        </a>
                    </div>
                </div>
            </aside>
        </div>
    );
};

export default StaggeredMenu;


