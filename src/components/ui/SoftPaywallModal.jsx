/**
 * ============================================================================
 * SoftPaywallModal - WinRAR Protocol Warning HUD
 * ============================================================================
 * Modal interupsi dengan desain Sci-Fi Brutalist merah/jingga peringatan.
 * Menampilkan "Warning: System Maintenance Funding Low" ala terminal militer.
 * ============================================================================
 */

'use client';

import { useEffect } from 'react';
import { EndfieldCard, EndfieldButton } from '.';

export default function SoftPaywallModal({ isOpen, onClose, onDonate, toolName }) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-endfieldBg/95 backdrop-blur-sm">
      {/* Animated scanlines overlay */}
      <div className="absolute inset-0 bg-scanlines opacity-30 pointer-events-none" />
      
      {/* Warning sound effect indicator (visual) */}
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <span className="font-mono text-xs text-endfieldError animate-pulse">⚠ SYSTEM_ALERT</span>
        <div className="w-3 h-3 bg-endfieldError animate-pulse" />
      </div>

      <EndfieldCard className="relative w-full max-w-lg border-endfieldError/50" variant="elevated">
        {/* Warning Header */}
        <div className="mb-6 pb-4 border-b border-endfieldError/30">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-8 h-8 bg-endfieldError/20 border border-endfieldError flex items-center justify-center">
              <span className="text-endfieldError text-xl">⚠</span>
            </div>
            <span className="font-mono text-sm text-endfieldError tracking-widest animate-flicker">
              // WARNING_HUD
            </span>
          </div>
          <h2 className="font-display text-xl text-endfieldError">
            SYSTEM MAINTENANCE FUNDING LOW
          </h2>
        </div>

        {/* Terminal Log Messages */}
        <div className="space-y-2 mb-8 font-mono text-sm">
          <div className="flex items-start gap-2">
            <span className="text-endfieldError">&gt;</span>
            <span className="text-endfieldText">
              USAGE_LIMIT_EXCEEDED FOR: <span className="text-endfieldAccent">{toolName || 'TOOLKIT'}</span>
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-endfieldError">&gt;</span>
            <span className="text-endfieldTextMuted">
              SERVER_RESOURCES_RUNNING_CRITICAL
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-endfieldError">&gt;</span>
            <span className="text-endfieldTextMuted">
              SUPPORT_RAFLI_VIA_SAWERIA_TO_KEEP_SERVERS_OPERATIONAL
            </span>
          </div>
          <div className="flex items-start gap-2 animate-pulse">
            <span className="text-endfieldError">&gt;</span>
            <span className="text-endfieldAccent">
              DONATION_REQUIRED_TO_MAINTAIN_SERVICE_QUALITY
            </span>
          </div>
        </div>

        {/* Progress Bar (Funding visualization) */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="font-mono text-xs text-endfieldTextMuted">SERVER_FUNDING_LEVEL</span>
            <span className="font-mono text-xs text-endfieldError">12%</span>
          </div>
          <div className="h-2 bg-endfieldSurface border border-endfieldBorder">
            <div 
              className="h-full bg-gradient-to-r from-endfieldError to-endfieldAccent w-[12%] animate-pulse"
              style={{ 
                boxShadow: '0 0 10px rgba(239, 68, 68, 0.5)'
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          {/* Primary Donation Button */}
          <EndfieldButton
            variant="primary"
            size="lg"
            onClick={onDonate}
            className="w-full"
          >
            // INITIATE_DONATION [SAWERIA]
          </EndfieldButton>

          {/* Bypass Option */}
          <button
            onClick={onClose}
            className="w-full py-2 font-mono text-xs text-endfieldTextMuted hover:text-endfieldText transition-colors text-center"
          >
            [ Bypass Warning & Continue ]
          </button>
        </div>

        {/* Footer Info */}
        <div className="mt-6 pt-4 border-t border-endfieldBorder text-center">
          <p className="font-mono text-xs text-endfieldTextMuted">
            This message appears every 3 uses • ID: {Math.random().toString(36).substring(7).toUpperCase()}
          </p>
        </div>

        {/* Decorative Corner Elements */}
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-endfieldError opacity-50" />
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-endfieldError opacity-50" />
      </EndfieldCard>
    </div>
  );
}
