import { expect, assert } from 'chai';
import 'mocha';
import * as faker from 'faker';
import { TestMasterBallotFactory } from "../Factories/TestMasterBallotFactory.model";
import { TestElectionFactory } from "../Factories/TestElectionFactory.model";
import { TestVoterFactory } from "../Factories/TestVoterFactory.model";
import { IBallotData } from "../../../../../Core/Domain/Model/Aggregates/Ballot/Abstractions/IBallotData";


describe('test election process for accuracy', () => {
	const sleep = (milliseconds: number) => {
		return new Promise(resolve => setTimeout(resolve, milliseconds))
	};

	it('should start an election, and count test votes accurately', async () => {
		const masterBallot = TestMasterBallotFactory.createFullMasterBallot();
		const start = new Date();
		const end = new Date((new Date()).getTime() + 30);
		const election = TestElectionFactory.createElectionWithFactory(masterBallot, { start, end });
		const voters = TestVoterFactory.createRandomTestVoters(1, 12);
		election.startElection();

		// Let's somehow replace this with some nice factory generation
		for (let i = 0; i < voters.length; i++) {
			let voter = voters[i];
			let ballotData: IBallotData = {
				voterId: voter.id,
				masterBallotId: masterBallot.id,
				voteData: {
					questionsData: masterBallot.questions
						.map(q => {
							return {
								qId: q.id,
								choicesData: q.choices
									.map((c, j) => {
										return {
											cId: c.id,
											score: j,
										}
									})
							}
						})
				}
			};

			election.castBallot(faker.random.uuid, ballotData);
		}

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
		)
	});
});
