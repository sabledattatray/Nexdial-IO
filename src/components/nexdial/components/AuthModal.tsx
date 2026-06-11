import React, { useState } from 'react';
import { 
  Lock, Mail, User, Eye, EyeOff, X, Check, AlertCircle, Sparkles, Shield, Key, ArrowRight, ChevronLeft, Loader2
} from 'lucide-react';
import { GoogleSignInButton, GoogleIcon } from './GoogleSignIn';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: (agentName: string, agentEmail: string, agentAvatar?: string) => void;
  initialMode?: 'signin' | 'signup';
}

interface GoogleAccount {
  name: string;
  email: string;
  avatarLetter: string;
  avatarBg: string;
}

export default function AuthModal({ isOpen, onClose, onAuthSuccess, initialMode = 'signin' }: AuthModalProps) {
  const [mode, setMode] = useState<'signin' | 'signup' | 'google-chooser'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [agentName, setAgentName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState<GoogleAccount | null>(null);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');

  const demoGoogleAccounts: GoogleAccount[] = [
    { name: 'Dattatray Sable', email: 'sabledattatray@gmail.com', avatarLetter: 'D', avatarBg: 'bg-indigo-600/25 text-[#818CF8]' },
    { name: 'Sarah Smith', email: 'sarah.smith@nexdial.io', avatarLetter: 'S', avatarBg: 'bg-emerald-600/25 text-emerald-400' },
    { name: 'John Doe', email: 'john.doe@nexdial.io', avatarLetter: 'J', avatarBg: 'bg-amber-600/25 text-amber-400' }
  ];

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-side validations
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!password || password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }
    if (mode === 'signup' && !agentName.trim()) {
      setError('Please provide your full Agent name.');
      return;
    }

    setLoading(true);

    // Simulate API authorization network delays
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      
      const resolvedName = mode === 'signup' ? agentName : (email.split('@')[0].replace('.', ' ') || 'Dattatray Sable');
      const formattedName = resolvedName.replace(/\b\w/g, c => c.toUpperCase());

      setTimeout(() => {
        onAuthSuccess(formattedName, email);
        setSuccess(false);
        onClose();
      }, 800);

    }, 1200);
  };

  const handleGoogleClick = () => {
    // Transition to Google SSO account selection flow
    setMode('google-chooser');
    setError('');
  };

  const handleSelectGoogleAccount = (account: GoogleAccount) => {
    setSelectedGoogleAccount(account);
    setGoogleLoading(true);

    // Simulate Google SSO exchange token verification
    setTimeout(() => {
      setGoogleLoading(false);
      setSuccess(true);

      setTimeout(() => {
        onAuthSuccess(account.name, account.email);
        setSuccess(false);
        setSelectedGoogleAccount(null);
        setMode('signin');
        onClose();
      }, 800);
    }, 1500);
  };

  const handleCustomGoogleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customGoogleEmail || !customGoogleEmail.includes('@')) {
      setError('Please enter a valid Google email address.');
      return;
    }

    const namePart = customGoogleEmail.split('@')[0];
    const resolvedName = namePart
      .split(/[._\-+]/)
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ');

    handleSelectGoogleAccount({
      name: resolvedName,
      email: customGoogleEmail,
      avatarLetter: resolvedName.charAt(0),
      avatarBg: 'bg-violet-600/25 text-violet-400'
    });
  };

  return (
    <div id="nexdial-auth-portal-wrapper" className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0A0A0B]/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Auth Card container */}
      <div className="relative w-full max-w-md bg-[#0E0E10] border border-slate-800 rounded-3xl p-8 shadow-2xl overflow-hidden transition-all duration-300">
        
        {/* Absolute Design Background Accent Details */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Close button */}
        <button 
          onClick={onClose} 
          className="absolute top-5 right-5 text-slate-500 hover:text-slate-300 cursor-pointer p-1 rounded-full hover:bg-slate-900 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {success ? (
          <div className="text-center py-8 space-y-4 animate-fade-in">
            <div className="w-16 h-16 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 rounded-full flex items-center justify-center mx-auto shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <Check className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-100">Authentication successful</h3>
              <p className="text-xs text-slate-450">Securing your nexdial session tunnel...</p>
            </div>
          </div>
        ) : mode === 'google-chooser' ? (
          <div className="space-y-5 animate-fade-in">
            
            {/* Header */}
            <div className="space-y-2">
              <button 
                onClick={() => setMode('signin')}
                className="flex items-center gap-1.5 text-[11px] text-slate-500 hover:text-slate-300 cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Back to SIP Login</span>
              </button>
              <div className="flex items-center gap-2 pt-1">
                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center border border-slate-800 shadow">
                  <GoogleIcon />
                </div>
                <h2 className="text-lg font-extrabold text-slate-100 tracking-tight">
                  Sign In with Google
                </h2>
              </div>
              <p className="text-xs text-slate-450">
                Choose a Google Workspace account to grant identity credentials to Nexdial telephony systems.
              </p>
              {!(import.meta as any).env?.VITE_GOOGLE_CLIENT_ID && (
                <div className="p-3 mt-2 bg-indigo-950/20 border border-indigo-500/15 rounded-xl text-[11px] text-indigo-400 font-sans leading-normal">
                  💡 <span className="font-semibold">Developer Sandbox:</span> To perform authentic Google Single Sign-on verification, define your <code className="bg-slate-900 px-1 py-0.5 rounded text-white font-mono">VITE_GOOGLE_CLIENT_ID</code> in AI Studio secrets. Falling back to simulation chooser.
                </div>
              )}
            </div>

            {googleLoading ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-3.5">
                <Loader2 className="w-9 h-9 text-indigo-500 animate-spin" />
                <div className="space-y-1">
                  <p className="text-xs font-semibold text-slate-200">Verifying session token</p>
                  <p className="text-[10px] text-slate-500">Connecting Google API Auth to {selectedGoogleAccount?.email}...</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4.5 pt-1">
                
                {/* Account list */}
                <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                  {demoGoogleAccounts.map((account) => (
                    <button
                      key={account.email}
                      onClick={() => handleSelectGoogleAccount(account)}
                      className="w-full flex items-center gap-3.5 p-3 bg-[#0A0A0B] hover:bg-slate-900 border border-slate-900 hover:border-slate-800 rounded-xl text-left cursor-pointer transition-all group duration-200"
                    >
                      <div className={`w-9 h-9 ${account.avatarBg} text-xs font-extrabold rounded-full flex items-center justify-center border border-slate-800/40`}>
                        {account.avatarLetter}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{account.name}</p>
                        <p className="text-[10px] text-slate-500 truncate">{account.email}</p>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-slate-700 group-hover:text-indigo-400 group-hover:translate-x-0.5 transition-all" />
                    </button>
                  ))}
                </div>

                {/* Separator */}
                <div className="relative flex items-center justify-center py-1">
                  <div className="absolute inset-x-0 h-px bg-slate-900" />
                  <span className="relative px-3 bg-[#0E0E10] text-[9px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                    OR ENTER ACCOUNT
                  </span>
                </div>

                {/* Custom input */}
                <form onSubmit={handleCustomGoogleSubmit} className="space-y-2 text-xs">
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="email" 
                      required
                      placeholder="e.g. yourname@gmail.com" 
                      value={customGoogleEmail}
                      onChange={(e) => setCustomGoogleEmail(e.target.value)}
                      className="w-full pl-10 pr-12 py-2.5 bg-[#0A0A0B] border border-slate-800 text-slate-100 rounded-xl placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors text-xs"
                    />
                    <button 
                      type="submit"
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg p-1.5 transition-colors cursor-pointer"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </form>

              </div>
            )}

          </div>
        ) : (
          <div className="space-y-6">
            
            {/* Title Identity */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="px-2 py-0.5 rounded bg-indigo-950/20 text-[#818CF8] border border-indigo-500/10 text-[9px] font-mono font-bold flex items-center gap-1 uppercase">
                  <Shield className="w-3 h-3" />
                  Nexdial Gate-v2.1
                </div>
              </div>
              <h2 className="text-xl font-extrabold text-[#818CF8] tracking-tight">
                {mode === 'signin' ? 'Sign In' : 'Create Agent Account'}
              </h2>
              <p className="text-xs text-slate-450 leading-relaxed">
                {mode === 'signin' ? 'Access your CRM directories and dialer control boards.' : 'Register a new outbound SIP registration to initiate campaign runs.'}
              </p>
            </div>

            {/* Error notifications */}
            {error && (
              <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4.5 h-4.5 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Google Authentication Section */}
            <div className="space-y-3.5 pl-0.5">
              <GoogleSignInButton onClick={handleGoogleClick} disabled={loading} />
              
              <div className="relative flex items-center justify-center py-1">
                <div className="absolute inset-x-0 h-px bg-slate-800" />
                <span className="relative px-3.5 bg-[#0E0E10] text-[9px] uppercase font-bold tracking-wider text-slate-500 font-mono">
                  OR USE SECURE WORK EMAIL
                </span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-[10px] uppercase tracking-wider text-slate-450 pl-1">Agent Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                    <input 
                      type="text" 
                      placeholder="e.g. Dattatray Sable" 
                      value={agentName}
                      onChange={(e) => setAgentName(e.target.value)}
                      disabled={loading}
                      className="w-full pl-10 pr-4 py-2.5 bg-[#0A0A0B] border border-slate-800 text-slate-100 rounded-xl placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[10px] uppercase tracking-wider text-slate-450 pl-1">Work Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type="email" 
                    placeholder="agent@nexdial.io" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0A0A0B] border border-slate-800 text-slate-100 rounded-xl placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-[10px] uppercase tracking-wider text-slate-450">Agent Security PIN / Password</label>
                  {mode === 'signin' && (
                    <button 
                      type="button"
                      disabled={loading}
                      onClick={() => alert('Demo Feature: Simply reset input PIN, or submit any mock credentials for quick access!')}
                      className="text-[9px] text-[#818CF8]/80 hover:text-[#818CF8] hover:underline"
                    >
                      Forgot?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input 
                    type={showPassword ? 'text' : 'password'} 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    className="w-full pl-10 pr-12 py-2.5 bg-[#0A0A0B] border border-slate-800 text-slate-100 rounded-xl placeholder-slate-600 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit trigger button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full py-3 mt-2 bg-indigo-600 hover:bg-indigo-500 active:scale-98 text-xs font-bold text-white rounded-xl transition-all shadow-md shadow-indigo-600/10 cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    <span>Verifying session authorization...</span>
                  </>
                ) : (
                  <>
                    <Key className="w-4 h-4" />
                    <span>{mode === 'signin' ? 'Sign In to Portal' : 'Register & Assign Sip Line'}</span>
                  </>
                )}
              </button>
            </form>

            {/* Mode Switcher footer toggle link */}
            <div className="pt-4 border-t border-slate-800 text-center">
              <button 
                type="button"
                disabled={loading}
                onClick={() => setMode(mode === 'signin' ? 'signup' : 'signin')}
                className="text-slate-500 hover:text-slate-300 font-medium transition-all cursor-pointer text-xs"
              >
                {mode === 'signin' ? (
                  <>Don't have an agent profile? <span className="text-[#818CF8] font-bold">Register dialer seat</span></>
                ) : (
                  <>Already registered on SIP Gateway? <span className="text-[#818CF8] font-bold">Sign In now</span></>
                )}
              </button>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
