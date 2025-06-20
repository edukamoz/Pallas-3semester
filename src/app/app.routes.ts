import { Routes } from '@angular/router';
import { DesafiosComponent } from './desafios/desafios.component';
import { JogosComponent } from './jogos/jogos.component';
import { RecursosComponent } from './recursos/recursos.component';
import { HomeMainComponent } from './home-main/home-main.component';
import { LoginComponent } from './login/login.component';
import { CadastrarComponent } from './cadastrar/cadastrar.component';
import { DuvidasComponent } from './duvidas/duvidas.component';
import { RankingComponent } from './ranking/ranking.component';
import { RecuperarSenhaComponent } from './recuperar-senha/recuperar-senha.component';
import { SeteErrosComponent } from './sete-erros/sete-erros.component';
import { Challenge1CssComponent } from './challange-1-css/challange-1-css.component';
import { UsuarioComponent } from './usuario/usuario.component';

export const routes: Routes = [
  { path: '', component: HomeMainComponent },
  { path: 'jogos', component: JogosComponent },
  { path: 'desafios', component: DesafiosComponent },
  { path: 'desafios/1', component: Challenge1CssComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cadastrar', component: CadastrarComponent },
  { path: 'recursos', component: RecursosComponent },
  { path: 'recuperar-senha', component: RecuperarSenhaComponent },
  { path: 'duvidas', component: DuvidasComponent },
  { path: 'usuario', component: UsuarioComponent},
  //{ path: 'outros-projetos', component: OutrosProjetosComponent},
  //{ path: 'carreiras', component: CarreirasComponent},
  //{ path: 'canal-suporte', component: CanalSuporteComponent},
  //{ path: 'depoimentos', component: DepoimentosComponent},
  { path: 'ranking', component: RankingComponent },
  { path: 'sete-erros', component: SeteErrosComponent },
];
