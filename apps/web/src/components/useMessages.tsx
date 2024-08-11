import { useEffect, useState } from 'react'

import { Message } from '@/types'

import useUser from './useUser'

const useMessages = (chatroomId: number) => {
  const [messages, setMessages] = useState<Message[]>([])
  const { token } = useUser()

  useEffect(() => {
    if (!token) {
      return undefined // Ensuring consistent return with a "no operation" function
    }

    const cable = new WebSocket(`ws://localhost:3000/cable?token=${token}`)

    cable.onopen = () => {
      cable.send(
        JSON.stringify({
          command: 'subscribe',
          identifier: JSON.stringify({
            channel: 'MessageChannel',
            chat_room_id: chatroomId,
          }),
        })
      )
    }

    cable.onmessage = event => {
      const serverResponse = JSON.parse(event.data)

      if (
        serverResponse?.message &&
        serverResponse.message?.type === 'message'
      ) {
        const { message } = serverResponse.message
        setMessages(prevMessages => [...prevMessages, message])
      }
    }

    // cable.onerror = error => {
    //   // TODO
    // }

    return () => {
      if (cable) {
        cable.close()
      }
    }
  }, [token, chatroomId]) // Include chatroomId as a dependency to ensure the effect runs when it changes

  return messages
}

export default useMessages
