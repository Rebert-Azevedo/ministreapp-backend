import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IgrejasModule } from './igrejas/igrejas.module';
import { UsuariosModule } from './usuarios/usuarios.module';
import { MinisteriosModule } from './ministerios/ministerios.module';
import { FuncoesModule } from './funcoes/funcoes.module';
import { EventosModule   } from './eventos/eventos.module';
import { MusicasModule } from './musicas/musicas.module';
import { ItensInventarioModule } from './itens-inventario/itens-inventario.module';
import { DespesasModule } from './despesas/despesas.module';
import { FirebaseModule } from './firebase/firebase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),
        entities: [],
        autoLoadEntities: true,
        synchronize: false,
        logging: true,
      }),
    }),
    IgrejasModule,
    UsuariosModule,
    MinisteriosModule,
    FuncoesModule,
    EventosModule,
    MusicasModule,
    ItensInventarioModule,
    FirebaseModule,
    DespesasModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}