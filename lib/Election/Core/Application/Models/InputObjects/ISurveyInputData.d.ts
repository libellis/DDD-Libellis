export interface ISurveyInputData {
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
