export interface ISurveyData {
    author: string;
    title: string;
    description: string;
    category: string;
    anonymous: boolean;
    published: boolean;
    questionsData: {
        title: string;
        questionType: string;
        choicesData: {
            title: string;
            content: string;
            contentType: string;
            voteTally: number;
        }[];
    }[];
}
