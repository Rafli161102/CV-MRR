/**
 * ============================================================================
 * useSoftPaywall Hook - WinRAR Protocol
 * ============================================================================
 * Custom hook untuk menghitung penggunaan tool di localStorage.
 * Munculkan modal setiap kelipatan 3 penggunaan (3, 6, 9, ...).
 * ============================================================================
 */

'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'mrr_toolkit_usage';
const TRIGGER_INTERVAL = 3; // Munculkan setiap 3 kali penggunaan

export function useSoftPaywall(toolId = 'default') {
  const [usageCount, setUsageCount] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  // Load usage count from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY}_${toolId}`);
    if (stored) {
      setUsageCount(parseInt(stored, 10) || 0);
    }
  }, [toolId]);

  // Save usage count to localStorage
  const saveUsage = useCallback((count) => {
    localStorage.setItem(`${STORAGE_KEY}_${toolId}`, count.toString());
    setUsageCount(count);
  }, [toolId]);

  /**
   * Increment usage and check if modal should be shown
   * @returns {boolean} - true if modal should be shown, false otherwise
   */
  const incrementUsage = useCallback(() => {
    const newCount = usageCount + 1;
    saveUsage(newCount);
    
    // Show modal if count is multiple of TRIGGER_INTERVAL (3, 6, 9, ...)
    if (newCount % TRIGGER_INTERVAL === 0 && newCount > 0) {
      setShowModal(true);
      return true;
    }
    
    return false;
  }, [usageCount, saveUsage]);

  /**
   * Check if should show modal without incrementing
   */
  const shouldShowModal = useCallback(() => {
    return usageCount > 0 && usageCount % TRIGGER_INTERVAL === 0;
  }, [usageCount]);

  /**
   * Handle modal close (bypass)
   */
  const handleBypass = useCallback(() => {
    setShowModal(false);
    // Execute pending action if exists
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  /**
   * Handle donation click
   */
  const handleDonate = useCallback(() => {
    // Open Saweria in new tab
    window.open('https://saweria.co/rafli161102', '_blank');
    setShowModal(false);
    // Still execute the pending action
    if (pendingAction) {
      pendingAction();
      setPendingAction(null);
    }
  }, [pendingAction]);

  /**
   * Execute action with paywall check
   * @param {Function} action - The action to execute
   * @param {boolean} forceShowModal - Force show modal regardless of count
   */
  const executeWithPaywall = useCallback((action, forceShowModal = false) => {
    const shouldShow = forceShowModal || incrementUsage();
    
    if (shouldShow) {
      // Store the action to execute after modal is dismissed
      setPendingAction(() => action);
    } else {
      // Execute immediately
      action();
    }
  }, [incrementUsage]);

  /**
   * Reset usage count (for testing)
   */
  const resetUsage = useCallback(() => {
    localStorage.removeItem(`${STORAGE_KEY}_${toolId}`);
    setUsageCount(0);
    setShowModal(false);
  }, [toolId]);

  /**
   * Get usage statistics
   */
  const getStats = useCallback(() => {
    return {
      totalUses: usageCount,
      nextTrigger: TRIGGER_INTERVAL - (usageCount % TRIGGER_INTERVAL),
      triggerInterval: TRIGGER_INTERVAL,
      percentageToNext: ((usageCount % TRIGGER_INTERVAL) / TRIGGER_INTERVAL) * 100,
    };
  }, [usageCount]);

  return {
    // State
    usageCount,
    showModal,
    
    // Actions
    incrementUsage,
    shouldShowModal,
    handleBypass,
    handleDonate,
    executeWithPaywall,
    resetUsage,
    
    // Stats
    getStats,
    
    // Modal control
    closeModal: () => setShowModal(false),
    openModal: () => setShowModal(true),
  };
}

/**
 * Hook untuk multiple tools dengan tracking terpisah
 */
export function useMultiToolPaywall() {
  const getToolStorageKey = (toolId) => `${STORAGE_KEY}_${toolId}`;

  const getToolUsage = useCallback((toolId) => {
    const stored = localStorage.getItem(getToolStorageKey(toolId));
    return parseInt(stored, 10) || 0;
  }, []);

  const setToolUsage = useCallback((toolId, count) => {
    localStorage.setItem(getToolStorageKey(toolId), count.toString());
  }, []);

  const incrementToolUsage = useCallback((toolId) => {
    const current = getToolUsage(toolId);
    const newCount = current + 1;
    setToolUsage(toolId, newCount);
    
    // Return true if should show modal
    return newCount % TRIGGER_INTERVAL === 0 && newCount > 0;
  }, [getToolUsage, setToolUsage]);

  const resetToolUsage = useCallback((toolId) => {
    localStorage.removeItem(getToolStorageKey(toolId));
  }, []);

  const getAllStats = useCallback(() => {
    const stats = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith(STORAGE_KEY)) {
        const toolId = key.replace(`${STORAGE_KEY}_`, '');
        const count = parseInt(localStorage.getItem(key), 10) || 0;
        stats[toolId] = {
          count,
          nextTrigger: TRIGGER_INTERVAL - (count % TRIGGER_INTERVAL),
        };
      }
    }
    return stats;
  }, []);

  return {
    getToolUsage,
    setToolUsage,
    incrementToolUsage,
    resetToolUsage,
    getAllStats,
    TRIGGER_INTERVAL,
  };
}
