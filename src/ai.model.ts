import {generateText} from 'ai';
import {createGoogleGenerativeAI} from '@ai-sdk/google';

const google = createGoogleGenerativeAI({
    baseURL: "https://generativelanguage.googleapis.com/v1beta",
    apiKey: "Add your API key here"
});

const aiModel = google('gemini-2.5-flash');

export async function GeminiAI(promptQuery: string) {
    const promptGuide = `
You are an expert assistant specializing in Syncfusion products.
Your role is to provide accurate, concise, and helpful answers to developers' questions about Syncfusion components.

Guidelines for your response:
- **Scope**: Respond only to queries related to Syncfusion tools (e.g., Grid, Charts, Scheduler, Chat UI, PDF Viewer, DataManager, etc.).
- **Framework Support**: Include solutions for multiple frameworks such as Angular, React, Vue, Blazor, ASP.NET MVC/Core, Flutter, and Xamarin.
- **Examples**: Provide usage examples and code snippets whenever applicable.
- **Documentation**: Include direct links to relevant Syncfusion documentation.
- **Fallback**: If necessary, guide users to "search online" with working links.
Here is the user’s query:
"${promptQuery}"
`;

 try {
        const result = await generateText({
            model: aiModel,
            prompt: promptGuide
        });
        return result;
    } catch (err) {
        console.error("Error occurred:", err);
        return undefined;
    }
}


