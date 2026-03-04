'use client';

import { useTranslations } from 'next-intl';
import { useState, FormEvent } from 'react';

export default function ContactForm() {
  const t = useTranslations('form');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);

    try {
      const res = await fetch('/php/send.php', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
        <svg className="w-12 h-12 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-green-800 font-medium text-lg">{t('success')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {status === 'error' && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800 text-sm">
          {t('error')}
        </div>
      )}

      {/* Company */}
      <div>
        <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1">
          {t('company')}
        </label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder={t('companyPlaceholder')}
          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-sm"
        />
      </div>

      {/* Name */}
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">
          {t('name')} <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder={t('namePlaceholder')}
          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-sm"
        />
      </div>

      {/* Phone + Email row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1">
            {t('phone')} <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            required
            placeholder={t('phonePlaceholder')}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">
            {t('email')} <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            placeholder={t('emailPlaceholder')}
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-sm"
          />
        </div>
      </div>

      {/* Room type */}
      <div>
        <label htmlFor="roomType" className="block text-sm font-medium text-slate-700 mb-1">
          {t('roomType')} <span className="text-red-500">*</span>
        </label>
        <select
          id="roomType"
          name="roomType"
          required
          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-sm bg-white"
        >
          <option value="">&mdash;</option>
          <option value="zimmer">{t('roomTypeOptions.zimmer')}</option>
          <option value="wohnung">{t('roomTypeOptions.wohnung')}</option>
          <option value="apartment">{t('roomTypeOptions.apartment')}</option>
          <option value="haus">{t('roomTypeOptions.haus')}</option>
        </select>
      </div>

      {/* Rooms + Persons + Arrival + Duration */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div>
          <label htmlFor="roomCount" className="block text-sm font-medium text-slate-700 mb-1">
            {t('roomCount')} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="roomCount"
            name="roomCount"
            min="1"
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-sm"
          />
        </div>
        <div>
          <label htmlFor="persons" className="block text-sm font-medium text-slate-700 mb-1">
            {t('persons')} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="persons"
            name="persons"
            min="1"
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-sm"
          />
        </div>
        <div>
          <label htmlFor="arrival" className="block text-sm font-medium text-slate-700 mb-1">
            {t('arrival')} <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="arrival"
            name="arrival"
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-sm"
          />
        </div>
        <div>
          <label htmlFor="duration" className="block text-sm font-medium text-slate-700 mb-1">
            {t('duration')} <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            id="duration"
            name="duration"
            min="1"
            required
            className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-sm"
          />
        </div>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">
          {t('message')}
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          placeholder={t('messagePlaceholder')}
          className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-shadow text-sm resize-y"
        />
      </div>

      {/* Honeypot */}
      <div className="hidden" aria-hidden="true">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full sm:w-auto px-8 py-3 bg-brand-600 text-white font-semibold rounded-lg hover:bg-brand-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {status === 'sending' ? t('sending') : t('submit')}
      </button>
    </form>
  );
}
