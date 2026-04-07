'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import {
  ShieldCheckIcon,
  DocumentTextIcon,
  IdentificationIcon,
  CameraIcon,
  ServerStackIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline'

export const KYC_STORAGE_KEY = 'slutspace_kyc_tier2_verified_v1'

const ID_TYPES = [
  { value: 'drivers_license', label: "Driver's license (US state / territory)" },
  { value: 'passport', label: 'Passport (US or foreign)' },
  { value: 'state_id', label: 'State-issued non-driver photo ID' },
  { value: 'military_id', label: 'Military ID' },
] as const

type StepId =
  | 'legal_notice'
  | 'tier_overview'
  | 'tier1_declaration'
  | 'document_upload'
  | 'selfie_liveness'
  | 'processing_consent'
  | 'review_submit'
  | 'pipeline'
  | 'complete'

const STEPS: { id: StepId; label: string }[] = [
  { id: 'legal_notice', label: 'Legal & age' },
  { id: 'tier_overview', label: 'Verification tiers' },
  { id: 'tier1_declaration', label: 'Identity declaration' },
  { id: 'document_upload', label: 'Government ID' },
  { id: 'selfie_liveness', label: 'Live selfie' },
  { id: 'processing_consent', label: 'Processing & retention' },
  { id: 'review_submit', label: 'Review' },
  { id: 'pipeline', label: 'Verification' },
  { id: 'complete', label: 'Complete' },
]

const PIPELINE_STEPS = [
  'Multipart upload received — session token validated',
  'Malware & threat scan (ClamAV + heuristics)',
  'Encrypted document vault ingest (customer-managed keys)',
  'Document intelligence — structured extraction (JSON)',
  'Face embedding match — ID portrait vs. selfie frames',
  'Liveness ensemble — pose, blink, replay / screen detection',
  'Risk engine — device, IP, duplicate document hash',
  'Audit log entry — append-only cryptographic chain',
  'Decision: auto-approval within policy thresholds',
]

export type KycFormState = {
  acceptRegulatory: boolean
  acceptNotLegalAdvice: boolean
  legalName: string
  dob: string
  affirmIdMatch: boolean
  affirm18: boolean
  idType: string
  idFrontName: string | null
  idBackName: string | null
  selfieName: string | null
  affirmLiveSelfie: boolean
  consentAutomatedProcessing: boolean
  consentRetention: boolean
  consent2257StyleRecords: boolean
  finalAttestation: boolean
}

const initialForm: KycFormState = {
  acceptRegulatory: false,
  acceptNotLegalAdvice: false,
  legalName: '',
  dob: '',
  affirmIdMatch: false,
  affirm18: false,
  idType: 'drivers_license',
  idFrontName: null,
  idBackName: null,
  selfieName: null,
  affirmLiveSelfie: false,
  consentAutomatedProcessing: false,
  consentRetention: false,
  consent2257StyleRecords: false,
  finalAttestation: false,
}

function ageFromDob(dob: string): number | null {
  const d = new Date(dob)
  if (Number.isNaN(d.getTime())) return null
  const today = new Date()
  let age = today.getFullYear() - d.getFullYear()
  const m = today.getMonth() - d.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < d.getDate())) age--
  return age
}

export default function KycVerificationModal({ onComplete }: { onComplete: () => void }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [form, setForm] = useState<KycFormState>(initialForm)
  const [pipelineIndex, setPipelineIndex] = useState(0)
  const panelRef = useRef<HTMLDivElement>(null)

  const currentStep = STEPS[stepIndex]?.id ?? 'legal_notice'

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = ''
    }
  }, [])

  useEffect(() => {
    panelRef.current?.focus()
  }, [stepIndex])

  const goNext = useCallback(() => {
    setStepIndex((i) => Math.min(i + 1, STEPS.length - 1))
  }, [])

  const goBack = useCallback(() => {
    setStepIndex((i) => Math.max(i - 1, 0))
  }, [])

  const runPipeline = useCallback(() => {
    setStepIndex(STEPS.findIndex((s) => s.id === 'pipeline'))
    setPipelineIndex(0)
    let i = 0
    const tick = () => {
      if (i < PIPELINE_STEPS.length - 1) {
        i++
        setPipelineIndex(i)
        setTimeout(tick, 900)
      } else {
        setTimeout(() => {
          try {
            localStorage.setItem(KYC_STORAGE_KEY, JSON.stringify({ verifiedAt: new Date().toISOString(), tier: 2 }))
          } catch {
            localStorage.setItem(KYC_STORAGE_KEY, '1')
          }
          setStepIndex(STEPS.findIndex((s) => s.id === 'complete'))
        }, 600)
      }
    }
    setTimeout(tick, 700)
  }, [])

  const canProceed = (): boolean => {
    switch (currentStep) {
      case 'legal_notice':
        return form.acceptRegulatory && form.acceptNotLegalAdvice
      case 'tier_overview':
        return true
      case 'tier1_declaration': {
        if (!form.legalName.trim() || form.legalName.trim().length < 3) return false
        if (!form.dob) return false
        const age = ageFromDob(form.dob)
        if (age === null || age < 18) return false
        return form.affirm18 && form.affirmIdMatch
      }
      case 'document_upload':
        return Boolean(form.idFrontName && form.idBackName && form.idType)
      case 'selfie_liveness':
        return Boolean(form.selfieName && form.affirmLiveSelfie)
      case 'processing_consent':
        return (
          form.consentAutomatedProcessing && form.consentRetention && form.consent2257StyleRecords
        )
      case 'review_submit':
        return form.finalAttestation
      default:
        return false
    }
  }

  const stepNumberDisplay = stepIndex + 1
  const totalGuidedSteps = 7

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-sm"
      role="presentation"
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="kyc-modal-title"
        tabIndex={-1}
        className="flex max-h-[min(92vh,840px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-gray-600 bg-gray-900 shadow-2xl outline-none"
      >
        <div className="shrink-0 border-b border-gray-700 bg-gray-800/80 px-4 py-3 sm:px-5">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-500/15">
              <ShieldCheckIcon className="h-6 w-6 text-red-400" aria-hidden />
            </div>
            <div className="min-w-0 flex-1">
              <h2 id="kyc-modal-title" className="text-lg font-semibold text-white leading-tight">
                Identity & age verification (Tier 2 — Creator studio)
              </h2>
              <p className="mt-1 text-xs text-gray-400">
                Required before full creator tools. Aligned with CIP / CDD-style diligence and record-keeping expectations
                for adult platforms (e.g. 18 U.S.C. §§ 2257/2257A concepts). This flow is a front-end demonstration;
                production would connect to secure APIs, vault storage, and manual review queues.
              </p>
            </div>
          </div>
          {currentStep !== 'pipeline' && currentStep !== 'complete' && (
            <div className="mt-3 flex items-center gap-2">
              <span className="text-[10px] font-medium uppercase tracking-wider text-gray-500">
                Step {Math.min(stepNumberDisplay, totalGuidedSteps)} / {totalGuidedSteps}
              </span>
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-gray-700">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-red-500 to-amber-500 transition-all duration-300"
                  style={{ width: `${(Math.min(stepNumberDisplay, totalGuidedSteps) / totalGuidedSteps) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 scrollbar-site text-sm text-gray-300">
          {currentStep === 'legal_notice' && (
            <div className="space-y-4">
              <div className="rounded-lg border border-amber-500/25 bg-amber-500/5 p-3 text-xs text-amber-100/90">
                <p className="flex gap-2 font-medium text-amber-200">
                  <ExclamationTriangleIcon className="h-4 w-4 shrink-0" />
                  Zero tolerance for underage access or identity fraud
                </p>
                <p className="mt-2 text-amber-100/80">
                  Hated By Many LLC (Wyoming) operates this platform under Wyoming law. For sexually explicit or
                  simulated content involving actual performers, federal record-keeping and labeling rules (18 U.S.C. §
                  2257 and § 2257A) require retrievable proof that performers were 18+ at production. Bank Secrecy Act /
                  AML-style programs may apply when payouts or money transmission thresholds are met.
                </p>
              </div>
              <p className="text-gray-400">
                You will complete a <strong className="text-white">Tier 2</strong>-style check: government photo ID,
                live selfie / liveness attestation, and consent to automated document analysis, encrypted storage, risk
                scoring, and long-term audit retention (7+ years where applicable).
              </p>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-700 bg-gray-800/40 p-3">
                <input
                  type="checkbox"
                  checked={form.acceptRegulatory}
                  onChange={(e) => setForm((f) => ({ ...f, acceptRegulatory: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-gray-800 text-red-500"
                />
                <span>
                  I confirm I am <strong className="text-white">18 years of age or older</strong> and I understand that
                  false statements may result in permanent account termination and reporting where required by law.
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-700 bg-gray-800/40 p-3">
                <input
                  type="checkbox"
                  checked={form.acceptNotLegalAdvice}
                  onChange={(e) => setForm((f) => ({ ...f, acceptNotLegalAdvice: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-gray-800 text-red-500"
                />
                <span>
                  I understand this checklist is <strong className="text-white">not legal advice</strong> and that the
                  operator may update verification requirements after review by qualified counsel.
                </span>
              </label>
            </div>
          )}

          {currentStep === 'tier_overview' && (
            <div className="space-y-4">
              <p className="text-gray-400">
                Verification is <strong className="text-white">risk-based and tiered</strong>. Creator studio access that
                can lead to uploads and monetization maps to <strong className="text-white">Tier 2 minimum</strong> in
                the internal policy model.
              </p>
              <ul className="space-y-2 rounded-lg border border-gray-700 bg-gray-800/30 p-3 text-xs">
                <li>
                  <strong className="text-white">Tier 0</strong> — Email / account: browse public content.
                </li>
                <li>
                  <strong className="text-white">Tier 1</strong> — Self-declared legal name + DOB + 18+ affirmation
                  (next step).
                </li>
                <li>
                  <strong className="text-white">Tier 2</strong> — Unexpired government photo ID + live selfie /
                  liveness signals + ML-assisted extraction & face match + risk engine (this session).
                </li>
                <li>
                  <strong className="text-white">Tier 3</strong> — Payout-eligible: Tier 2 + manual compliance review +
                  payout instrument validation (e.g. wallet proof-of-control). Not completed in this demo.
                </li>
              </ul>
            </div>
          )}

          {currentStep === 'tier1_declaration' && (
            <div className="space-y-4">
              <p className="text-gray-400">
                Enter your <strong className="text-white">full legal name</strong> and <strong className="text-white">date of birth</strong> exactly as printed on the ID you will upload. Discrepancies over policy thresholds trigger
                rejection or manual review.
              </p>
              <div>
                <label htmlFor="kyc-legal-name" className="mb-1 block text-xs font-medium text-gray-400">
                  Full legal name
                </label>
                <input
                  id="kyc-legal-name"
                  type="text"
                  autoComplete="name"
                  value={form.legalName}
                  onChange={(e) => setForm((f) => ({ ...f, legalName: e.target.value }))}
                  className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white placeholder-gray-500 focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/40"
                  placeholder="As shown on government ID"
                />
              </div>
              <div>
                <label htmlFor="kyc-dob" className="mb-1 block text-xs font-medium text-gray-400">
                  Date of birth
                </label>
                <input
                  id="kyc-dob"
                  type="date"
                  value={form.dob}
                  onChange={(e) => setForm((f) => ({ ...f, dob: e.target.value }))}
                  className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/40"
                />
                {form.dob && ageFromDob(form.dob) !== null && ageFromDob(form.dob)! < 18 && (
                  <p className="mt-1 text-xs text-red-400">You must be 18 or older. Submissions under 18 are not accepted.</p>
                )}
              </div>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-700 bg-gray-800/40 p-3">
                <input
                  type="checkbox"
                  checked={form.affirm18}
                  onChange={(e) => setForm((f) => ({ ...f, affirm18: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-gray-800 text-red-500"
                />
                <span>I affirm under penalty of perjury that I am 18+ and the information above is true.</span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-700 bg-gray-800/40 p-3">
                <input
                  type="checkbox"
                  checked={form.affirmIdMatch}
                  onChange={(e) => setForm((f) => ({ ...f, affirmIdMatch: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-gray-800 text-red-500"
                />
                <span>
                  I will upload an ID that matches this name and DOB. I understand mismatches may be rejected or
                  escalated to compliance.
                </span>
              </label>
            </div>
          )}

          {currentStep === 'document_upload' && (
            <div className="space-y-4">
              <p className="text-gray-400">
                Upload <strong className="text-white">clear, color photos</strong> of an <strong className="text-white">unexpired</strong> government-issued photo ID. Production flow: multipart upload → malware scan → encrypted vault
                (e.g. enterprise object storage with CMK) → ML document extraction in an isolated inference environment.
              </p>
              <div>
                <label htmlFor="kyc-id-type" className="mb-1 block text-xs font-medium text-gray-400">
                  Document type
                </label>
                <select
                  id="kyc-id-type"
                  value={form.idType}
                  onChange={(e) => setForm((f) => ({ ...f, idType: e.target.value }))}
                  className="w-full rounded-lg border border-gray-600 bg-gray-800 px-3 py-2 text-white focus:border-red-500/50 focus:outline-none focus:ring-1 focus:ring-red-500/40"
                >
                  {ID_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-lg border border-dashed border-gray-600 p-3">
                  <IdentificationIcon className="mb-2 h-6 w-6 text-gray-500" />
                  <p className="mb-2 text-xs font-medium text-white">ID — front</p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="text-xs text-gray-400 file:mr-2 file:rounded file:border-0 file:bg-gray-700 file:px-2 file:py-1 file:text-white"
                    onChange={(e) =>
                      setForm((f) => ({ ...f, idFrontName: e.target.files?.[0]?.name ?? null }))
                    }
                  />
                  {form.idFrontName && <p className="mt-1 truncate text-xs text-emerald-400">{form.idFrontName}</p>}
                </div>
                <div className="rounded-lg border border-dashed border-gray-600 p-3">
                  <IdentificationIcon className="mb-2 h-6 w-6 text-gray-500" />
                  <p className="mb-2 text-xs font-medium text-white">ID — back</p>
                  <p className="mb-2 text-[10px] text-gray-500">If your ID is single-sided (e.g. passport main page), upload the same image twice for demo.</p>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    className="text-xs text-gray-400 file:mr-2 file:rounded file:border-0 file:bg-gray-700 file:px-2 file:py-1 file:text-white"
                    onChange={(e) =>
                      setForm((f) => ({ ...f, idBackName: e.target.files?.[0]?.name ?? null }))
                    }
                  />
                  {form.idBackName && <p className="mt-1 truncate text-xs text-emerald-400">{form.idBackName}</p>}
                </div>
              </div>
            </div>
          )}

          {currentStep === 'selfie_liveness' && (
            <div className="space-y-4">
              <p className="text-gray-400">
                Production pipeline runs <strong className="text-white">liveness detection</strong> (pose, blink,
                optical flow, replay / screen-moiré checks) and <strong className="text-white">face matching</strong>{' '}
                between ID portrait and selfie frames. Target auto-pass example: cosine similarity ≥ 0.87 on embeddings
                combined with liveness confidence — exact thresholds are policy-tuned.
              </p>
              <div className="rounded-lg border border-dashed border-gray-600 p-3">
                <CameraIcon className="mb-2 h-6 w-6 text-gray-500" />
                <p className="mb-2 text-xs font-medium text-white">Selfie sequence (demo: single file)</p>
                <p className="mb-2 text-[10px] text-gray-500">
                  In production you would record a short guided sequence (head turns, smile). Here, attach one image or
                  short video for UI parity only — nothing is uploaded to a server in this build.
                </p>
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,video/webm,video/quicktime"
                  className="text-xs text-gray-400 file:mr-2 file:rounded file:border-0 file:bg-gray-700 file:px-2 file:py-1 file:text-white"
                  onChange={(e) =>
                    setForm((f) => ({ ...f, selfieName: e.target.files?.[0]?.name ?? null }))
                  }
                />
                {form.selfieName && <p className="mt-1 truncate text-xs text-emerald-400">{form.selfieName}</p>}
              </div>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-700 bg-gray-800/40 p-3">
                <input
                  type="checkbox"
                  checked={form.affirmLiveSelfie}
                  onChange={(e) => setForm((f) => ({ ...f, affirmLiveSelfie: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-gray-800 text-red-500"
                />
                <span>
                  I affirm this capture is <strong className="text-white">live</strong> and depicts me personally — not a
                  mask, print, or replay of another device&apos;s screen.
                </span>
              </label>
            </div>
          )}

          {currentStep === 'processing_consent' && (
            <div className="space-y-4">
              <p className="text-gray-400">
                Under the internal protocol model, submissions traverse event-driven services (upload validation,
                malware scan, vault write, ML inference, risk engine, compliance queue). Immutable audit logs record
                action types and payload hashes — suitable for subpoena response and regulatory examination workflows.
              </p>
              <ul className="list-inside list-disc space-y-1 text-xs text-gray-500">
                <li>Document intelligence: structured JSON extraction; tampering / confidence scores.</li>
                <li>Fraud signals: duplicate document hash, IP / device anomalies, reused face embeddings.</li>
                <li>Manual review: watermarked, time-limited reviewer access with structured rationale.</li>
              </ul>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-700 bg-gray-800/40 p-3">
                <input
                  type="checkbox"
                  checked={form.consentAutomatedProcessing}
                  onChange={(e) => setForm((f) => ({ ...f, consentAutomatedProcessing: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-gray-800 text-red-500"
                />
                <span>
                  I consent to <strong className="text-white">automated processing</strong> of my biometrics and ID
                  images for verification, fraud prevention, and risk scoring as described.
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-700 bg-gray-800/40 p-3">
                <input
                  type="checkbox"
                  checked={form.consentRetention}
                  onChange={(e) => setForm((f) => ({ ...f, consentRetention: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-gray-800 text-red-500"
                />
                <span>
                  I understand records may be retained <strong className="text-white">7 years or longer</strong> where
                  law or legal hold requires, and that access follows zero-trust RBAC.
                </span>
              </label>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-gray-700 bg-gray-800/40 p-3">
                <input
                  type="checkbox"
                  checked={form.consent2257StyleRecords}
                  onChange={(e) => setForm((f) => ({ ...f, consent2257StyleRecords: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-gray-800 text-red-500"
                />
                <span>
                  If I upload explicit content, I understand the platform may associate this verification packet with
                  content metadata for <strong className="text-white">2257-style</strong> index and audit purposes.
                </span>
              </label>
            </div>
          )}

          {currentStep === 'review_submit' && (
            <div className="space-y-4">
              <p className="text-gray-400">Review your declarations before simulated submission.</p>
              <dl className="space-y-2 rounded-lg border border-gray-700 bg-gray-800/30 p-3 text-xs">
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-500">Legal name</dt>
                  <dd className="text-right text-white">{form.legalName || '—'}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-500">Date of birth</dt>
                  <dd className="text-right text-white">{form.dob || '—'}</dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-500">ID type</dt>
                  <dd className="text-right text-white">
                    {ID_TYPES.find((x) => x.value === form.idType)?.label ?? form.idType}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-500">ID uploads</dt>
                  <dd className="text-right text-emerald-400">
                    {form.idFrontName && form.idBackName ? 'Front + back attached' : 'Incomplete'}
                  </dd>
                </div>
                <div className="flex justify-between gap-2">
                  <dt className="text-gray-500">Selfie</dt>
                  <dd className="text-right text-emerald-400">{form.selfieName ? 'Attached' : '—'}</dd>
                </div>
              </dl>
              <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-amber-500/30 bg-amber-500/5 p-3">
                <input
                  type="checkbox"
                  checked={form.finalAttestation}
                  onChange={(e) => setForm((f) => ({ ...f, finalAttestation: e.target.checked }))}
                  className="mt-0.5 h-4 w-4 rounded border-gray-600 bg-gray-800 text-red-500"
                />
                <span>
                  I certify that all information and uploads are <strong className="text-white">accurate</strong>, that I
                  am the individual depicted, and I authorize verification under the policies above.
                </span>
              </label>
            </div>
          )}

          {currentStep === 'pipeline' && (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-white">
                <ServerStackIcon className="h-5 w-5 animate-pulse text-amber-400" />
                <span className="font-medium">Orchestration pipeline (simulated)</span>
              </div>
              <ul className="space-y-2">
                {PIPELINE_STEPS.map((label, idx) => (
                  <li
                    key={label}
                    className={`flex gap-2 text-xs ${
                      idx <= pipelineIndex ? 'text-emerald-400' : 'text-gray-600'
                    }`}
                  >
                    <span className="shrink-0">{idx < pipelineIndex ? '✓' : idx === pipelineIndex ? '…' : '○'}</span>
                    <span>{label}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {currentStep === 'complete' && (
            <div className="flex flex-col items-center py-6 text-center">
              <CheckCircleIcon className="h-14 w-14 text-emerald-400" />
              <p className="mt-4 text-lg font-semibold text-white">Verification complete (demo)</p>
              <p className="mt-2 max-w-md text-sm text-gray-400">
                In production, outcomes include <strong className="text-white">auto-approve</strong>,{' '}
                <strong className="text-white">manual_review</strong>, or <strong className="text-white">reject</strong>{' '}
                with immutable audit entries. This session unlocks the studio preview locally only.
              </p>
              <button
                type="button"
                onClick={onComplete}
                className="mt-6 rounded-lg bg-red-500 px-6 py-2.5 text-sm font-semibold text-white hover:bg-red-600"
              >
                Enter creator studio
              </button>
            </div>
          )}
        </div>

        {currentStep !== 'pipeline' && currentStep !== 'complete' && (
          <div className="shrink-0 flex flex-wrap items-center justify-between gap-2 border-t border-gray-700 bg-gray-800/50 px-4 py-3 sm:px-5">
            <button
              type="button"
              onClick={goBack}
              disabled={stepIndex === 0}
              className="rounded-lg border border-gray-600 px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 disabled:opacity-40"
            >
              Back
            </button>
            <div className="flex gap-2">
              {currentStep === 'review_submit' ? (
                <button
                  type="button"
                  disabled={!canProceed()}
                  onClick={runPipeline}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-40"
                >
                  Submit for verification
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!canProceed()}
                  onClick={goNext}
                  className="rounded-lg bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 disabled:opacity-40"
                >
                  Continue
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
