export function getResponseObject(
    success: boolean,
    data: unknown,
    error?: unknown,
) {
    return { success, data, error };
}

export function trimSplat(splat: string | undefined, suffix?: string) {
    if (splat) {
        if (suffix) {
            splat = splat.substring(0, splat.length - suffix.length);
        }
    }

    return splat;
}
