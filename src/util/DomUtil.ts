export default abstract class DomUtil {
    /**
     * A type-safe definition for creating an element and assigning it properties in the same call.
     * @param tagName - The name of the HTML element tag you wish to create
     * @param props - An object with props to assign to your element. These props must be a member of keyof(element)
     */
    static createElement<K extends keyof HTMLElementTagNameMap>(tagName: K, props: { [P in keyof HTMLElementTagNameMap[K]]?: HTMLElementTagNameMap[K][P] } = {}): HTMLElementTagNameMap[K] {
        return Object.assign(document.createElement(tagName), props);
    }
}