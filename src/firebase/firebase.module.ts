import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

// O nome do provedor que usaremos para injetar o Firebase Admin
export const FIREBASE_ADMIN = 'FIREBASE_ADMIN';

@Module({
  providers: [
    {
      provide: FIREBASE_ADMIN,
      useFactory: () => {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const serviceAccount = require('../../firebase-credentials.json');

        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount as ServiceAccount),
        });
      },
    },
  ],
  exports: [FIREBASE_ADMIN],
})
export class FirebaseModule {}