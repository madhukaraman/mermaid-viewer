/**
 * Encodes a mermaid sequence diagram for use in URL query parameters
 * @param diagram - The raw mermaid sequence diagram text
 * @returns The encoded diagram string ready for URL query parameters
 */
export function encodeDiagram(diagram: string): string {
  return encodeURIComponent(diagram);
}

/**
 * Decodes a mermaid sequence diagram from URL query parameters
 * @param encodedDiagram - The encoded diagram string from URL query parameters
 * @returns The decoded diagram text
 */
export function decodeDiagram(encodedDiagram: string): string {
  return decodeURIComponent(encodedDiagram);
}

/**
 * Creates a complete URL with the encoded diagram as a query parameter
 * @param baseUrl - The base URL (e.g., 'http://localhost:5174')
 * @param diagram - The raw mermaid sequence diagram text
 * @returns The complete URL with encoded diagram parameter
 */
export function createDiagramUrl(baseUrl: string, diagram: string): string {
  const encodedDiagram = encodeDiagram(diagram);
  const url = new URL(baseUrl);
  url.searchParams.set('diagram', encodedDiagram);
  return url.toString();
}

/**
 * Example usage function that demonstrates how to use the encoder
 * @returns An object with example diagram and encoded URL
 */
export function getExampleDiagram() {
  const exampleDiagram = `sequenceDiagram
    participant Alice
    participant Bob
    participant Charlie
    
    Alice->>Bob: Hello Bob
    Bob-->>Alice: Hi Alice
    Alice->>Charlie: Hello Charlie
    Charlie-->>Alice: Hi Alice
    
    Note over Alice,Bob: They are communicating
    Note over Charlie: Charlie is listening
    
    Bob->>Charlie: How are you?
    Charlie-->>Bob: I'm fine, thanks!`;

  const encodedDiagram = encodeDiagram(exampleDiagram);
  const exampleUrl = createDiagramUrl('http://localhost:5174', exampleDiagram);

  return {
    rawDiagram: exampleDiagram,
    encodedDiagram,
    fullUrl: exampleUrl
  };
}