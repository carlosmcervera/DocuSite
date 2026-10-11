import React from "react";
export const Logo = ({ className = "", onDark = false, showWord = true }) => <span className={`inline-flex items-center gap-2 ${className}`} aria-label="DocuSite">
  <img src="/assets/brand/logo-512.png" width="40" height="40" alt="" aria-hidden="true" className="h-10 w-10 shrink-0" />
  {showWord && <span className={`font-heading text-2xl tracking-tight ${onDark ? "text-primary-foreground" : "text-foreground"}`}>DocuSite</span>}
</span>;
