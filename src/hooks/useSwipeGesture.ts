'use client'

import { useRef, useCallback } from 'react'

interface SwipeHandlers {
  onSwipeLeft?: () => void
  onSwipeRight?: () => void
  onSwipeUp?: () => void
  onSwipeDown?: () => void
  minSwipeDistance?: number
  preventDefaultTouchmoveEvent?: boolean
}

interface TouchPosition {
  x: number
  y: number
}

export function useSwipeGesture({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  minSwipeDistance = 50,
  preventDefaultTouchmoveEvent = false
}: SwipeHandlers) {
  const touchStartPos = useRef<TouchPosition>({ x: 0, y: 0 })
  const touchEndPos = useRef<TouchPosition>({ x: 0, y: 0 })

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchEndPos.current = { x: 0, y: 0 }
    touchStartPos.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    }
  }, [])

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (preventDefaultTouchmoveEvent) {
      e.preventDefault()
    }
    touchEndPos.current = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    }
  }, [preventDefaultTouchmoveEvent])

  const onTouchEnd = useCallback(() => {
    if (!touchStartPos.current.x || !touchStartPos.current.y) return

    const deltaX = touchStartPos.current.x - touchEndPos.current.x
    const deltaY = touchStartPos.current.y - touchEndPos.current.y

    const isLeftSwipe = deltaX > minSwipeDistance
    const isRightSwipe = deltaX < -minSwipeDistance
    const isUpSwipe = deltaY > minSwipeDistance
    const isDownSwipe = deltaY < -minSwipeDistance

    // Determine if swipe is more horizontal or vertical
    const isHorizontalSwipe = Math.abs(deltaX) > Math.abs(deltaY)

    if (isHorizontalSwipe) {
      if (isLeftSwipe && onSwipeLeft) {
        onSwipeLeft()
      } else if (isRightSwipe && onSwipeRight) {
        onSwipeRight()
      }
    } else {
      if (isUpSwipe && onSwipeUp) {
        onSwipeUp()
      } else if (isDownSwipe && onSwipeDown) {
        onSwipeDown()
      }
    }
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, minSwipeDistance])

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  }
}

// Enhanced swipe hook with velocity and momentum
export function useAdvancedSwipe({
  onSwipeLeft,
  onSwipeRight,
  onSwipeUp,
  onSwipeDown,
  minSwipeDistance = 50,
  minVelocity = 0.3
}: SwipeHandlers & { minVelocity?: number }) {
  const touchData = useRef({
    startTime: 0,
    startPos: { x: 0, y: 0 },
    endPos: { x: 0, y: 0 }
  })

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    touchData.current.startTime = Date.now()
    touchData.current.startPos = {
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY
    }
  }, [])

  const onTouchEnd = useCallback((e: React.TouchEvent) => {
    const endTime = Date.now()
    touchData.current.endPos = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY
    }

    const deltaX = touchData.current.startPos.x - touchData.current.endPos.x
    const deltaY = touchData.current.startPos.y - touchData.current.endPos.y
    const deltaTime = endTime - touchData.current.startTime

    const velocity = Math.sqrt(deltaX * deltaX + deltaY * deltaY) / deltaTime

    if (velocity < minVelocity) return

    const absX = Math.abs(deltaX)
    const absY = Math.abs(deltaY)

    if (absX > absY && absX > minSwipeDistance) {
      if (deltaX > 0 && onSwipeLeft) {
        onSwipeLeft()
      } else if (deltaX < 0 && onSwipeRight) {
        onSwipeRight()
      }
    } else if (absY > minSwipeDistance) {
      if (deltaY > 0 && onSwipeUp) {
        onSwipeUp()
      } else if (deltaY < 0 && onSwipeDown) {
        onSwipeDown()
      }
    }
  }, [onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, minSwipeDistance, minVelocity])

  return {
    onTouchStart,
    onTouchEnd
  }
}
