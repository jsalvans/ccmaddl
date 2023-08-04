export interface Capitol {
  id: number;
  slug: string;
  programa_id: number;
  programa: string;
  capitol: number;
  titol: string;
  descripcio: string;
  url_imatge: string;
  temporada?: string;
  capitol_temporada?: string;
  url_video?: string;
  url_subtitols?: string;
}

export interface ProgramaQuery {
  resposta: Resposta;
}

export interface Resposta {
  status: string;
  items: Items;
  paginacio: Paginacio;
}

export interface Items {
  num: number;
  item: Item[];
}

export interface Item {
  embedable: boolean;
  entradeta: string;
  avantitol: Avantitol;
  produccio: number;
  tipus_contingut: TipusContingut;
  durada: Durada;
  tipologia: ItemTipologia;
  capitol: number;
  capitol_temporada: number;
  temporades: Canal[];
  nom_friendly: string;
  permatitle: string;
  programa: Avantitol;
  versio: number;
  geolocalitzacions: Canal[];
  codis_etics: Canal[];
  idiomes: Canal[];
  targets: Canal[];
  canals: Canal[];
  programes_tv: ProgramesTv[];
  subtitols: Canal[];
  tematiques: Canal[];
  id: number;
  data_modificacio: string;
  titol: string;
  data_publicacio: string;
  data_caducitat: DataCaducitat;
  domini: Domini;
  data_emissio: string;
  imatges: ItemImatge[];
}

export enum Avantitol {
  Ranma = "Ranma",
}

export interface Canal {
  id: ID;
  desc: CanalDesc;
  main: boolean;
}

export enum CanalDesc {
  Català = "Català",
  Ficció = "Ficció",
  GeolocalitzatES = "Geolocalitzat-ES",
  Infantil = "Infantil",
  Super3 = "Super3",
  The13Anys = "13 anys",
  The1ATemporada = "1a Temporada",
  The2ATemporada = "2a Temporada",
  X3 = "X3",
}

export enum ID {
  CatCA = "CAT_CA",
  Ce13 = "CE_13",
  Espanya = "ESPANYA",
  PuCatala = "PU_CATALA",
  PucS3 = "PUC_S3",
  PucS3X3 = "PUC_S3_X3",
  Puficcio = "PUFICCIO",
  PutInf = "PUT_INF",
  Putemp1 = "PUTEMP_1",
  Putemp2 = "PUTEMP_2",
}

export enum DataCaducitat {
  The29122023235959 = "29/12/2023 23:59:59",
}

export enum Domini {
  Sense = "SENSE",
}

export enum Durada {
  The00232600 = "00:23:26:00",
  The00242500 = "00:24:25:00",
}

export interface ItemImatge {
  text: string;
  mida: PurpleMida;
  type_id: string;
  titol: string;
  rel_name: PurpleRelName;
}

export enum PurpleMida {
  The1014X570 = "1014x570",
  The120X68 = "120x68",
  The200X113 = "200x113",
  The320X180 = "320x180",
  The326X184 = "326x184",
  The426X240 = "426x240",
  The670X378 = "670x378",
}

export enum PurpleRelName {
  Keyvideo = "KEYVIDEO",
}

export interface ProgramesTv {
  id: string;
  desc: TitolEnum;
  nom: Nom;
  tipologia: ProgramesTvTipologia;
  nom_bonic: NomBonic;
  titol: TitolEnum;
  imatges: ProgramesTvImatge[];
}

export enum TitolEnum {
  Ranma12 = "Ranma 1/2",
}

export interface ProgramesTvImatge {
  text: string;
  mida: FluffyMida;
  alt: TitolEnum;
  group_id: string;
  asset_id: string;
  titol: TitolEnum;
  rel_name: FluffyRelName;
}

export enum FluffyMida {
  The1014X180 = "1014x180",
  The1014X570 = "1014x570",
  The128X96 = "128x96",
  The1600X284 = "1600x284",
  The288X422 = "288x422",
  The320X466 = "320x466",
  The326X184 = "326x184",
  The400X80 = "400x80",
  The670X378 = "670x378",
  Tv3141X51 = "Tv3 141x51",
}

export enum FluffyRelName {
  Image = "IMAGE",
  ImgBravia = "IMG_BRAVIA",
  ImgIPTV = "IMG_IPTV",
  ImgIptv2 = "IMG_IPTV2",
}

export enum Nom {
  ProgramaTele = "PROGRAMA_TELE",
}

export enum NomBonic {
  Ranma = "ranma",
}

export enum ProgramesTvTipologia {
  PtvcPrograma = "PTVC_PROGRAMA",
}

export enum ItemTipologia {
  DtyVideoMm = "DTY_VIDEO_MM",
}

export enum TipusContingut {
  Ppd = "PPD",
}

export interface Paginacio {
  total_items: number;
  items_pagina: number;
  pagina_actual: number;
  total_pagines: number;
}
export interface Sx3Capitol {
  informacio: Informacio;
  media: Media;
  idiomes: Idiome[];
  subtitols: Subtitol[];
  sprites: Sprites;
  imatges: Imatges;
  keyframes: Keyframe[];
  publicitat: Publicitat;
  audiencies: Audiencies;
  youbora: Youbora;
  relacionats: Recomanats;
  relacionatsEditor: Recomanats;
  recomanats: Recomanats;
}

export interface Audiencies {
  adobe_analytics: AdobeAnalytics;
  matr: Matr;
  kantarst: Kantarst;
}

export interface AdobeAnalytics {
  id: number;
  mediaType: string;
  "op-capitol": string;
  compte: string;
  nom: string;
  durada: number;
  reproductor: string;
  directe: number;
  tipus: string;
  parametres: AdobeAnalyticsParametres;
}

export interface AdobeAnalyticsParametres {
  eVar10: string;
  prop10: string;
  eVar11: string;
  prop11: string;
  eVar12: string;
  prop12: string;
  eVar13: string;
  prop13: string;
  eVar14: number;
  prop14: number;
  eVar15: string;
  prop15: string;
  eVar16: string;
  prop16: string;
  eVar17: string;
  prop17: string;
  eVar18: string;
  prop18: string;
  eVar19: string;
  prop19: string;
  eVar20: string;
  prop20: string;
  eVar21: string;
  prop21: string;
  eVar22: string;
  prop22: string;
  eVar23: string;
  prop23: string;
  eVar24: string;
  prop24: string;
  eVar25: string;
  prop25: string;
  eVar26: string;
  prop26: string;
  eVar27: string;
  prop27: string;
  eVar28: string;
  prop28: string;
  eVar29: string;
  prop29: string;
  eVar30: number;
  prop30: number;
  eVar31: string;
  prop31: string;
  eVar32: string;
  prop32: string;
  eVar33: string;
  prop33: string;
  eVar34: string;
  prop34: string;
  eVar35: number;
  prop35: number;
  eVar36: string;
  prop36: string;
  eVar37: number;
  prop37: number;
  eVar38: number;
  prop38: number;
  eVar39: string;
  prop39: string;
  eVar54: string;
  prop54: string;
  eVar56: string;
  prop56: string;
  eVar58: string;
  prop58: string;
  eVar59: string;
  prop59: string;
  eVar60: string;
  prop60: string;
  eVar61: string;
  prop61: string;
  eVar62: string;
  prop62: string;
  eVar63: string;
  prop63: string;
  eVar65: string;
  prop65: string;
  eVar66: string;
  prop66: string;
  eVar69: string;
  prop69: string;
  eVar71: string;
  prop71: string;
  eVar73: string;
  prop73: string;
  eVar84: string;
  prop84: string;
  eVar87: string;
  prop87: string;
  eVar88: string;
  prop88: string;
}

export interface Kantarst {
  customerC2: number;
  directe: number;
  mediaType: string;
  nom: string;
  parametres: KantarstParametres;
}

export interface KantarstParametres {
  ns_st_pu: string;
  ns_st_pr: string;
  ns_st_ep: string;
  ns_st_sn: string;
  ns_st_en: number;
  ns_st_st: string;
  ns_st_cl: number;
  ns_st_ge: string;
  ns_st_ti: string;
  ns_st_ia: number;
  ns_st_ce: number;
  ns_st_ddt: Date;
  ns_st_stc: number;
  ns_st_ct: string;
  nt_st_sn: string;
  ns_st_tp: number;
  c2: number;
  c3: string;
  c4: string;
  c6: string;
  fp_offset: number;
  ns_st_li: number;
  ns_st_tdt: Date;
  ns_st_tm: string;
  ns_st_ty: string;
  cs_ucfr: string;
  ns_st_ci: number;
}

export interface Matr {
  urls: Urls;
  parametres: MatrParametres;
}

export interface MatrParametres {
  pid: string;
  directe: boolean;
  tipus: string;
  content: Content;
  dynamic_content: DynamicContent;
}

export interface Content {
  canal: string;
  id_dty: number;
  variant: string;
  qualitat: string;
  format: string;
  sbt: string;
  sbtd: string;
}

export interface DynamicContent {
  versioapp: string;
  aid: string;
}

export interface Urls {
  sendmark: string;
  senduserdata: string;
  checkcors: string;
  gettime: string;
  senduserchannels: string;
}

export interface Idiome {
  id: string;
  desc: string;
  main: boolean;
}

export interface Imatges {
  amplada: number;
  alcada: number;
  url: string;
}

export interface Informacio {
  estat: Estat;
  id: number;
  op: number;
  aspectratio: string;
  programa_id: number;
  capitol: number;
  titol: string;
  titol_complet: string;
  slug: string;
  programa: string;
  permalink: string;
  tipus_contingut: string;
  descripcio: string;
  durada: Durada;
  data_emissio: Data;
  data_caducitat: Data;
  tematica: CodiEtic;
  temporada: Temporada;
  codi_etic: CodiEtic;
  drets: Drets;
}

export interface CodiEtic {
  text: string;
  id: string;
}

export interface Data {
  text: string;
  utc: Date;
}

export interface Drets {
  text: string;
}

export interface Durada {
  text: string;
  milisegons: number;
}

export interface Estat {
  actiu: boolean;
  id: number;
}

export interface Temporada {
  idName: string;
  name: string;
  id: number;
}

export interface Keyframe {
  realname: string;
  label: string;
  url: string;
}

export interface Media {
  geo: string;
  format: string;
  url: Enllac[];
}

export interface Enllac {
  file: string;
  label: string;
  active: boolean;
}

export interface Publicitat {
  vast: Vast;
  events: Events;
}

export interface Events {
  adError: AdError;
}

export interface AdError {
  ad_tag_empty: string;
}

export interface Vast {
  client: string;
  schedule: Schedule;
}

export interface Schedule {
  pre: Pre;
}

export interface Pre {
  offset: string;
  skipoffset: number;
  tag: string;
}

export interface Recomanats {
  url: string;
}

export interface Sprites {
  file: string;
}

export interface Subtitol {
  text: string;
  iso: string;
  url: string;
  format: string;
}

export interface Youbora {
  active: boolean;
  debug: boolean;
  opcions: Opcions;
}

export interface Opcions {
  "content.transactionCode": number;
  "content.id": number;
  "content.title": string;
  "content.program": string;
  "content.duration": number;
  "content.isLive": boolean;
  "content.metadata": ContentMetadata;
  "extraparam.3": string;
  "user.name": string;
  "ad.expectedPattern": AdExpectedPattern;
  "ad.breaksTime": number[];
}

export interface AdExpectedPattern {
  pre: number[];
}

export interface ContentMetadata {
  filename: string;
  content_id: number;
  url: string;
  transaction_type: string;
  device: Device;
}

export interface Device {
  manufacturer: string;
}
