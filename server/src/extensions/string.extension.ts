declare global {
  interface String {
    /**
     * Converts the first character of a string to uppercase and leaves the rest unchanged.
     *
     * @returns A new string with the first character capitalized.
     *
     * @example
     * const str = "hello world";
     * const capitalizedStr = str.capitalize();
     * console.log(capitalizedStr); // Output: "Hello world"
     */
    capitalize(): string

    /**
     * Converts a string to a slug format, replacing non-alphanumeric characters with hyphens.
     * Removes leading and trailing hyphens from the resulting string.
     *
     * @returns A new string in slug format.
     *
     * @example
     * const str = "Hello World!";
     * const slugifiedStr = str.slugify();
     * console.log(slugifiedStr); // Output: "hello-world"
     */
    slugify(): string
  }
}

String.prototype.capitalize = function (): string {
  return this.charAt(0).toUpperCase() + this.slice(1)
}

String.prototype.slugify = function (): string {
  return this.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}

export {}
