import { SearchIcon } from '@heroicons/react/outline';
import { classNames } from '@thatsferntastic/utils';
import * as React from 'react';
import { useState } from 'react';

import { SearchModal } from '../search-modal';

export function SearchButton(): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        !isOpen &&
        // The `Cmd+K` shortcut both opens and closes the modal.
        event.key === 'k' &&
        (event.metaKey || event.ctrlKey)
      ) {
        open();
      }
    }

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen]);

  return (
    <>
      <button
        onClick={open}
        className={classNames(
          'relative w-56 px-10 py-2 leading-5 text-left text-gray-500 bg-white border border-gray-200 rounded-full',
          'sm:text-sm',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-pink-600 focus:ring-white focus:border-white'
        )}
      >
        <span className="absolute inset-y-0 left-0 flex items-center p-1 px-3 -ml-1 pointer-events-none">
          <SearchIcon aria-hidden="true" className="w-5 h-5" />
        </span>
        Search
      </button>
      <SearchModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
