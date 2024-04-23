import React, { createContext } from 'react'

export const paymentContext = createContext({
    "amount":0,
    "eventId":"dummy-id",
    "venueId":"dummy-venue",
    "email":"dummy-email",
    "contact":"dumm-contact",
    "ticketsCount":0
})

