'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ArrowTopRightOnSquareIcon, ArrowLeftIcon } from '@heroicons/react/24/outline'
import { setCreatorKycEligible } from '../../utils/creatorKycGate'

export default function SignupPage() {
  const router = useRouter()
  const [fromProfile, setFromProfile] = useState(false)
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [countdown, setCountdown] = useState(5)
  const [error, setError] = useState('')

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search)
    setFromProfile(searchParams.get('from') === 'profile')
  }, [])

  // Check for error parameter in URL
  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const errorParam = searchParams.get('error');
    
    if (errorParam) {
      const errorMessages: Record<string, string> = {
        'missing_code': 'Authentication code was missing from the response.',
        'token_error': 'Failed to authenticate with Coinbase.',
        'user_data_error': 'Could not retrieve user information.',
        'unknown_error': 'An unknown error occurred during authentication.'
      };
      
      setError(errorMessages[errorParam] || 'Authentication failed.');
    }
  }, []);

  useEffect(() => {
    if (isRedirecting) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer)
            window.location.href = '/api/auth/coinbase'
            return 0
          }
          return prev - 1
        })
      }, 1000)
      
      return () => clearInterval(timer)
    }
  }, [isRedirecting])

  const handleRedirectToCoinbase = () => {
    if (fromProfile) {
      setCreatorKycEligible()
      if (typeof window !== 'undefined') {
        localStorage.setItem('isAuthenticated', 'true')
      }
    }
    setIsRedirecting(true)
  }

  const handleCancelRedirect = () => {
    setIsRedirecting(false)
    setCountdown(5)
  }

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Back button */}
        <button
          onClick={() => router.back()}
          className="flex items-center text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <ArrowLeftIcon className="h-5 w-5 mr-2" />
          <span>Back</span>
        </button>

        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-red-500 mb-2">SlutSpace</h1>
          <p className="text-gray-400">Create your account to get started.</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-3 rounded-lg text-sm mb-6">
            {error}
          </div>
        )}

        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-8">
          {isRedirecting ? (
            <div className="text-center py-6">
              <div className="bg-blue-500/20 rounded-full h-20 w-20 flex items-center justify-center mx-auto mb-6">
                <svg className="h-10 w-10 text-blue-500" viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="512" cy="512" r="512" fill="currentColor" fillOpacity="0.2"/>
                  <path d="M516.3 188C334.6 188 188 334.6 188 516.3C188 698 334.6 844.6 516.3 844.6C698 844.6 844.6 698 844.6 516.3C844.6 334.6 698 188 516.3 188ZM516.3 735.5C394.9 735.5 297.1 637.7 297.1 516.3C297.1 394.9 394.9 297.1 516.3 297.1C637.7 297.1 735.5 394.9 735.5 516.3C735.5 637.7 637.7 735.5 516.3 735.5Z" fill="currentColor"/>
                  <path d="M448.4 448.4H584.1C590.5 448.4 596.3 454.2 596.3 460.6V572C596.3 578.4 590.5 584.1 584.1 584.1H448.4C442 584.1 436.3 578.4 436.3 572V460.6C436.3 454.2 442 448.4 448.4 448.4Z" fill="currentColor"/>
                </svg>
              </div>
              <h2 className="text-xl font-bold mb-4">Redirecting to Coinbase...</h2>
              <p className="text-gray-400 mb-6">
                You will be redirected to Coinbase in {countdown} seconds to create your account.
              </p>
              <button
                onClick={handleCancelRedirect}
                className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-6 rounded-lg font-medium"
              >
                Cancel
              </button>
            </div>
          ) : (
            <>
              <div className="text-center mb-6">
                <p className="text-gray-300 mb-6">
                  SlutSpace requires a Coinbase account for secure wallet integration and transactions.
                </p>
                <div className="flex justify-center mb-6">
                  <div className="bg-blue-900/20 border border-blue-800 rounded-lg p-4 max-w-xs">
                    <p className="text-blue-400 text-sm">
                      Your Coinbase account will be used to authenticate you and allow you to interact with blockchain content on SlutSpace.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={handleRedirectToCoinbase}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <span>Sign up with Coinbase</span>
                <ArrowTopRightOnSquareIcon className="h-4 w-4 ml-2" />
              </button>
              
              <div className="mt-6 space-y-4">
                <div className="bg-gray-700/50 rounded-lg p-4">
                  <h3 className="font-medium text-white mb-2">Why Coinbase?</h3>
                  <ul className="text-sm text-gray-400 space-y-2">
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Secure wallet integration
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      Easy blockchain transactions
                    </li>
                    <li className="flex items-start">
                      <span className="text-green-500 mr-2">✓</span>
                      No need to remember additional passwords
                    </li>
                  </ul>
                </div>
              </div>
            </>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have a Coinbase account?{' '}
              <Link href="/login" className="text-blue-500 hover:text-blue-400">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 