export type ChatMessage = {
	id: number;
	question: string;
	response: string;
	loading: boolean;
	is_displayed: boolean;
};

export type Chat = {
	id: number;
	name: string;
	messages: ChatMessage[];
};
