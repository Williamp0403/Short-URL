import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createLink } from "../services/link";
import { useState } from "react";

export function useLink () {
  const queryClient = useQueryClient()
  const [modalOpen, setModalOpen] = useState(false)
  const [lastCreatedLink, setLastCreatedLink] = useState(null)

  const { mutate, isPending } = useMutation({
    mutationFn: createLink,
    onSuccess: (link) => {
      setLastCreatedLink(link.short_url)
      setModalOpen(true)
      queryClient.invalidateQueries({ queryKey: ['dashboardSummary'] })
      queryClient.setQueryData(['links'], (oldData) => {
      if (!oldData) return [link]
      return [link, ...oldData] 
    })
    }
  })

  return {
    isPending,
    modalOpen,
    lastCreatedLink,
    setModalOpen,
    mutate
  }
}