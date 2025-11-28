"use client"

import { useState, useEffect } from "react"
import { useAccount, useReadContract, useWriteContract, useWaitForTransactionReceipt } from "wagmi"
import { contractABI, contractAddress } from "@/lib/contract"

export interface ContractData {
  totalAttendees: number
  hasMarked: boolean
}

export interface ContractState {
  isLoading: boolean
  isPending: boolean
  isConfirming: boolean
  isConfirmed: boolean
  hash: `0x${string}` | undefined
  error: Error | null
}

export interface ContractActions {
  markAttendance: () => Promise<void>
}

export const useAttendanceContract = () => {
  const { address } = useAccount()

  const { data: totalAttendees, refetch: refetchTotal } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "getTotalAttendees",
  })

  const { data: hasMarked, refetch: refetchMarked } = useReadContract({
    address: contractAddress,
    abi: contractABI,
    functionName: "hasMarked",
    args: [address],
    query: { enabled: !!address },
  })

  const { writeContractAsync, data: hash, error, isPending } = useWriteContract()
  const { isLoading: isConfirming, isSuccess: isConfirmed } = useWaitForTransactionReceipt({ hash })

  useEffect(() => {
    if (isConfirmed) {
      refetchTotal()
      refetchMarked()
    }
  }, [isConfirmed, refetchMarked, refetchTotal])

  const markAttendance = async () => {
    if (!address) return

    try {
      await writeContractAsync({
        address: contractAddress,
        abi: contractABI,
        functionName: "markAttendance",
      })
    } catch (err) {
      console.error("Error marking attendance:", err)
      throw err
    }
  }

  const data: ContractData = {
    totalAttendees: totalAttendees ? Number(totalAttendees) : 0,
    hasMarked: hasMarked ? Boolean(hasMarked) : false,
  }

  const actions: ContractActions = { markAttendance }

  const state: ContractState = {
    isLoading: isPending || isConfirming,
    isPending,
    isConfirming,
    isConfirmed,
    hash,
    error,
  }

  return { data, actions, state }
}
