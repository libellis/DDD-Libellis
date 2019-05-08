export interface IBallotData {
    voterId: string;
    voteData: {
        questionsData: {
            qId: string;
            choicesData: {
                cId: string;
                rank: number;
            }[];
        }[];
    };
}
