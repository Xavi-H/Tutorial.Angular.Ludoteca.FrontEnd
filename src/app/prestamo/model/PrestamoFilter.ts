/**
 * Model que s'utlitza per filtrar els préstecs.
 * Els noms coincideixen amb PrestamoSearchDto del backend perquè funcioni correctament
 * @author Xavi-H
 */
export interface PrestamoFilter {
  idGame: number | null;
  idClient: number | null;
  date: string | null;
}
