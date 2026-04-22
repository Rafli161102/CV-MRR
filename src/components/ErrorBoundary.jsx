/**
 * ============================================================================
 * Error Boundary Component
 * ============================================================================
 * Catch errors React dan tampilkan UI error yang sesuai tema Endfield.
 * ============================================================================
 */

'use client';

import React from 'react';
import { EndfieldCard, EndfieldButton } from './ui';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    
    // Log error to console (in production, send to error tracking service)
    console.error('ErrorBoundary caught:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-endfieldBg flex items-center justify-center p-4">
          {/* Background effects */}
          <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />
          
          <EndfieldCard className="max-w-lg w-full border-endfieldError/50">
            {/* Error Header */}
            <div className="mb-6 pb-4 border-b border-endfieldError/30">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 bg-endfieldError/20 border border-endfieldError flex items-center justify-center">
                  <span className="text-endfieldError text-xl">⚠</span>
                </div>
                <span className="font-mono text-sm text-endfieldError tracking-widest">
                  // SYSTEM_ERROR
                </span>
              </div>
              <h2 className="font-display text-xl text-endfieldError">
                CRITICAL SYSTEM FAILURE
              </h2>
            </div>

            {/* Error Details */}
            <div className="space-y-4 mb-8">
              <div className="font-mono text-sm">
                <span className="text-endfieldTextMuted">ERROR_CODE: </span>
                <span className="text-endfieldError">
                  {this.state.error?.name || 'UNKNOWN_ERROR'}
                </span>
              </div>
              
              <div className="bg-endfieldSurface border border-endfieldBorder p-4 font-mono text-xs text-endfieldTextMuted overflow-x-auto">
                <p className="mb-2 text-endfieldAccent">&gt; STACK_TRACE:</p>
                <pre className="whitespace-pre-wrap break-all">
                  {this.state.error?.message || 'No error message available'}
                </pre>
              </div>

              <p className="font-sans text-sm text-endfieldTextMuted">
                The system has encountered an unexpected error. You can try resetting 
                the application or return to the home page.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <EndfieldButton variant="primary" onClick={this.handleReset} className="flex-1">
                // RESET_SYSTEM
              </EndfieldButton>
              <EndfieldButton variant="secondary" onClick={this.handleGoHome} className="flex-1">
                // RETURN_HOME
              </EndfieldButton>
            </div>

            {/* Debug Info (development only) */}
            {process.env.NODE_ENV === 'development' && this.state.errorInfo && (
              <div className="mt-6 pt-4 border-t border-endfieldBorder">
                <p className="font-mono text-xs text-endfieldTextMuted mb-2">// DEBUG_INFO</p>
                <pre className="font-mono text-xs text-endfieldTextMuted whitespace-pre-wrap break-all max-h-40 overflow-y-auto">
                  {this.state.errorInfo.componentStack}
                </pre>
              </div>
            )}
          </EndfieldCard>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
