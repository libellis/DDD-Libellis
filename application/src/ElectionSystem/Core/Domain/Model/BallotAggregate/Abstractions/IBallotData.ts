export interface IBallotData {
	voterId: string,
	masterBallotId: string,
	voteData: {
		questionsData: {
			qId: string,
			choicesData: {
				cId: string,
				score: number,
			}[]
		}[]
	}
}
