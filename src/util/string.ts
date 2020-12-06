export abstract class StringUtil {
    static capitalize(s: string) {
        if (!s) {
            return '';
        }

        let capitalized = s[0].toUpperCase();
        if (s.length > 1) {
            capitalized += s.slice(1).toLowerCase();
        }
        return capitalized;
    }
}