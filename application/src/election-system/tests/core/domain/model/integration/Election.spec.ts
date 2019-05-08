import { expect, assert } from 'chai';
import 'mocha';
import * as faker from 'faker';
import { TestMasterBallotFactory } from "../factories/TestMasterBallotFactory.model";
import { TestElectionFactory } from "../factories/TestElectionFactory.model";
import { TestVoterFactory } from "../factories/TestVoterFactory.model";
import { IBallotData } from "../../../../../core/Domain/Model/BallotAggregate/Abstractions/IBallotData";
import { TestBallotDataFactory } from "../factories/TestBallotDataFactory.model";


describe('test election process for accuracy', () => {
	const sleep = (milliseconds: number) => {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	};

	it('should start an election, and count test votes accurately', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const start = new Date();
		const end = new Date((new Date()).getTime() + 30);
		const election = TestElectionFactory.createElectionWithFactoryMethod(masterBallot, { start, end });
		const voters = TestVoterFactory.createRandomTestVoters(1, 12);
		election.startElection();

		const ballotDatas = TestBallotDataFactory.createTestBallotsFromVotersList(voters, masterBallot);
		ballotDatas.map(b => election.castBallot(faker.random.uuid, b));

		// Get highest winning count questionId this way we can match up the winning choice id.  We lazily assign
		// the max score possible to the last choice in each array of choices per question.  Therefore the question
		// with the most choices also has the choice with the most aggregate votes, as the last choice in it's choice
		// array.
		let highestChoiceCountQuestionIdx = 0;
		let winningCount = 0;
		for (let i = 0; i < masterBallot.questionCount; i++) {
			const question = masterBallot.questions[i];
			if (question.choiceCount > winningCount) {
				winningCount = question.choiceCount;
				highestChoiceCountQuestionIdx = i;
			}
		}

		// allot enough time for 30 millisecond long election to finish so we can retrieve winner.
		await sleep(30);
		expect(election.getWinner()).equals(
			masterBallot.questions[highestChoiceCountQuestionIdx]
				.choices[masterBallot.questions[highestChoiceCountQuestionIdx].choiceCount - 1]
				.id
		);

		const scores = Object.values(election.getElectionResults()).map(result => {
			return result.tally;
		});
		const highestScore = Math.max(...scores);

		expect(highestScore).equals(
			(masterBallot
				.questions[highestChoiceCountQuestionIdx]
				.choiceCount-1) * voters.length);
	});
});
