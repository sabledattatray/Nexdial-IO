import React, { useState, useEffect, useRef } from 'react';
import { Mail, Shield, User, X, Check, Loader2, ArrowRight } from 'lucide-react';

interface GoogleUser {
  name: string;
  email: string;
  picture?: string;
}

interface GoogleSignInProps {
  onSuccess: (name: string, email: string, picture?: string) => void;
  isAuthenticated: boolean;
}

// Decodes the JWT credential token returned by the real Google One Tap / Sign In
function decodeGoogleJwt(token: string): any {
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch (e) {
    console.error('Failed to decode GSI token:', e);
    return null;
  }
}

// Classic SVG Google colorful icon
export const GoogleIcon = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
  </svg>
);

export default function GoogleSignIn({ onSuccess, isAuthenticated }: GoogleSignInProps) {
  const [googleClientLoaded, setGoogleClientLoaded] = useState(false);

  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';

  // Load Google Identity Services library
  useEffect(() => {
    if (clientId) {
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => setGoogleClientLoaded(true);
      document.body.appendChild(script);
    }
  }, [clientId]);

  // Triggers real Google One Tap if configured
  useEffect(() => {
    if (googleClientLoaded && clientId && !isAuthenticated) {
      try {
        const google = (window as any).google;
        if (google?.accounts?.id) {
          google.accounts.id.initialize({
            client_id: clientId,
            callback: (res: any) => {
              const decoded = decodeGoogleJwt(res.credential);
              if (decoded) {
                onSuccess(decoded.name, decoded.email, decoded.picture);
              }
            },
            auto_select: false,
            itp_support: true,
            use_fedcm: false
          });

          const isIframe = (() => {
            try {
              return window.self !== window.top;
            } catch (e) {
              return true;
            }
          })();

          if (isIframe) {
            console.info('Skipping Google One Tap prompt inside iframe sandboxed container.');
          } else {
            google.accounts.id.prompt((notification: any) => {
              console.log('Google One Tap Prompt notification state:', notification);
            });
          }
        }
      } catch (err) {
        console.error('Failed to trigger native Google One Tap:', err);
      }
    }
  }, [googleClientLoaded, clientId, isAuthenticated]);

  return null;
}

// Inline custom Google Button for inclusion inside forms
interface GoogleButtonProps {
  onClick: () => void;
  disabled?: boolean;
}

export function GoogleSignInButton({ onClick, disabled }: GoogleButtonProps) {
  const btnRef = useRef<HTMLDivElement>(null);
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '';
  const [rendered, setRendered] = useState(false);

  useEffect(() => {
    let intervalId: any;
    if (clientId && btnRef.current) {
      const tryRender = () => {
        const google = (window as any).google;
        if (google?.accounts?.id) {
          try {
            google.accounts.id.renderButton(
              btnRef.current,
              { 
                theme: 'dark', 
                size: 'large', 
                width: '100%', 
                text: 'continue_with',
                shape: 'pill'
              }
            );
            setRendered(true);
            if (intervalId) clearInterval(intervalId);
          } catch (e) {
            console.error('Error rendering GSI button:', e);
          }
        }
      };

      tryRender();
      intervalId = setInterval(tryRender, 500);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [clientId, btnRef.current]);

  if (clientId) {
    return (
      <div className="w-full flex flex-col items-center">
        <div ref={btnRef} className="w-full min-h-[44px] flex justify-center items-center" />
        {!rendered && (
          <button
            type="button"
            disabled={disabled}
            className="w-full py-2.5 bg-[#0A0A0B] hover:bg-[#111113] border border-slate-800 text-xs text-slate-400 rounded-xl flex items-center justify-center gap-2"
          >
            <Loader2 className="w-3.5 h-3.5 animate-spin text-indigo-500" />
            <span>Loading Google Sign In...</span>
          </button>
        )}
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="w-full py-2.5 bg-[#0A0A0B] hover:bg-[#111113] active:scale-98 border border-slate-800 hover:border-slate-700 text-xs font-bold text-slate-200 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-3.5 group hover:shadow-lg hover:shadow-indigo-500/5"
    >
      <GoogleIcon />
      <span>Continue with Google (Demo Sandbox)</span>
    </button>
  );
}
