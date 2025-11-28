"use client"

import { useAttendanceContract } from "@/hooks/useContract"
import { useAccount } from "wagmi"

const SampleIntregation = () => {
  const { isConnected } = useAccount()
  const { data, actions, state } = useAttendanceContract()

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h2 className="text-2xl font-bold mb-3">Attendance Contract</h2>
          <p>Please connect your wallet to interact with the contract.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Attendance Tracker</h1>
          <p className="text-sm mt-1">Mark your attendance on-chain</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="border rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide mb-2">Total Attendees</p>
            <p className="text-2xl font-semibold">{data.totalAttendees}</p>
          </div>

          <div className="border rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide mb-2">Your Status</p>
            <p className="text-2xl font-semibold">
              {data.hasMarked ? "✔ Marked" : "Not Marked"}
            </p>
          </div>
        </div>

        <button
          onClick={actions.markAttendance}
          disabled={state.isLoading || data.hasMarked}
          className="w-full px-6 py-2 bg-primary text-white rounded-lg font-medium disabled:opacity-50"
        >
          {state.isLoading ? "Processing..." : data.hasMarked ? "Already Marked" : "Mark Attendance"}
        </button>

        {state.hash && (
          <div className="mt-6 p-4 border rounded-lg">
            <p className="text-xs uppercase tracking-wide mb-2">Transaction Hash</p>
            <p className="text-sm break-all mb-3">{state.hash}</p>
            {state.isConfirming && <p>Waiting for confirmation...</p>}
            {state.isConfirmed && <p className="text-green-500">Confirmed!</p>}
          </div>
        )}

        {state.error && (
          <div className="mt-6 p-4 border border-red-500 rounded-lg">
            <p className="text-red-600">Error: {state.error.message}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default SampleIntregation
