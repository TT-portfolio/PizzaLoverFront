export async function fetchImageMetadata(imageUrl: string): Promise<string> {
    try {
        const response = await fetch(`${imageUrl}?comp=metadata`, {
            method: "GET",
            headers: {
                "x-ms-version": "2020-04-08",
            },
        });
        if (!response.ok) {
            console.warn("Failed to fetch metadata, using default alt text.");
            return "No alt text available";
        }
        const metadata = response.headers;
        const base64AltText = metadata.get("x-ms-meta-altText") || "";
        let decodedAltText = "no altText available";
        if (base64AltText) {
            try {
                // Konvertera Base64 till en Uint8Array och dekoda till UTF-8
                const decodedBytes = Uint8Array.from(atob(base64AltText), (c) =>
                    c.charCodeAt(0)
                );
                decodedAltText = new TextDecoder("utf-8").decode(decodedBytes);
            } catch (decodeError) {
                console.error("Error decoding Base64 altText:", decodeError);
            }
        }
        return decodedAltText;
    } catch (error) {
        console.error("Error fetching metadata:", error);
        return "No alt text available";
    }
}
