import { formatBookingForWhatsApp, validateBookingData, sendToWhatsApp } from '../whatsapp'

// Mock window.open for testing
const mockWindowOpen = jest.fn()
Object.defineProperty(window, 'open', {
  value: mockWindowOpen,
  writable: true
})

describe('WhatsApp Integration', () => {
  const sampleBookingData = {
    destination: 'Kashmir, India',
    departureDate: '2024-06-15',
    returnDate: '2024-06-22',
    adults: 2,
    children: 1,
    roomType: 'deluxe',
    specialRequests: 'Vegetarian meals only',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+91 9876543210',
    address: '123 Main St, Mumbai',
    emergencyContact: '+91 9876543211'
  }

  describe('formatBookingForWhatsApp', () => {
    it('should format booking data correctly for WhatsApp message', () => {
      const message = formatBookingForWhatsApp(sampleBookingData)
      
      expect(message).toContain('🏖️ *NEW BOOKING INQUIRY* 🏖️')
      expect(message).toContain('*Destination:* Kashmir, India')
      expect(message).toContain('*Travel Dates:* 2024-06-15 to 2024-06-22')
      expect(message).toContain('*Travelers:* 2 Adults, 1 Child')
      expect(message).toContain('*Name:* John Doe')
      expect(message).toContain('*Email:* john.doe@example.com')
      expect(message).toContain('*Phone:* +91 9876543210')
      expect(message).toContain('*Address:* 123 Main St, Mumbai')
      expect(message).toContain('*Emergency Contact:* +91 9876543211')
      expect(message).toContain('*Special Requests:*')
      expect(message).toContain('Vegetarian meals only')
    })

    it('should handle missing optional fields', () => {
      const minimalData = {
        destination: 'Goa, India',
        departureDate: '2024-07-01',
        returnDate: '2024-07-07',
        adults: 1,
        children: 0,
        roomType: '',
        firstName: 'Jane',
        lastName: 'Smith',
        email: 'jane@example.com',
        phone: '9876543210'
      }

      const message = formatBookingForWhatsApp(minimalData)
      
      expect(message).toContain('*Destination:* Goa, India')
      expect(message).toContain('*Travelers:* 1 Adult')
      expect(message).not.toContain('*Address:*')
      expect(message).not.toContain('*Emergency Contact:*')
      expect(message).not.toContain('*Special Requests:*')
    })
  })

  describe('validateBookingData', () => {
    it('should validate correct booking data', () => {
      const result = validateBookingData(sampleBookingData)
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('should catch missing required fields', () => {
      const invalidData = {
        destination: '',
        departureDate: '',
        returnDate: '',
        adults: 0,
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      }

      const result = validateBookingData(invalidData)
      expect(result.isValid).toBe(false)
      expect(result.errors.length).toBeGreaterThan(0)
    })

    it('should validate email format', () => {
      const invalidEmailData = {
        ...sampleBookingData,
        email: 'invalid-email'
      }

      const result = validateBookingData(invalidEmailData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Please enter a valid email address')
    })

    it('should validate phone number format', () => {
      const invalidPhoneData = {
        ...sampleBookingData,
        phone: '123'
      }

      const result = validateBookingData(invalidPhoneData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Please enter a valid phone number')
    })

    it('should validate date logic', () => {
      const invalidDateData = {
        ...sampleBookingData,
        departureDate: '2024-06-22',
        returnDate: '2024-06-15'
      }

      const result = validateBookingData(invalidDateData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Return date must be after departure date')
    })

    it('should prevent past dates', () => {
      const pastDateData = {
        ...sampleBookingData,
        departureDate: '2020-01-01'
      }

      const result = validateBookingData(pastDateData)
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Departure date cannot be in the past')
    })
  })

  describe('sendToWhatsApp', () => {
    beforeEach(() => {
      mockWindowOpen.mockClear()
    })

    it('should open WhatsApp with correct URL', () => {
      sendToWhatsApp(sampleBookingData)
      
      expect(mockWindowOpen).toHaveBeenCalledTimes(1)
      const [url] = mockWindowOpen.mock.calls[0]
      expect(url).toContain('wa.me/918401271114')
      expect(url).toContain('text=')
    })

    it('should encode message properly', () => {
      sendToWhatsApp(sampleBookingData)
      
      const [url] = mockWindowOpen.mock.calls[0]
      const textParam = url.split('text=')[1]
      const decodedMessage = decodeURIComponent(textParam)
      
      expect(decodedMessage).toContain('NEW BOOKING INQUIRY')
      expect(decodedMessage).toContain('Kashmir, India')
    })
  })
})
