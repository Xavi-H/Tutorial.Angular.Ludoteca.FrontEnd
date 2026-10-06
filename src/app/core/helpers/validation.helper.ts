/**
 * Comproba que tots els camps indicats en `requiredFields`
 * tinguin un valor vàlid.
 * Es considera invàlid: null, undefined o una cadena buida (només espais).
 */
export function validateFields<T extends Record<string, unknown>>(data: T, requiredFields: readonly (keyof T)[]): boolean {
    return requiredFields.every(field => {
        const value = data[field];

        if (value === null || value === undefined) {
            return false;
        }

        if (typeof value === 'string') {
            return value.trim().length > 0;
        }

        return true;
    });
}
