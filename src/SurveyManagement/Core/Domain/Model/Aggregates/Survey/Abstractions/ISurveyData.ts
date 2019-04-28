export interface ISurveyData {
	author: string,
	title: string,
	description: string,
	category: string,
	questionsData: {
		title: string,
		questionType: string,
		choicesData: {
			title: string,
			content: string,
			contentType: string,
			voteTally: number,
		}[]
	}[]
}
