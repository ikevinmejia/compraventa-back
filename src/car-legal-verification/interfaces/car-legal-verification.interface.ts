export enum RuntPendingIssueEnum {
  // Term del cliente, se mantiene tal cual
  PRENDA_NATURAL = 'Prenda Natural',

  // Variantes de embargo por origen/criterio
  EMBARGO_JUDICIAL_CIVIL = 'Embargo Judicial Civil', // demandas civiles
  EMBARGO_JUDICIAL_FAMILIA = 'Embargo Judicial Familia', // deudas de alimentos, procesos de familia
  EMBARGO_JUDICIAL_PENAL = 'Embargo Judicial Penal', // procesos penales
  EMBARGO_FISCAL_TRIBUTARIO = 'Embargo Fiscal Tributario', // impuestos vehiculares/nacionales no pagados
  EMBARGO_ADMINISTRATIVO = 'Embargo Administrativo', // cobro coactivo de multas u otras entidades estatales
  EMBARGO_ADUANERO = 'Embargo Aduanero', // procesos de importación/DIAN

  // Otras limitaciones comunes
  MEDIDA_CAUTELAR = 'Medida Cautelar',
  COMPROMISO_DESINTEGRACION = 'Compromiso Desintegracion',

  // Catch-all para lo que no encaje en ninguna categoría anterior
  OTRO = 'Otro',
}
