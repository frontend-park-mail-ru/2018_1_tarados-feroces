export function setError(errorData): any {
    return {
        type: 'SET_ERROR',
        payload: errorData
    };
}