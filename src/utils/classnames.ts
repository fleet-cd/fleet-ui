export function getClassName(providedClassName: string | undefined, additionalClassNames: string[]) {
    return `${additionalClassNames.join(' ')} ${providedClassName || ''}`;
}