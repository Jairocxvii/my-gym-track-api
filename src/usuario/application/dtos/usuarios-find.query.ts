export interface UsuariosFindQuery {
    email?: string;
    isDeleted?: boolean;
    limit?: number;
    offset?: number;
}