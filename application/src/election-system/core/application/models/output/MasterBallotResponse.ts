export class MasterBallotResponse {
    constructor(
        public id: string,
        public title: string,
        public description: string,
        public category: string,
        public questions: {
            id: string,
            title: string,
            questionType: string,
            choices: {
                id: string,
                title: string,
                content: string,
                contentType: string,
            }[]
        }[]
    ) {}
}
