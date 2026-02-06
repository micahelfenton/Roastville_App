import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

interface MembershipCardProps {
  name: string;
  tier: string;
  memberId: string;
  defaultOrder: string;
  isNearby: boolean;
  memberSince?: string;
}

const baseColor = "#1B4D3E"; // Marrickville Green

const MembershipCard = ({ name, tier, memberId, defaultOrder, isNearby, memberSince }: MembershipCardProps) => {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const [shineX, setShineX] = useState(0);
  const [shineY, setShineY] = useState(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = cardRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 200 - 100; // -100 to 100
      const y = ((e.clientY - rect.top) / rect.height) * 200 - 100;
      setShineX(x);
      setShineY(y);
    };

    const handleDevice = (ev: DeviceOrientationEvent) => {
      if (ev.gamma === null || ev.beta === null) return;
      // gamma ~ left-right, beta ~ front-back
      const x = (ev.gamma / 45) * 100; // normalize
      const y = (ev.beta / 45) * 100;
      setShineX(Math.max(-100, Math.min(100, x)));
      setShineY(Math.max(-100, Math.min(100, y)));
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("deviceorientation", handleDevice as EventListener);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("deviceorientation", handleDevice as EventListener);
    };
  }, []);

  const commonStyles: React.CSSProperties = {
    // CSS variables used by inner shine element
    // @ts-ignore - custom property
    ['--shine-x' as any]: `${shineX}%`,
    ['--shine-y' as any]: `${shineY}%`,
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      whileHover={{ scale: 1.02, y: -6 }}
      className="relative rounded-2xl transform-gpu will-change-transform"
    >
      {/* Roastmaster gold pulse behind card */}
      {tier === "Roastmaster" && (
        <div className="absolute inset-0 flex items-center justify-center -z-10 pointer-events-none">
          <div className="w-[360px] h-[220px] rounded-2xl" style={{ boxShadow: '0 30px 60px rgba(212,175,55,0.12)', filter: 'blur(28px)', background: 'radial-gradient(circle at 30% 30%, rgba(212,175,55,0.16), rgba(212,175,55,0.04))' }} />
        </div>
      )}

      <div
        ref={cardRef}
        className={`relative overflow-hidden rounded-2xl p-6 text-white`} 
        style={{
          backgroundColor: baseColor,
          // layered background: subtle gradient + brushed metal overlay
          backgroundImage: `linear-gradient(135deg, ${baseColor}, #165c43), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 1px, rgba(0,0,0,0.02) 1px 3px)`,
          backgroundBlendMode: 'overlay, overlay',
          boxShadow: '0 12px 36px rgba(6,44,28,0.18)',
          borderRadius: 18,
          border: tier === 'Bloom' ? '1px solid #C0C0C0' : tier === 'Roastmaster' ? '1px solid #D4AF37' : '1px solid rgba(255,255,255,0.04)',
          ...commonStyles,
        }}
      >

        {/* Continuous metallic shimmer (primary) */}
        <motion.div
          aria-hidden
          initial={{ x: '-140%' }}
          animate={{ x: '140%' }}
          transition={{ repeat: Infinity, repeatType: 'loop', duration: 3.2, ease: 'linear' }}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(184,243,214,0.28) 45%, rgba(255,255,255,0.45) 50%, rgba(184,243,214,0.28) 55%, rgba(255,255,255,0) 100%)',
            transform: 'skewX(-18deg)',
            filter: 'blur(10px)',
            opacity: 0.28,
            mixBlendMode: 'screen' as any,
          }}
        />

        {/* Subtle device/mouse nudge to shimmer (secondary) */}
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 100%)',
            transform: `skewX(-18deg) translateX(${shineX * 0.6}%) translateY(${shineY * 0.15}%)`,
            filter: 'blur(8px)',
            opacity: 0.18,
            mixBlendMode: 'overlay' as any,
          }}
        />

        {/* Tier watermarks / seals */}
        {tier === 'Bloom' && (
          <svg className="absolute right-6 bottom-4 w-28 h-28 pointer-events-none" viewBox="0 0 100 100" style={{ opacity: 0.06 }}>
            <defs>
              <linearGradient id="leafGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#b8f3d6" stopOpacity="0.08" />
                <stop offset="100%" stopColor="#b8f3d6" stopOpacity="0.02" />
              </linearGradient>
            </defs>
            <path d="M50 12c10 0 18 8 18 18s-8 18-18 18-18-8-18-18 8-18 18-18z" fill="url(#leafGrad)" />
            <path d="M50 38c5 0 10 4 10 9s-5 9-10 9-10-4-10-9 5-9 10-9z" fill="#b8f3d6" opacity="0.04" />
          </svg>
        )}

        {tier === 'Roastmaster' && (
          <div className="absolute -top-3 -left-3 w-20 h-20 rounded-full flex items-center justify-center pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(212,175,55,0.9), rgba(255,255,255,0.2))', transform: 'rotate(12deg)', boxShadow: '0 8px 20px rgba(212,175,55,0.12)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.14)" />
              <path d="M12 6v6l4 2" stroke="#fff" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />
            </svg>
          </div>
        )}

        {/* Subtle Roastville text watermark (Playfair Display) centered behind content */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <span
            className="font-display text-[88px] sm:text-[110px]"
            style={{
              color: 'rgba(255,255,255,0.10)',
              opacity: 1,
              transform: 'scale(1.08) rotate(-6deg)',
              letterSpacing: '-0.02em',
              fontFamily: "ms'i ink, 'Playfair Display', serif",
              textShadow: '0 2px 8px rgba(0,0,0,0.12)'
            }}
          >
            Roastville
          </span>
        </div>

        <div className="relative z-10">
          <div className="mb-6">
            <h3 className="font-display text-2xl mt-1 leading-tight">{name}</h3>
            {memberSince && (
              <p className="text-[12px] opacity-70 mt-1">Member since {new Date(memberSince).toLocaleDateString()}</p>
            )}
          </div>

          <div className="flex items-end justify-between">
            <div>
              <p className="text-[10px] uppercase tracking-wider opacity-60 mb-0.5">Order</p>
              <p className="text-sm font-medium text-white/90">{defaultOrder}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] uppercase tracking-wider opacity-60 mb-0.5">{tier}</p>
              <p className="text-[12px] font-mono opacity-85">{memberId}</p>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default MembershipCard;
