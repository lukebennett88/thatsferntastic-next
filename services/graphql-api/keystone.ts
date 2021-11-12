import { config } from '@keystone-next/keystone';
import { statelessSessions } from '@keystone-next/keystone/session';

import { sessionSecret, withAuth } from './auth';
import { lists } from './schema';

const SESSION_MAX_AGE = 60 * 60 * 24 * 30; // 30 days

const session = statelessSessions({
  maxAge: SESSION_MAX_AGE,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  secret: sessionSecret!,
});

export default withAuth(
  config({
    db: {
      provider: 'sqlite',
      url: 'file:./keystone.db',
    },
    lists,
    server: {
      port: 8080,
    },
    session,
    ui: {
      isAccessAllowed: (context) => !!context.session?.data,
    },
  })
);
