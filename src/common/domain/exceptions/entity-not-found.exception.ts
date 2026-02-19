export class EntityNotFoundException extends Error {
    constructor(entityName: string, id: string | number) {
        super(`${entityName} con ID ${id} no fue encontrado`);
        this.name = 'EntityNotFoundException';
    }
}
