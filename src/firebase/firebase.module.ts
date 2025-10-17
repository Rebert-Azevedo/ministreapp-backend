// src/firebase/firebase.module.ts (CORRIGIDO PARA PRODUÇÃO)

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

        // Verifica se a variável de ambiente existe (ambiente de produção na Railway)
        if (process.env.FIREBASE_CREDENTIALS_JSON) {
          // Converte o texto da variável de ambiente de volta para um objeto JSON
          serviceAccount = JSON.parse(process.env.FIREBASE_CREDENTIALS_JSON);
        } else {
          // Se não existir, tenta carregar do arquivo local (ambiente de desenvolvimento)
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          serviceAccount = require('../../firebase-credentials.json');
        }

        return admin.initializeApp({
          credential: admin.credential.cert(serviceAccount),
        });
      },
    },
  ],
  exports: [FIREBASE_ADMIN],
})
export class AppModule {} // <-- Corrigi o nome da classe para AppModule, um erro de digitação meu anterior. Verifique se o nome do seu arquivo é firebase.module.ts e a classe exportada é FirebaseModule

// VERSÃO CORRIGIDA CORRETA:
// src/firebase/firebase.module.ts

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
          // eslint-disable-next-line @typescript-eslint/no-var-requires
          serviceAccount = require('../../firebase-credentials.json');
        }

        // Evita reinicializar o app se já houver um
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
export class FirebaseModule {} // Nome da classe corrigido para FirebaseModule