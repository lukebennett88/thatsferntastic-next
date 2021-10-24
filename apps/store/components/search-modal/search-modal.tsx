import { Dialog, Transition } from '@headlessui/react';
import { SearchIcon } from '@heroicons/react/outline';
import { classNames } from '@thatsferntastic/utils';
import * as React from 'react';

import { Autocomplete } from '../autocomplete';

export function SearchModal(): JSX.Element {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <>
      <button
        onClick={() => setIsOpen(prev => !prev)}
        title="Submit"
        className={classNames(
          'rounded-md pointer-events-auto p-1 text-gray-400',
          'focus:outline-none focus:ring-2 focus:ring-pink-600 focus:text-gray-600'
        )}
      >
        <span className="sr-only">Open search</span>
        <SearchIcon aria-hidden="true" className="w-5 h-5" />
      </button>
      <Transition.Root show={isOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-30 overflow-y-auto sm:hidden"
          onClose={setIsOpen}
        >
          <div
            className={classNames(
              'flex justify-center min-h-screen text-center'
            )}
          >
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 transition-opacity bg-gray-900 bg-opacity-50 backdrop-filter backdrop-blur" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              aria-hidden="true"
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
            >
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="inline-block w-full overflow-hidden text-left transition-all transform shadow-xl pointer-events-none align-start">
                <div className="p-4 bg-white pointer-events-auto">
                  <Dialog.Title as="h3" className="sr-only">
                    Product search
                  </Dialog.Title>
                  <Autocomplete />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
