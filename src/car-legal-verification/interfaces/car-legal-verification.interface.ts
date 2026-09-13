export enum RuntPendingIssueEnum {
  // Term del cliente, se mantiene tal cual
  PRENDA_NATURAL = 'PRENDA NATURAL',

  // Variantes de embargo por origen/criterio
  EMBARGO_JUDICIAL_CIVIL = 'EMBARGO JUDICIAL_CIVIL', // demandas civiles
  EMBARGO_JUDICIAL_FAMILIA = 'EMBARGO JUDICIAL FAMILIA', // deudas de alimentos, procesos de familia
  EMBARGO_JUDICIAL_PENAL = 'EMBARGO JUDICIAL PENAL', // procesos penales
  EMBARGO_FISCAL_TRIBUTARIO = 'EMBARGO FISCAL TRIBUTARIO', // impuestos vehiculares/nacionales no pagados
  EMBARGO_ADMINISTRATIVO = 'EMBARGO ADMINISTRATIVO', // cobro coactivo de multas u otras entidades estatales
  EMBARGO_ADUANERO = 'EMBARGO ADUANERO', // procesos de importación/DIAN

  // Otras limitaciones comunes
  MEDIDA_CAUTELAR = 'MEDIDA CAUTELAR',
  COMPROMISO_DESINTEGRACION = 'COMPROMISO DESINTEGRACION',

  // Catch-all para lo que no encaje en ninguna categoría anterior
  OTRO = 'OTRO',
}
