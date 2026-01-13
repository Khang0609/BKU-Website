import React from 'react'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useProfileContext } from '@/app/(student)/_context/ProfileContext'
import { AccordionProps } from '@/app/(student)/_types/profile_info'

export default function Accordion({ title, icon, children, id }: AccordionProps) {
  const { expandedSections, toggleSection } = useProfileContext();
  const isOpen = expandedSections[id];
  
  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
      <button
        onClick={() => toggleSection(id)}
        className="flex w-full items-center justify-between px-6 py-4 transition-colors hover:bg-slate-50"
      >
        <div className="flex items-center gap-3">
          <div className="text-slate-400">{icon}</div>
          <h3 className="font-semibold text-slate-700">{title}</h3>
        </div>
        <div
          className={`text-slate-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
        >
          <ChevronDown size={20} />
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-t border-slate-100"
          >
            <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 lg:grid-cols-4">
              {children}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}