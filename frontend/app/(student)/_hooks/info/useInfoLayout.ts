import { useState } from "react";

export const useInfoLayout = () => {
  const [cardExpanded, setCardExpanded] = useState({
    academic: false,
    personal: false,
    contact: false,
  });
  const [expandedSections, setExpandedSections] = useState({
    graduation: false,
    bank: false,
    other: false,
  });

  const toggleCard = (card: keyof typeof cardExpanded) => {
    setCardExpanded((prev) => ({ ...prev, [card]: !prev[card] }));
  };
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  return {
    cardExpanded,
    setCardExpanded,
    expandedSections,
    setExpandedSections,
    toggleCard,
    toggleSection,
  };
};
