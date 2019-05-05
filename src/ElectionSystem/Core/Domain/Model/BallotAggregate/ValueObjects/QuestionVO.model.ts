import { Vote } from "../Vote.model";

export class QuestionVO {
	constructor(
		private readonly _questionId: string,
		private readonly _votes: Vote[],
	) {
		if (this.allVotesHaveSameQID(_questionId, _votes) && this.allScoresAreValid(_questionId, _votes)) {
			this._questionId = _questionId;
			this._votes = _votes;
		}
	}

	get votes(): Vote[] {
		return this._votes;
	}

	allVotesHaveSameQID(qId: string, votes: Vote[]) {
		if (!votes.every(v => v.questionId === qId)) {
			throw new Error(`At least one vote does not belong to question of id: ${qId}`);
		}
		return true;
	}

    allScoresAreValid(qId: string, votes: Vote[]) {
		if (this.scoreExistsHigherThanMax(votes)) {
			throw new Error(`At least one vote has been assigned a score higher than the max score for question of id: ${qId}`);
		}
		if (this.duplicateScoresExist(votes)) {
			throw new Error(`Duplicate scores exist for votes relating to question of id: ${qId}`);
		}
		return true;
	}

	scoreExistsHigherThanMax(votes: Vote[]) {
		const maxScore = this._votes.length - 1;
		return (this._votes.some(v => v.score.tally > maxScore));
	}

	duplicateScoresExist(votes: Vote[]) {
		const scoreList = votes.map(v => v.score.tally);
		return (new Set(scoreList)).size !== scoreList.length;
	}
}
