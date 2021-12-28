import { Dialog } from "@headlessui/react";
import { AnimatePresence, motion } from "framer-motion";

import { Autocomplete } from "../autocomplete";

interface SearchModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function SearchModal({ isOpen, setIsOpen }: SearchModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog as="div" open className="fixed inset-0 z-30 overflow-y-auto" onClose={setIsOpen}>
          <div className="flex items-start justify-center min-h-screen px-4 pt-4 pb-20 sm:p-0">
            <Dialog.Overlay
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 1,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              exit={{
                opacity: 0,
                transition: { duration: 0.15, ease: "easeIn" },
              }}
              className="fixed inset-0 bg-black/40 filter backdrop-blur-lg"
            />

            {/* This element is to trick the browser into centering the modal contents. */}
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{
                scale: 1,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
              exit={{
                scale: 0.95,
                transition: { duration: 0.15, ease: "easeIn" },
              }}
              className="relative inline-block w-full overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg"
            >
              <div>
                <Dialog.Title as="h3" className="sr-only">
                  Search results
                </Dialog.Title>
                <Autocomplete close={() => setIsOpen(false)} />
              </div>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}
