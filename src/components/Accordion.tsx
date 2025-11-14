import React, { useState } from 'react'

interface AccordionProps {
  children: React.ReactNode
  defaultOpen?: string[]
  allowMultiple?: boolean
}

interface AccordionItemProps {
  value: string
  children: React.ReactNode
}

interface AccordionTriggerProps {
  children: React.ReactNode
  className?: string
}

interface AccordionContentProps {
  children: React.ReactNode
  className?: string
}

export function Accordion({ children, defaultOpen = [], allowMultiple = true }: AccordionProps) {
  const [openItems, setOpenItems] = useState<Set<string>>(new Set(defaultOpen))

  const toggleItem = (value: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(value)) {
        next.delete(value)
      } else {
        if (!allowMultiple) {
          next.clear()
        }
        next.add(value)
      }
      return next
    })
  }

  return (
    <div className="accordion">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen: openItems.has(child.props.value),
            onToggle: () => toggleItem(child.props.value),
          })
        }
        return child
      })}
    </div>
  )
}

export function AccordionItem({ value, children, isOpen, onToggle }: AccordionItemProps & { isOpen?: boolean; onToggle?: () => void }) {
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, {
            isOpen,
            onToggle,
          })
        }
        return child
      })}
    </div>
  )
}

export function AccordionTrigger({ children, className = '', isOpen, onToggle }: AccordionTriggerProps & { isOpen?: boolean; onToggle?: () => void }) {
  return (
    <button
      onClick={onToggle}
      className={`flex w-full items-center justify-between gap-4 py-4 text-left transition-all hover:bg-gray-50 ${className}`}
    >
      <span className="flex-1">{children}</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </button>
  )
}

export function AccordionContent({ children, className = '', isOpen }: AccordionContentProps & { isOpen?: boolean }) {
  return (
    <div
      className={`overflow-hidden transition-all duration-200 ${
        isOpen ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
      } ${className}`}
    >
      <div className="pb-4 pt-0">{children}</div>
    </div>
  )
}

