export class NewMasterBallot {
	constructor(
		public title: string,
		public description: string,
		public category: string,
		public questionsData: {
			title: string,
			questionType: string,
			choicesData: {
				title: string,
				content: string,
				contentType: string,
			}[]
		}[]
	) {}
}
