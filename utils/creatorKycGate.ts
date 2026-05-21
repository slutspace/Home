/** User must sign up from profile before creator KYC modal can appear */
export const CREATOR_KYC_ELIGIBLE_KEY = 'slutspace_creator_kyc_eligible'

export function readCreatorKycEligible(): boolean {
  if (typeof window === 'undefined') return false
  return localStorage.getItem(CREATOR_KYC_ELIGIBLE_KEY) === 'true'
}

export function setCreatorKycEligible(): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CREATOR_KYC_ELIGIBLE_KEY, 'true')
}
