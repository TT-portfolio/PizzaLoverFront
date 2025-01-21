'use client';
import { useEffect, useState } from "react";
import { useContent } from "@/context/ContentContext";
import { ApiItem } from "@/types/api";

function TestPageComponent() {
    const { fetchContent, loading, error } = useContent();
    const [testPage, setTestPage] = useState<ApiItem | null>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await fetchContent("testPage");
            console.log("Fetched content:", data); 
            const testPageData = data?.find(item => item.contentType === "testPage");
            console.log("Filtered testPageData:", testPageData); 
            setTestPage(testPageData || null);
        }
        fetchData();
    }, [fetchContent]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;
    if (!testPage || !testPage.properties) {
        return <p>No test page data available. Check API response.</p>;
    }

    return (
        <div>
            <h1>Properties for TestPage</h1>
            <ul>
                {Object.values(testPage.properties).map((value, index) => (
                    <li key={index}>
                        {typeof value === "string" ? value : JSON.stringify(value)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TestPageComponent;
