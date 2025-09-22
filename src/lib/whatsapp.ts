export interface BookingData {
  destination: string
  customDestination?: string
  departureDate: string
  returnDate: string
  adults: number
  children: number
  roomType: string
  specialRequests?: string
  firstName: string
  lastName: string
  email: string
  phone: string
  address?: string
  emergencyContact?: string
}

export const formatBookingForWhatsApp = (data: BookingData): string => {
  const destination = data.destination || data.customDestination || 'Not specified'
  const travelersText = `${data.adults} Adult${data.adults > 1 ? 's' : ''}${data.children > 0 ? `, ${data.children} Child${data.children > 1 ? 'ren' : ''}` : ''}`
  
  // Format dates for better readability
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-IN', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }
  
  const departureDate = formatDate(data.departureDate)
  const returnDate = formatDate(data.returnDate)
  const duration = Math.ceil((new Date(data.returnDate).getTime() - new Date(data.departureDate).getTime()) / (1000 * 60 * 60 * 24))
  
  const message = `✨ *FLYNZO TRAVEL INQUIRY* ✨

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🎯 *TRAVEL DESTINATION*
📍 ${destination}

📅 *TRAVEL ITINERARY*
🗓️ *Departure:* ${departureDate}
🗓️ *Return:* ${returnDate}
⏱️ *Duration:* ${duration} ${duration === 1 ? 'day' : 'days'}

👥 *TRAVEL GROUP*
👨‍👩‍👧‍👦 *Total Travelers:* ${travelersText}
${data.roomType ? `🏨 *Accommodation:* ${data.roomType.charAt(0).toUpperCase() + data.roomType.slice(1)} Room` : ''}

👤 *CUSTOMER DETAILS*
📝 *Name:* ${data.firstName} ${data.lastName}
📧 *Email:* ${data.email}
📱 *Phone:* ${data.phone}
${data.address ? `🏠 *Address:* ${data.address}` : ''}
${data.emergencyContact ? `🚨 *Emergency Contact:* ${data.emergencyContact}` : ''}

${data.specialRequests ? `📋 *SPECIAL REQUIREMENTS*\n${data.specialRequests}\n` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⏰ *Inquiry Received:* ${new Date().toLocaleString('en-IN', { 
    timeZone: 'Asia/Kolkata',
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })}

🎯 *PRIORITY:* HIGH
🚀 *Action Required:* Please contact customer within 2 hours

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Thank you for choosing Flynzo! 🌟`

  return message
}

export const sendToWhatsApp = async (bookingData: BookingData): Promise<{ success: boolean; message?: string; error?: string }> => {
  try {
    const response = await fetch('/api/send-whatsapp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookingData),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Failed to send WhatsApp message')
    }

    return {
      success: true,
      message: result.message
    }
  } catch (error) {
    console.error('WhatsApp API error:', error)
    
    // Fallback to manual WhatsApp opening
    const message = formatBookingForWhatsApp(bookingData)
    const phoneNumber = '918401271114'
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    // Open WhatsApp in a new tab as fallback
    window.open(whatsappUrl, '_blank')
    
    return {
      success: false,
      error: 'WhatsApp API unavailable, opened manual WhatsApp'
    }
  }
}

// Fallback method for manual WhatsApp sending
export const sendToWhatsAppManual = (bookingData: BookingData): void => {
  const message = formatBookingForWhatsApp(bookingData)
  const phoneNumber = '918401271114'
  const encodedMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
  
  // Open WhatsApp in a new tab
  window.open(whatsappUrl, '_blank')
}

export const validateBookingData = (data: Partial<BookingData>): { isValid: boolean; errors: string[] } => {
  const errors: string[] = []
  
  // Required fields validation
  if (!data.destination && !data.customDestination) {
    errors.push('Please select or enter a destination')
  }
  
  if (!data.departureDate) {
    errors.push('Departure date is required')
  }
  
  if (!data.returnDate) {
    errors.push('Return date is required')
  }
  
  if (data.departureDate && data.returnDate) {
    const departure = new Date(data.departureDate)
    const returnDate = new Date(data.returnDate)
    
    if (departure >= returnDate) {
      errors.push('Return date must be after departure date')
    }
    
    if (departure < new Date()) {
      errors.push('Departure date cannot be in the past')
    }
  }
  
  if (!data.adults || data.adults < 1) {
    errors.push('At least 1 adult is required')
  }
  
  if (!data.firstName?.trim()) {
    errors.push('First name is required')
  }
  
  if (!data.lastName?.trim()) {
    errors.push('Last name is required')
  }
  
  if (!data.email?.trim()) {
    errors.push('Email is required')
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.push('Please enter a valid email address')
  }
  
  if (!data.phone?.trim()) {
    errors.push('Phone number is required')
  } else if (!/^[\+]?[0-9\s\-\(\)]{10,}$/.test(data.phone.replace(/\s/g, ''))) {
    errors.push('Please enter a valid phone number')
  }
  
  return {
    isValid: errors.length === 0,
    errors
  }
}
