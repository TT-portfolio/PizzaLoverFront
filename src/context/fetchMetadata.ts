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
      return metadata.get("x-ms-meta-altText") || "No alt text available";
    } catch (error) {
      console.error("Error fetching metadata:", error);
      return "No alt text available";
    }
  }
  