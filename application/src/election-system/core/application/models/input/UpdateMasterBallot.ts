export interface UpdateMasterBallot {
    title?: string,
    description?: string,
    category?: string,
    questionsData?: {
        id: string,
        title?: string,
        questionType?: string,
        choicesData?: {
            id: string,
            title?: string,
            content?: string,
            contentType?: string,
        }[]
    }[],
    token: string,
}
