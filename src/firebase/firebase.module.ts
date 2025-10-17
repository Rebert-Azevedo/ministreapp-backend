import { Module } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

export const FIREBASE_ADMIN = 'FIREBASE_ADMIN';

@Module({
  providers: [
    {
      provide: FIREBASE_ADMIN,
      useFactory: () => {
        let serviceAccount: ServiceAccount;

        if (process.env.FIREBASE_CREDENTIALS_JSON) {
          serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON);
        } else {
          serviceAccount = require('../../firebase-credentials.json');
        }

        if (admin.apps.length === 0) {
          return admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
          });
        }
        
        return admin.app();
      },
    },
  ],
  exports: [FIREBASE_ADMIN],
})
export class FirebaseModule {}