'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { useAuth } from '@/context/AuthContext';
import { userService } from '@/services/userService';
import { User, Mail, Phone, MapPin, Camera, Shield, Bell, Lock, Eye, EyeOff, Check } from 'lucide-react';
import Button from '@/components/Button';
import { cn } from '@/lib/utils';
import toast from 'react-hot-toast';

// ─── Reusable Toggle Switch ────────────────────────────────────────────────────
function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!enabled)}
            className={cn(
                'w-12 h-6 rounded-full relative transition-colors duration-300',
                enabled ? 'bg-primary' : 'bg-gray-200'
            )}
        >
            <div className={cn(
                'absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300',
                enabled ? 'right-1' : 'left-1'
            )} />
        </button>
    );
}

// ─── Settings Row ──────────────────────────────────────────────────────────────
function SettingRow({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl gap-4">
            <div className="flex-1">
                <h4 className="font-bold text-gray-800">{title}</h4>
                <p className="text-sm text-gray-500 mt-0.5">{description}</p>
            </div>
            {children}
        </div>
    );
}

// ─── Section Card ──────────────────────────────────────────────────────────────
function SectionCard({ id, title, description, badge, children }: { id: string; title: string; description: string; badge?: string; children: React.ReactNode }) {
    return (
        <section id={id} className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <p className="text-gray-500 mt-1">{description}</p>
                </div>
                {badge && <span className="text-xs uppercase font-semibold text-gray-400">{badge}</span>}
            </div>
            {children}
        </section>
    );
}

// ─── Types ─────────────────────────────────────────────────────────────────────
interface NotificationPrefs {
    email: boolean;
    sms: boolean;
    push: boolean;
    appointmentReminders: boolean;
    healthTips: boolean;
    marketingEmails: boolean;
}
interface PrivacyPrefs {
    profileVisibility: 'public' | 'private' | 'doctors_only';
    shareDataWithResearchers: boolean;
    allowAnonymousAnalytics: boolean;
}
interface SecurityPrefs {
    twoFactorEnabled: boolean;
    loginAlerts: boolean;
}

export default function PatientProfile() {
    const { user, checkAuth } = useAuth();

    // ── Personal info state ──────────────────────────────────────────
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({ name: '', phone: '', location: '' });

    // ── Notifications state ──────────────────────────────────────────
    const [notifications, setNotifications] = useState<NotificationPrefs>({
        email: true, sms: false, push: true,
        appointmentReminders: true, healthTips: false, marketingEmails: false,
    });
    const [savingNotif, setSavingNotif] = useState(false);

    // ── Privacy state ────────────────────────────────────────────────
    const [privacy, setPrivacy] = useState<PrivacyPrefs>({
        profileVisibility: 'doctors_only',
        shareDataWithResearchers: false,
        allowAnonymousAnalytics: true,
    });
    const [savingPrivacy, setSavingPrivacy] = useState(false);

    // ── Security / Change password state ────────────────────────────
    const [security, setSecurity] = useState<SecurityPrefs>({
        twoFactorEnabled: false,
        loginAlerts: true,
    });
    const [savingSecurity, setSavingSecurity] = useState(false);
    const [showPwForm, setShowPwForm] = useState(false);
    const [pwForm, setPwForm] = useState({ current: '', newPw: '', confirm: '' });
    const [showCurrent, setShowCurrent] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [savingPw, setSavingPw] = useState(false);

    // ── Load settings ────────────────────────────────────────────────
    const loadSettings = useCallback(async () => {
        try {
            const res = await userService.getSettings();
            const prefs = res?.data?.settings;
            if (prefs?.notifications) setNotifications(prefs.notifications);
            if (prefs?.privacy) setPrivacy(prefs.privacy);
            if (prefs?.security) setSecurity(prefs.security);
        } catch {
            // silently use defaults
        }
    }, []);

    useEffect(() => {
        if (user) {
            setFormData({ name: user.name || '', phone: user.phone || '', location: (user as any).location || '' });
            loadSettings();
        }
    }, [user, loadSettings]);

    // ── Handlers ─────────────────────────────────────────────────────

    const handleSaveProfile = async () => {
        setIsSaving(true);
        try {
            await userService.updateProfile({ name: formData.name, phone: formData.phone });
            await checkAuth?.();
            toast.success('Profile updated successfully!');
            setIsEditing(false);
        } catch (e: any) {
            toast.error(e?.message || 'Failed to update profile.');
        } finally { setIsSaving(false); }
    };

    const handleToggleNotif = async (key: keyof NotificationPrefs, value: boolean) => {
        const updated = { ...notifications, [key]: value };
        setNotifications(updated);
        setSavingNotif(true);
        try {
            await userService.updateNotifications({ [key]: value });
            toast.success('Notification preference saved.');
        } catch (e: any) {
            setNotifications(notifications); // revert
            toast.error(e?.message || 'Failed to save preference.');
        } finally { setSavingNotif(false); }
    };

    const handleTogglePrivacy = async (key: keyof PrivacyPrefs, value: boolean) => {
        const updated = { ...privacy, [key]: value };
        setPrivacy(updated as PrivacyPrefs);
        setSavingPrivacy(true);
        try {
            await userService.updatePrivacy({ [key]: value });
            toast.success('Privacy setting saved.');
        } catch (e: any) {
            setPrivacy(privacy);
            toast.error(e?.message || 'Failed to save setting.');
        } finally { setSavingPrivacy(false); }
    };

    const handleVisibilityChange = async (val: PrivacyPrefs['profileVisibility']) => {
        const updated = { ...privacy, profileVisibility: val };
        setPrivacy(updated);
        setSavingPrivacy(true);
        try {
            await userService.updatePrivacy({ profileVisibility: val });
            toast.success('Visibility updated.');
        } catch (e: any) {
            setPrivacy(privacy);
            toast.error(e?.message || 'Failed to update visibility.');
        } finally { setSavingPrivacy(false); }
    };

    const handleToggleSecurity = async (key: keyof SecurityPrefs, value: boolean) => {
        const updated = { ...security, [key]: value };
        setSecurity(updated);
        setSavingSecurity(true);
        try {
            await userService.updateSecuritySettings({ [key]: value });
            toast.success('Security setting saved.');
        } catch (e: any) {
            setSecurity(security);
            toast.error(e?.message || 'Failed to save setting.');
        } finally { setSavingSecurity(false); }
    };

    const handleChangePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (pwForm.newPw !== pwForm.confirm) {
            toast.error('New passwords do not match.');
            return;
        }
        if (pwForm.newPw.length < 6) {
            toast.error('Password must be at least 6 characters.');
            return;
        }
        setSavingPw(true);
        try {
            await userService.changePassword(pwForm.current, pwForm.newPw);
            toast.success('Password changed successfully!');
            setPwForm({ current: '', newPw: '', confirm: '' });
            setShowPwForm(false);
        } catch (e: any) {
            toast.error(e?.message || 'Failed to change password.');
        } finally { setSavingPw(false); }
    };

    const navItems = [
        { label: 'Personal Info', icon: <User size={18} />, href: '#personal-info' },
        { label: 'Notifications', icon: <Bell size={18} />, href: '#notifications' },
        { label: 'Security', icon: <Lock size={18} />, href: '#security' },
        { label: 'Privacy', icon: <Shield size={18} />, href: '#privacy' },
    ];

    const inputClass = "w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 transition-all text-gray-800 disabled:opacity-60";

    return (
        <div className="flex bg-[#f8fafc] min-h-screen">
            <Sidebar role="patient" />

            <main className="flex-1 p-8">
                <header className="mb-10">
                    <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
                    <p className="text-gray-500 mt-1">Manage your personal information and preferences.</p>
                </header>

                <div className="max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Sidebar nav */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-white p-8 rounded-3xl premium-shadow border border-gray-100 text-center">
                            <div className="relative inline-block mb-6">
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center text-primary text-2xl font-bold">
                                    {user?.name?.charAt(0) || 'P'}
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-100 text-primary hover:scale-110 transition-transform">
                                    <Camera size={16} />
                                </button>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">{user?.name}</h3>
                            <p className="text-gray-500 text-sm">Patient ID: #HC-{(user?.id || '9827').slice(-4)}</p>
                        </div>

                        <nav className="bg-white p-4 rounded-3xl premium-shadow border border-gray-100 space-y-2">
                            {navItems.map((item) => (
                                <a key={item.label} href={item.href}
                                    className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all text-gray-500 hover:bg-gray-50 hover:text-primary cursor-pointer"
                                >
                                    {item.icon}
                                    {item.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Main content */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* ── Personal Info ──────────────────────────────── */}
                        <SectionCard id="personal-info" title="Personal Information" description="View and update your personal profile details.">
                            <div className="flex justify-end mb-6 -mt-2">
                                <Button variant="outline" size="sm" onClick={() => setIsEditing(!isEditing)}>
                                    {isEditing ? 'Cancel' : 'Edit Profile'}
                                </Button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-semibold text-gray-500 mb-2">Full Name</label>
                                    <div className="relative">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input type="text" className={inputClass} disabled={!isEditing}
                                            value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-500 mb-2">Email Address</label>
                                    <div className="relative">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input type="email" className={inputClass} disabled value={user?.email || ''} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-500 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input type="tel" className={inputClass} disabled={!isEditing}
                                            value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-gray-500 mb-2">Location</label>
                                    <div className="relative">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                                        <input type="text" className={inputClass} disabled={!isEditing}
                                            value={formData.location} placeholder="New York, USA"
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })} />
                                    </div>
                                </div>
                            </div>
                            {isEditing && (
                                <div className="mt-8 pt-6 border-t border-gray-50 flex justify-end">
                                    <Button onClick={handleSaveProfile} disabled={isSaving}>
                                        {isSaving ? 'Saving...' : 'Save Changes'}
                                    </Button>
                                </div>
                            )}
                        </SectionCard>

                        {/* ── Notifications ──────────────────────────────── */}
                        <SectionCard id="notifications" title="Notifications" description="Control the updates you receive from HealthConnect." badge={savingNotif ? 'Saving…' : 'Live updates'}>
                            <div className="space-y-3">
                                <SettingRow title="Email notifications" description="Receive updates via email.">
                                    <Toggle enabled={notifications.email} onChange={(v) => handleToggleNotif('email', v)} />
                                </SettingRow>
                                <SettingRow title="SMS notifications" description="Receive text messages for important alerts.">
                                    <Toggle enabled={notifications.sms} onChange={(v) => handleToggleNotif('sms', v)} />
                                </SettingRow>
                                <SettingRow title="Push notifications" description="Browser or app push alerts.">
                                    <Toggle enabled={notifications.push} onChange={(v) => handleToggleNotif('push', v)} />
                                </SettingRow>
                                <SettingRow title="Appointment reminders" description="Get automatic reminders before each visit.">
                                    <Toggle enabled={notifications.appointmentReminders} onChange={(v) => handleToggleNotif('appointmentReminders', v)} />
                                </SettingRow>
                                <SettingRow title="Health tips" description="Receive messages about care plans and healthy habits.">
                                    <Toggle enabled={notifications.healthTips} onChange={(v) => handleToggleNotif('healthTips', v)} />
                                </SettingRow>
                                <SettingRow title="Marketing emails" description="Promotions, news, and platform updates.">
                                    <Toggle enabled={notifications.marketingEmails} onChange={(v) => handleToggleNotif('marketingEmails', v)} />
                                </SettingRow>
                            </div>
                        </SectionCard>

                        {/* ── Security ───────────────────────────────────── */}
                        <SectionCard id="security" title="Security" description="Keep your account secure with extra protections." badge="Recommended">
                            <div className="space-y-3">
                                <SettingRow title="Login alerts" description="Get notified when someone signs into your account.">
                                    <Toggle enabled={security.loginAlerts} onChange={(v) => handleToggleSecurity('loginAlerts', v)} />
                                </SettingRow>
                                <SettingRow title="Two-factor authentication" description="Add an extra layer of security to your login.">
                                    <Toggle enabled={security.twoFactorEnabled} onChange={(v) => handleToggleSecurity('twoFactorEnabled', v)} />
                                </SettingRow>

                                {/* Change password */}
                                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
                                    <div>
                                        <h4 className="font-bold text-gray-800">Change password</h4>
                                        <p className="text-sm text-gray-500">Update your account password.</p>
                                    </div>
                                    <Button variant="outline" size="sm" onClick={() => setShowPwForm(!showPwForm)}>
                                        {showPwForm ? 'Cancel' : 'Update'}
                                    </Button>
                                </div>

                                {showPwForm && (
                                    <form onSubmit={handleChangePassword} className="p-4 bg-blue-50/50 border border-primary/10 rounded-2xl space-y-4 mt-2">
                                        <div className="relative">
                                            <label className="block text-sm font-semibold text-gray-600 mb-1">Current Password</label>
                                            <input
                                                type={showCurrent ? 'text' : 'password'}
                                                required
                                                value={pwForm.current}
                                                onChange={(e) => setPwForm({ ...pwForm, current: e.target.value })}
                                                className="w-full px-4 pr-12 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 text-gray-800"
                                                placeholder="••••••••"
                                            />
                                            <button type="button" onClick={() => setShowCurrent(!showCurrent)}
                                                className="absolute right-4 bottom-3.5 text-gray-400">
                                                {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <div className="relative">
                                            <label className="block text-sm font-semibold text-gray-600 mb-1">New Password</label>
                                            <input
                                                type={showNew ? 'text' : 'password'}
                                                required
                                                value={pwForm.newPw}
                                                onChange={(e) => setPwForm({ ...pwForm, newPw: e.target.value })}
                                                className="w-full px-4 pr-12 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 text-gray-800"
                                                placeholder="Minimum 6 characters"
                                            />
                                            <button type="button" onClick={() => setShowNew(!showNew)}
                                                className="absolute right-4 bottom-3.5 text-gray-400">
                                                {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                                            </button>
                                        </div>
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-600 mb-1">Confirm New Password</label>
                                            <input
                                                type="password"
                                                required
                                                value={pwForm.confirm}
                                                onChange={(e) => setPwForm({ ...pwForm, confirm: e.target.value })}
                                                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl outline-none focus:ring-2 focus:ring-primary/20 text-gray-800"
                                                placeholder="Repeat new password"
                                            />
                                        </div>
                                        <div className="flex justify-end">
                                            <Button type="submit" size="sm" disabled={savingPw}>
                                                {savingPw ? 'Saving…' : <><Check size={16} className="mr-1 inline" />Save Password</>}
                                            </Button>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </SectionCard>

                        {/* ── Privacy ────────────────────────────────────── */}
                        <SectionCard id="privacy" title="Privacy" description="Review how your data is stored and handled." badge={savingPrivacy ? 'Saving…' : ''}>
                            <div className="space-y-3">
                                {/* Profile visibility selector */}
                                <div className="p-4 bg-gray-50 rounded-2xl">
                                    <h4 className="font-bold text-gray-800 mb-1">Profile visibility</h4>
                                    <p className="text-sm text-gray-500 mb-3">Control who can see your profile.</p>
                                    <div className="flex flex-wrap gap-2">
                                        {([
                                            { value: 'public', label: 'Public' },
                                            { value: 'doctors_only', label: 'Doctors only' },
                                            { value: 'private', label: 'Private' },
                                        ] as const).map((opt) => (
                                            <button
                                                key={opt.value}
                                                onClick={() => handleVisibilityChange(opt.value)}
                                                className={cn(
                                                    'px-4 py-2 rounded-xl text-sm font-semibold border transition-all',
                                                    privacy.profileVisibility === opt.value
                                                        ? 'bg-primary text-white border-primary shadow-md shadow-primary/20'
                                                        : 'bg-white text-gray-600 border-gray-200 hover:border-primary/30'
                                                )}
                                            >
                                                {opt.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <SettingRow title="Share data with researchers" description="Help improve healthcare through anonymised research data.">
                                    <Toggle enabled={privacy.shareDataWithResearchers} onChange={(v) => handleTogglePrivacy('shareDataWithResearchers', v)} />
                                </SettingRow>
                                <SettingRow title="Anonymous analytics" description="Allow HealthConnect to improve services using anonymised usage data.">
                                    <Toggle enabled={privacy.allowAnonymousAnalytics} onChange={(v) => handleTogglePrivacy('allowAnonymousAnalytics', v)} />
                                </SettingRow>
                            </div>
                        </SectionCard>
                    </div>
                </div>
            </main>
        </div>
    );
}
