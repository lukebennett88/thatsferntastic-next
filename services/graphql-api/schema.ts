import { createSchema, list } from '@keystone-next/keystone';
import { password, text, virtual } from '@keystone-next/keystone/fields';
import { graphql } from '@keystone-next/keystone/types';

const User = list({
  ui: {
    listView: {
      initialColumns: ['name', 'email'],
    },
  },
  defaultIsFilterable: true,
  defaultIsOrderable: true,
  fields: {
    // Name
    name: virtual({
      field: graphql.field({
        type: graphql.String,
        resolve(item) {
          return (
            [item.firstName, item.lastName].filter(Boolean).join(' ') ||
            '(no name)'
          );
        },
      }),
      ui: { itemView: { fieldMode: 'hidden' } },
    }),
    firstName: text(),
    lastName: text(),
    preferredName: text(),

    // Contact
    email: text({ isIndexed: 'unique', isFilterable: true }),
    password: password(),
  },
});

export const lists = createSchema({
  User,
});
