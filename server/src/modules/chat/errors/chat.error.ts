export class ChatError extends Error {
  constructor(message: string, public details?: any) {
    super(message);
    this.name = "ChatError";
  }
}

export class MessageNotSentError extends ChatError {
  constructor(details?: any) {
    super("Failed to send message", details);
    this.name = "MessageNotSentError";
  }
}

export class ChatNotFoundError extends ChatError {
  constructor(details?: any) {
    super("Chat conversation not found", details);
    this.name = "ChatNotFoundError";
  }
}

export class InvalidRecipientError extends ChatError {
  constructor(details?: any) {
    super("Invalid recipient", details);
    this.name = "InvalidRecipientError";
  }
}

export class GroupNotFoundError extends ChatError {
  constructor(details?: any) {
    super("Group chat not found", details);
    this.name = "GroupNotFoundError";
  }
}

export class UnauthorizedChatAccessError extends ChatError {
  constructor(details?: any) {
    super("Unauthorized access to chat", details);
    this.name = "UnauthorizedChatAccessError";
  }
}
