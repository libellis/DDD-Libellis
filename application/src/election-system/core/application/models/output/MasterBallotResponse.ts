export class MasterBallotResponse {
    constructor(
        public title: string,
        public description: string,
        public category: string,
        public questions: {
            title: string,
            questionType: string,
            choices: {
                title: string,
                content: string,
                contentType: string,
            }[]
        }[]
    ) {}
}
