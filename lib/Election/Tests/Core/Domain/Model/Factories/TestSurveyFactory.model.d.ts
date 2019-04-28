import { Survey } from "../../../../../Core/Domain/Model/Aggregates/Ballot/Entities/Survey.model";
export declare class TestSurveyFactory {
    static createFullSurvey(options?: OptionalParams): Survey;
    static createBaseSurvey(surveyParams?: OptionalSurveyParams): Survey;
    private static createRandomChoices;
    private static createRandomQuestionsWithChoices;
    private static patchObject;
}
interface OptionalParams {
    surveyParams?: OptionalSurveyParams;
    questionParams?: OptionalQuestionParams;
    choiceParams?: OptionalChoiceParams;
}
interface OptionalSurveyParams {
    id?: string;
    author?: string;
    title?: string;
    description?: string;
    category?: string;
    datePosted?: Date;
    anonymous?: boolean;
    published?: boolean;
}
interface OptionalQuestionParams {
    id?: string;
    title?: string;
    questionType?: string;
}
interface OptionalChoiceParams {
    id?: string;
    title?: string;
    content?: string;
    contentType?: string;
    voteTally?: number;
}
export {};
