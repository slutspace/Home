'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  UserGroupIcon,
  BanknotesIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline'

const STORAGE_KEY = 'slutspace_creator_onboarding_done'

const steps = [
  {
    id: 1,
    title: 'Checklist',
    body: 'Creators must be 18+, agree to community guidelines, and use only content they own or have rights to.',
    icon: ShieldCheckIcon,
  },
  {
    id: 2,
    title: 'Channel identity',
    body: 'Pick a display name, avatar, and short bio. This is what subscribers see on your channel and in live chat.',
    icon: UserGroupIcon,
  },
  {
    id: 3,
    title: 'Payouts & wallet',
    body: 'Connect a payout method in Wallet so tips, subs, and gifts can settle. You can finish this later in settings.',
    icon: BanknotesIcon,
  },
  {
    id: 4,
    title: 'Go live',
    body: 'Use Creator studio to upload videos, schedule streams, and track analytics. You can switch anytime from your profile.',
    icon: CheckCircleIcon,
  },
] as const

export default function BecomeCreatorPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [confirmed, setConfirmed] = useState(false)
  const [completed, setCompleted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    setCompleted(localStorage.getItem(STORAGE_KEY) === 'true')
  }, [])

  const maxStep = steps.length
  const current = steps[step - 1]
  const Icon = current.icon

  const finish = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, 'true')
    }
    setCompleted(true)
  }

  return (
    <div className="max-w-xl mx-auto space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-white">Become a creator</h2>
        <p className="text-sm text-gray-400 mt-1">
          Four quick steps. Nothing is published until you add content in Creator studio.
        </p>
        <div className="mt-4 h-1.5 rounded-full bg-gray-700 overflow-hidden">
          <div
            className="h-full bg-red-500 transition-all duration-300"
            style={{ width: `${(step / maxStep) * 100}%` }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Step {step} of {maxStep}
        </p>
      </div>

      <div className="rounded-xl border border-gray-700 bg-gray-800/50 p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="rounded-lg bg-red-500/15 p-3">
            <Icon className="h-8 w-8 text-red-400" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-white">{current.title}</h3>
            <p className="text-sm text-gray-400 mt-2 leading-relaxed">{current.body}</p>
          </div>
        </div>

        {step === 1 && (
          <label className="flex items-start gap-3 cursor-pointer rounded-lg border border-gray-600 bg-gray-900/50 p-4">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-1 rounded border-gray-600 text-red-500 focus:ring-red-500"
            />
            <span className="text-sm text-gray-300">
              I confirm I meet the age and content requirements and will follow SlutSpace community rules.
            </span>
          </label>
        )}
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(1, s - 1))}
          disabled={step === 1}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-4 py-2.5 text-sm font-medium text-gray-300 hover:bg-gray-800 disabled:opacity-40 disabled:pointer-events-none"
        >
          <ArrowLeftIcon className="h-4 w-4" />
          Back
        </button>

        {step < maxStep ? (
          <button
            type="button"
            onClick={() => setStep((s) => s + 1)}
            disabled={step === 1 && !confirmed}
            className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-40 disabled:pointer-events-none"
          >
            Continue
            <ArrowRightIcon className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={finish}
            className="inline-flex items-center gap-2 rounded-lg bg-red-500 px-5 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
          >
            Mark setup complete
            <CheckCircleIcon className="h-4 w-4" />
          </button>
        )}
      </div>

      {completed && (
        <div className="rounded-xl border border-green-500/30 bg-green-500/10 p-5 space-y-3">
          <p className="text-sm text-green-200 font-medium">You have completed the creator intro.</p>
          <p className="text-xs text-gray-400">
            Next: build your channel in Creator studio, connect payouts in Wallet, and review Account settings for privacy.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <Link
              href="/profile/creator"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-500"
            >
              Open Creator studio
              <ArrowRightIcon className="h-4 w-4" />
            </Link>
            <Link
              href="/wallet"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
            >
              Wallet
            </Link>
            <button
              type="button"
              onClick={() => router.push('/settings')}
              className="inline-flex items-center gap-2 rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-200 hover:bg-gray-800"
            >
              Account settings
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
